/**
 * Renders a users pages that allows to switch between all users in a space
 * and all users in the org.
 */

import React from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";

import userActions from "../actions/user_actions";
import UserStore from "../stores/user_store";
import OrgStore from "../stores/org_store";
import SpaceStore from "../stores/space_store";
import UserList from "./user_list";
import UsersInvite from "./users_invite";
import UsersSelector from "./users_selector";
import Notification from "./notification";
import SystemErrorMessage from "./system_error_message";
import PanelDocumentation from "./panel_documentation";

const propTypes = {
  t: PropTypes.func.isRequired
};

const SPACE_NAME = SpaceStore.cfName;
const ORG_NAME = OrgStore.cfName;
const ORG_MANAGER = "org_manager";
const SPACE_MANAGER = "space_manager";
const ORG_ENTITY = "organization";
const SPACE_ENTITY = "space";

const mapStoreToState = () => {
  const { currentOrgGuid } = OrgStore;
  const { currentSpaceGuid } = SpaceStore;
  const currentType = UserStore.currentlyViewedType;
  const { currentUser, isSaving } = UserStore;

  let users = [];
  let parentEntityUsers;
  let currentUserAccess = false;
  let entityGuid;
  const inviteDisabled = UserStore.isInviteDisabled();
  const usersSelectorDisabled = UserStore.usersSelectorDisabled();
  const isOrgUserManager = UserStore.hasRole(
    currentUser.guid,
    currentOrgGuid,
    ORG_MANAGER
  );

  if (currentType === SPACE_NAME) {
    users = UserStore.getAllInSpace(currentSpaceGuid);
    parentEntityUsers = UserStore.getAllInOrgAndNotSpace(currentSpaceGuid);
    entityGuid = currentSpaceGuid;
    currentUserAccess = UserStore.hasRole(
      currentUser.guid,
      currentSpaceGuid,
      SPACE_MANAGER
    );
  } else {
    users = UserStore.getAllInOrg(currentOrgGuid);
    entityGuid = currentOrgGuid;
  }

  if (isOrgUserManager === true) {
    currentUserAccess = true;
  }

  return {
    currentUser,
    error: UserStore.getError(),
    inviteDisabled,
    usersSelectorDisabled,
    currentUserAccess,
    currentOrgGuid,
    currentSpaceGuid,
    entityGuid,
    currentType,
    isSaving,
    loading: UserStore.loading,
    empty: !UserStore.loading && !users.length,
    users,
    parentEntityUsers,
    userListNotices: UserStore._userListNotification,
    userListNoticeError: UserStore.getUserListNotificationError()
  };
};

export class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = mapStoreToState();

    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.handleAddPermissions = this.handleAddPermissions.bind(this);
    this.handleRemovePermissions = this.handleRemovePermissions.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.handleChange);
  }

  onNotificationDismiss(e) {
    e.preventDefault();

    userActions.clearUserListNotifications();
  }

  handleAddPermissions(roleKey, apiKey, userGuid) {
    userActions.addUserRoles(
      roleKey,
      apiKey,
      userGuid,
      this.entityGuid,
      this.entityType
    );
  }

  handleRemovePermissions(roleKey, apiKey, userGuid) {
    userActions.deleteUserRoles(
      roleKey,
      apiKey,
      userGuid,
      this.entityGuid,
      this.entityType
    );
  }

  handleRemoveUser(userGuid, ev) {
    ev.preventDefault();
    userActions.deleteUser(userGuid, this.state.currentOrgGuid);
  }

  handleRemoveSpaceRoles(userGuid, ev) {
    ev.preventDefault();
    userActions.removeAllSpaceRoles(userGuid, this.entityGuid);
  }

  get entityType() {
    return this.isOrganization ? ORG_ENTITY : SPACE_ENTITY;
  }

  get isOrganization() {
    return this.state.currentType === ORG_NAME;
  }

  get isSpace() {
    return this.state.currentType === SPACE_NAME;
  }

  get entityGuid() {
    const entityGuid = this.isOrganization
      ? this.state.currentOrgGuid
      : this.state.currentSpaceGuid;
    return entityGuid;
  }

  get currentUserIsSpaceManager() {
    const { currentUser } = this.state;
    const { currentSpaceGuid } = SpaceStore;

    return UserStore.hasRole(currentUser.guid, currentSpaceGuid, SPACE_MANAGER);
  }

  get currentUserIsOrgManager() {
    const { currentUser } = this.state;
    const { currentOrgGuid } = OrgStore;

    return UserStore.hasRole(currentUser.guid, currentOrgGuid, ORG_MANAGER);
  }

  get notification() {
    const { userListNotices } = this.state;

    if (!userListNotices.description) return null;

    return (
      <Notification
        message={userListNotices.description}
        actions={[]}
        onDismiss={this.onNotificationDismiss}
        status="finish"
      />
    );
  }

  get userInvite() {
    const { t } = this.props;

    // When on the org page, only the Org Manager should see the user invite
    // form. If not, display notification.
    if (this.isOrganization && !this.currentUserIsOrgManager) {
      return (
        <PanelDocumentation>
          {t(
            "Only an Org Manager can invite new users to this organization via the dashboard. Speak to your Org Manager if you need to add a user to this organization."
          )}
        </PanelDocumentation>
      );
    }
    // When on the space page, likewise, an Org Manager should always see the
    // invite form. Else, let's dig into what to display.
    if (this.isSpace && !this.currentUserIsOrgManager) {
      // if the user is a Space Manager, let them know that they can invite
      // existing org users but not new ones.
      if (this.currentUserIsSpaceManager) {
        return (
          <PanelDocumentation>
            {t(
              "As a Space Manager, you can invite existing organization users into your space. If you wish to invite a person who is not in the organization into your space, please ask an Org Manager."
            )}
          </PanelDocumentation>
        );
      }
      // Else, just tell the user to invite a Space Manager or Org Manager.
      // Let's not confuse the regular user with the difference between
      // new and existing org users.
      // We can figure out wording later.
      return (
        <PanelDocumentation>
          If you wish to invite users into this space, please ask an Org Manager
          or a Space Manager.
        </PanelDocumentation>
      );
    }

    // Only the Org Manager will get this far.
    // We should only display the form then.
    return (
      <UsersInvite
        entityType={this.entityType}
        disabled={this.state.inviteDisabled}
        currentUserAccess={this.currentUserIsOrgManager}
        error={this.state.userListNoticeError}
      />
    );
  }

  get userParentEntityUserSelector() {
    // only show something if in a space and if the user is a org manager
    // or space manager.
    if (
      !this.isSpace ||
      (!this.currentUserIsSpaceManager && !this.currentUserIsOrgManager)
    ) {
      return null;
    }

    return (
      <UsersSelector
        usersSelectorDisabled={this.state.usersSelectorDisabled}
        parentEntity={ORG_ENTITY}
        currentEntityGuid={this.entityGuid}
        currentEntity={this.entityType}
        parentEntityUsers={this.state.parentEntityUsers}
        inviteEntityType={this.entityType}
        currentUserAccess={this.state.currentUserAccess}
        error={this.state.userListNoticeError}
      />
    );
  }

  handleChange() {
    this.setState(() => mapStoreToState());
  }

  render() {
    let removeHandler;

    if (this.isOrganization) {
      removeHandler = this.handleRemoveUser;
    } else if (this.isSpace) {
      removeHandler = this.handleRemoveSpaceRoles;
    }

    return (
      <div data-test="users">
        <SystemErrorMessage error={this.state.error} />
        {this.userInvite}
        {this.userParentEntityUserSelector}
        {this.notification}
        <UserList
          users={this.state.users}
          userType={this.state.currentType}
          entityGuid={this.state.entityGuid}
          currentUserAccess={this.state.currentUserAccess}
          empty={this.state.empty}
          loading={this.state.loading}
          saving={this.state.isSaving}
          onRemove={removeHandler}
          onAddPermissions={this.handleAddPermissions}
          onRemovePermissions={this.handleRemovePermissions}
        />
      </div>
    );
  }
}

Users.propTypes = propTypes;

export default translate()(Users);