import React from "react";

import AppStore from "../stores/app_store";
import Action from "./action";
import ComplexList from "./complex_list";
import DomainStore from "../stores/domain_store";
import OrgStore from "../stores/org_store";
import PanelActions from "./panel_actions";
import routeActions from "../actions/route_actions";
import Route from "./route";
import RouteForm from "./route_form";
import RouteStore from "../stores/route_store";
import QuotaStore from "../stores/quota_store";
import SpaceStore from "../stores/space_store";
import { spaceHref } from "../util/url";

function stateSetter() {
  const appGuid = AppStore.currentAppGuid;
  const orgGuid = OrgStore.currentOrgGuid;
  const spaceGuid = SpaceStore.currentSpaceGuid;

  const currentOrg = OrgStore.get(OrgStore.currentOrgGuid);
  const currentSpace = SpaceStore.get(SpaceStore.currentSpaceGuid);
  const orgQuotaGuid = currentOrg ? currentOrg.quota_definition_guid : null;
  const spaceQuotaGuid = currentSpace
    ? currentSpace.space_quota_definition_guid
    : null;

  const routes = RouteStore.getAllForSpace(spaceGuid).map(route => {
    let newRoute = Object.assign({}, route);
    const domain = DomainStore.get(route.domain_guid);
    if (domain) {
      newRoute = Object.assign({}, newRoute, { domain_name: domain.name });
    }
    if (route.path && route.path[0] === "/") {
      newRoute.path = route.path.replace("/", "");
    }
    return newRoute;
  });

  const boundRoutes = routes.filter(route => route.app_guid === appGuid);
  const unboundRoutes = routes.filter(route => !route.app_guid);

  return {
    appGuid,
    orgGuid,
    spaceGuid,
    orgName: OrgStore.currentOrgName,
    spaceName: SpaceStore.currentSpaceName,
    orgQuota: QuotaStore.get(orgQuotaGuid),
    spaceQuota: QuotaStore.get(spaceQuotaGuid),
    boundRoutes,
    unboundRoutes,
    showCreateForm: RouteStore.showCreateRouteForm,
    error: RouteStore.error
  };
}

export default class RoutesPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = stateSetter();

    this._onChange = this._onChange.bind(this);
    this._createRouteAndAssociate = this._createRouteAndAssociate.bind(this);
    this._addCreateRouteForm = this._addCreateRouteForm.bind(this);
    this._removeCreateRouteForm = this._removeCreateRouteForm.bind(this);
  }

  componentDidMount() {
    DomainStore.addChangeListener(this._onChange);
    QuotaStore.addChangeListener(this._onChange);
    RouteStore.addChangeListener(this._onChange);
  }

  componentWillReceiveProps() {
    this.setState(stateSetter());
  }

  componentWillUnmount() {
    DomainStore.removeChangeListener(this._onChange);
    QuotaStore.removeChangeListener(this._onChange);
    RouteStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(stateSetter());
  }

  _addCreateRouteForm(ev) {
    if (ev) ev.preventDefault();
    routeActions.showCreateForm();
  }

  _removeCreateRouteForm(ev) {
    if (ev) ev.preventDefault();
    routeActions.hideCreateForm();
  }

  _createRouteAndAssociate(route, ev) {
    if (ev) ev.preventDefault();
    const { appGuid, spaceGuid } = this.state;
    const domainGuid = route.domain_guid;
    routeActions.createRouteAndAssociate(appGuid, domainGuid, spaceGuid, route);
  }

  get addRouteAction() {
    if (this.state.showCreateForm) return null;
    return (
      <Action
        clickHandler={this._addCreateRouteForm}
        label="Create a new route for this app"
        type="outline"
      >
        Create a new route for this app
      </Action>
    );
  }

  get createRouteForm() {
    if (!this.state.showCreateForm) return null;

    let routeTotal = -1;
    if (this.state.spaceQuota) {
      routeTotal = this.state.spaceQuota.total_routes;
    } else if (this.state.orgQuota) {
      routeTotal = this.state.orgQuota.total_routes;
    }
    const routeLimit =
      routeTotal -
      (this.state.boundRoutes.length + this.state.unboundRoutes.length);
    return (
      <RouteForm
        domains={DomainStore.getAll()}
        routeLimit={routeLimit}
        error={this.state.error}
        cancelHandler={() => this._removeCreateRouteForm()}
        submitHandler={this._createRouteAndAssociate}
      />
    );
  }

  get spaceLink() {
    if (!this.state.orgGuid || !this.state.spaceGuid) {
      return null;
    }

    return (
      <a
        href={spaceHref(this.state.orgGuid, this.state.spaceGuid)}
        className="space-link"
      >
        {this.state.spaceName}
      </a>
    );
  }

  renderRoutes(routes) {
    let content = <h4>No routes</h4>;

    if (routes && routes.length) {
      content = routes.map(route => (
        <Route key={route.guid} route={route} appGuid={this.state.appGuid} />
      ));
    }
    return content;
  }

  render() {
    return (
      <div>
        {this.createRouteForm}
        <ComplexList title="Bound routes">
          {this.renderRoutes(this.state.boundRoutes)}
        </ComplexList>
        <ComplexList title="Routes available in space">
          {this.renderRoutes(this.state.unboundRoutes)}
        </ComplexList>
        <PanelActions>{this.addRouteAction}</PanelActions>
      </div>
    );
  }
}

RoutesPanel.propTypes = {};

RoutesPanel.defaultProps = {};
