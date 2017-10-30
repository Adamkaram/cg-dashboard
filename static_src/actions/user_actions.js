/*
 * Actions for user entities. Any actions such as fetching, creating, updating,
 * etc should go here.
 */

import AppDispatcher from '../dispatcher';
import cfApi from '../util/cf_api';
import uaaApi from '../util/uaa_api';
import { userActionTypes } from '../constants';
import UserStore from '../stores/user_store';
import OrgStore from '../stores/org_store';
import SpaceStore from '../stores/space_store';

const ORG_ENTITY = 'organization';
const SPACE_ENTITY = 'space';
const ORG_NAME = OrgStore.cfName;

const userActions = {
  fetchOrgUsers(orgGuid) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.ORG_USERS_FETCH,
      orgGuid
    });
    return cfApi
      .fetchOrgUsers(orgGuid)
      .then(users => userActions.receivedOrgUsers(users, orgGuid));
  },

  fetchOrgUserRoles(orgGuid) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.ORG_USER_ROLES_FETCH,
      orgGuid
    });
    return cfApi
      .fetchOrgUserRoles(orgGuid)
      .then(orgUsers => userActions.receivedOrgUserRoles(orgUsers, orgGuid));
  },

  fetchSpaceUserRoles(spaceGuid) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.SPACE_USER_ROLES_FETCH,
      spaceGuid
    });

    return cfApi
      .fetchSpaceUserRoles(spaceGuid)
      .then(spaceUsers =>
        userActions.receivedSpaceUserRoles(spaceUsers, spaceGuid)
      );
  },

  receivedOrgUsers(users, orgGuid) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.ORG_USERS_RECEIVED,
      users,
      orgGuid
    });
  },

  receivedOrgUserRoles(roles, orgGuid) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.ORG_USER_ROLES_RECEIVED,
      orgUserRoles: roles,
      orgGuid
    });
  },

  receivedSpaceUserRoles(users, spaceGuid) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.SPACE_USER_ROLES_RECEIVED,
      users,
      spaceGuid
    });
  },

  receivedOrgSpacesToExtractSpaceUsers(orgSpaces) {
    const orgSpaceUsers = orgSpaces.map(orgSpace =>
      Promise.resolve(cfApi.fetchSpaceUserRoles(orgSpace.guid))
    );
    return Promise.all(orgSpaceUsers);
  },

  fetchUserAssociationsToOrgSpaces(userGuid, orgGuid) {
    return Promise.resolve(cfApi.fetchAllOrgSpaces(orgGuid)).then(orgSpaces =>
      userActions.receivedOrgSpacesToExtractSpaceUsers(orgSpaces)
    );
  },

  removeAllSpaceRoles(userGuid, spaceGuid) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_REMOVE_ALL_SPACE_ROLES,
      userGuid,
      spaceGuid
    });

    const spaceRoles = ['auditors', 'developers', 'managers'];
    const spaceRemovalRequests = spaceRoles.map(role =>
      Promise.resolve(
        cfApi.deleteSpaceUserPermissions(userGuid, spaceGuid, role)
      )
    );
    return Promise.all(spaceRemovalRequests).then(responses =>
      userActions.handleSpaceRolesRemoved(responses, userGuid)
    );
  },

  handleSpaceRolesRemoved(responses, userGuid) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_REMOVED_ALL_SPACE_ROLES,
      responses,
      userGuid
    });
  },

  deleteUser(userGuid, orgGuid) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_DELETE,
      userGuid,
      orgGuid
    });

    return cfApi
      .deleteUser(userGuid, orgGuid)
      .then(() => userActions.deletedUser(userGuid, orgGuid))
      .catch(error => this.errorRemoveUser(userGuid, error.response.data));
  },

  deletedUser(userGuid, orgGuid) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.USER_DELETED,
      userGuid,
      orgGuid
    });
  },

  addUserRoles(role, resource, userGuid, entityGuid, entityType) {
    const apiMethodMap = {
      organization: cfApi.putOrgUserPermissions,
      space: cfApi.putSpaceUserPermissions
    };
    const api = apiMethodMap[entityType];

    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_ROLES_ADD,
      role,
      userGuid,
      entityGuid,
      entityType
    });

    return api(userGuid, entityGuid, resource)
      .then(() => {
        userActions.addedUserRoles(role, userGuid, entityGuid, entityType);
      })
      .catch(error => this.errorChangeUserRole(error));
  },

  addedUserRoles(roles, userGuid, entityGuid, entityType) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.USER_ROLES_ADDED,
      roles,
      userGuid,
      entityGuid,
      entityType
    });
  },

  deleteUserRoles(roles, apiKey, userGuid, entityGuid, entityType) {
    const apiMethodMap = {
      organization: cfApi.deleteOrgUserPermissions,
      space: cfApi.deleteSpaceUserPermissions
    };
    const api = apiMethodMap[entityType];

    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_ROLES_DELETE,
      roles,
      userGuid,
      entityGuid,
      entityType
    });

    return api(userGuid, entityGuid, apiKey)
      .then(() => {
        userActions.deletedUserRoles(roles, userGuid, entityGuid, entityType);
      })
      .catch(error => this.errorChangeUserRole(error));
  },

  deletedUserRoles(roles, userGuid, entityGuid, entityType) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.USER_ROLES_DELETED,
      roles,
      userGuid,
      entityGuid,
      entityType
    });
  },

  errorChangeUserRole(error) {
    const message = "You don't have permission to perform that action";

    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_ROLE_CHANGE_ERROR,
      error,
      message
    });
  },

  errorRemoveUser(userGuid, error) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.ERROR_REMOVE_USER,
      userGuid,
      error
    });
  },

  createUserInvite(email) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_INVITE_TRIGGER,
      email
    });

    return uaaApi
      .inviteUaaUser(email)
      .then(invite => userActions.receivedInviteStatus(invite, email))
      .catch(err =>
        userActions.userInviteCreateError(
          err,
          `There was a problem
        inviting ${email}`
        )
      );
  },

  receivedInviteStatus(invite, email) {
    const verified = invite.verified;
    const userGuid = invite.userGuid;

    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_INVITE_STATUS_UPDATED,
      email,
      verified
    });

    return userActions
      .createUserAndAssociate(userGuid)
      .then(() => userActions.createInviteNotification(verified, email))
      .catch(err =>
        userActions.userInviteCreateError(
          err,
          `There was a problem
        inviting ${email}`
        )
      );
  },

  clearUserListNotifications() {
    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_LIST_NOTICE_DISMISSED
    });
  },

  createUserListNotification(noticeType, description) {
    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_LIST_NOTICE_CREATED,
      noticeType,
      description
    });
  },

  createUserSpaceAssociationNotification(notification) {
    userActions.createUserListNotification('error', notification);
  },

  createInviteNotification(verified, email) {
    let description;
    const noticeType = 'finish';
    const currentViewedType = UserStore.currentlyViewedType;
    const viewTypeNouns = {
      space_users: { singular: SPACE_ENTITY },
      org_users: { singular: ORG_ENTITY }
    };
    const entity = viewTypeNouns[currentViewedType].singular;

    if (verified) {
      description =
        `The cloud.gov account for ${email} is now associated to this ` +
        `${entity}. Control their ${entity} roles below.`;
    } else {
      description =
        `An email invite was sent to ${email}. Their account ` +
        `has been associated to this ${entity}, and their ${entity} roles can ` +
        'be controlled below.';
    }

    userActions.createUserListNotification(noticeType, description);
  },

  userListNoticeError(err, contextualMessage) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.USER_INVITE_ERROR,
      err,
      contextualMessage
    });

    return Promise.resolve(err);
  },

  createUserAndAssociate(userGuid) {
    const entityType = UserStore.currentlyViewedType;
    const orgGuid = OrgStore.currentOrgGuid;
    let cfApiRequest;
    let entityGuid;

    if (entityType === ORG_NAME) {
      entityGuid = orgGuid;
      cfApiRequest = cfApi.putAssociateUserToOrganization.bind(
        cfApi,
        userGuid,
        entityGuid
      );

      AppDispatcher.handleViewAction({
        type: userActionTypes.USER_ORG_ASSOCIATE,
        userGuid,
        entityType,
        entityGuid
      });
    } else {
      entityGuid = SpaceStore.currentSpaceGuid;
      cfApiRequest = cfApi.putAssociateUserToSpace.bind(
        cfApi,
        userGuid,
        orgGuid,
        entityGuid
      );

      AppDispatcher.handleViewAction({
        type: userActionTypes.USER_SPACE_ASSOCIATE,
        userGuid,
        entityType,
        entityGuid
      });
    }

    return cfApiRequest()
      .then(() => userActions.fetchEntityUsers(entityGuid, entityType))
      .then(entityUsers => {
        userActions.createdUserAndAssociated(
          userGuid,
          entityGuid,
          entityUsers,
          entityType
        );
      });
  },

  fetchEntityUsers(entityGuid, entityType) {
    return cfApi[
      entityType === ORG_NAME ? 'fetchOrgUsers' : 'fetchSpaceUserRoles'
    ](entityGuid);
  },

  createdUserAndAssociated(userGuid, entityGuid, entityUsers, entityType) {
    const user = entityUsers.filter(
      entityUser => entityUser.guid === userGuid
    )[0];

    if (!user) {
      const err = new Error('User was not associated');
      const message = `The user ${userGuid} was not associated in ${entityGuid}.`;
      return Promise.resolve(userActions.userInviteCreateError(err, message));
    }

    if (entityType === ORG_NAME) {
      AppDispatcher.handleViewAction({
        type: userActionTypes.USER_ORG_ASSOCIATED,
        userGuid,
        entityGuid,
        user
      });
    } else {
      AppDispatcher.handleViewAction({
        type: userActionTypes.USER_SPACE_ASSOCIATED,
        userGuid,
        entityGuid,
        user
      });
    }

    return Promise.resolve(user);
  },

  userInviteCreateError(err, contextualMessage) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.USER_INVITE_ERROR,
      err,
      contextualMessage
    });

    return Promise.resolve(err);
  },

  changeCurrentlyViewedType(userType) {
    AppDispatcher.handleUIAction({
      type: userActionTypes.USER_CHANGE_VIEWED_TYPE,
      userType
    });
  },

  fetchCurrentUserInfo() {
    AppDispatcher.handleViewAction({
      type: userActionTypes.CURRENT_USER_INFO_FETCH
    });

    return uaaApi
      .fetchUserInfo()
      .then(userInfo => userActions.receivedCurrentUserInfo(userInfo));
  },

  receivedCurrentUserInfo(userInfo) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.CURRENT_USER_INFO_RECEIVED,
      currentUser: userInfo
    });

    return Promise.resolve(userInfo);
  },

  fetchCurrentUserUaaInfo(guid) {
    if (!guid) {
      return Promise.reject(new Error('guid is required'));
    }

    AppDispatcher.handleViewAction({
      type: userActionTypes.CURRENT_UAA_INFO_FETCH
    });

    return uaaApi
      .fetchUaaInfo(guid)
      .then(uaaInfo => userActions.receivedCurrentUserUaaInfo(uaaInfo));
  },

  receivedCurrentUserUaaInfo(uaaInfo) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.CURRENT_UAA_INFO_RECEIVED,
      currentUaaInfo: uaaInfo
    });

    return Promise.resolve(uaaInfo);
  },

  fetchUser(userGuid) {
    if (!userGuid) {
      return Promise.reject(new Error('userGuid is required'));
    }

    AppDispatcher.handleViewAction({
      type: userActionTypes.USER_FETCH,
      userGuid
    });

    return cfApi.fetchUser(userGuid).then(userActions.receivedUser);
  },

  receivedUser(user) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.USER_RECEIVED,
      user
    });

    return Promise.resolve(user);
  },

  fetchCurrentUser() {
    AppDispatcher.handleViewAction({
      type: userActionTypes.CURRENT_USER_FETCH
    });

    // TODO add error action
    return (
      userActions
        .fetchCurrentUserInfo()
        .then(userInfo => {
          const userId = userInfo.user_id;

          return Promise.all([
            userActions.fetchUser(userId),
            userActions.fetchCurrentUserUaaInfo(userId)
          ]);
        })
        // Grab user from store with all merged properties
        .then(() => UserStore.currentUser)
        .then(userActions.receivedCurrentUser)
    );
  },

  // Meta action that the current user is completely loaded
  receivedCurrentUser(user) {
    AppDispatcher.handleServerAction({
      type: userActionTypes.CURRENT_USER_RECEIVED,
      user
    });

    return Promise.resolve(user);
  }
};

export default userActions;
