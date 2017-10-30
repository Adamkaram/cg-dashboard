import React from "react";

import Action from "./action.jsx";
import ActivityLog from "./activity_log.jsx";
import { appHealth, worstAppInstanceState } from "../util/health";
import { appStates } from "../constants";
import { config } from "skin";
import AppStore from "../stores/app_store";
import Breadcrumbs from "./breadcrumbs";
import DomainStore from "../stores/domain_store";
import EnvStore from "../stores/env_store";
import RouteStore from "../stores/route_store";
import EntityIcon from "./entity_icon.jsx";
import SystemErrorMessage from "./system_error_message.jsx";
import Loading from "./loading.jsx";
import OrgStore from "../stores/org_store";
import QuotaStore from "../stores/quota_store";
import RoutesPanel from "./routes_panel.jsx";
import EnvPanel from "./env/env_panel";
import PageHeader from "./page_header.jsx";
import Panel from "./panel.jsx";
import ServiceInstancePanel from "./service_instance_panel.jsx";
import UPSIPanel from "./upsi/upsi_panel";
import SpaceStore from "../stores/space_store";
import UPSIStore from "../stores/upsi_store";
import UsageLimits from "./usage_and_limits.jsx";
import appActions from "../actions/app_actions";

function appReady(app) {
  return !!app && !!app.name;
}

function mapStoreToState() {
  let route;
  const { currentAppGuid } = AppStore;
  const app = AppStore.get(currentAppGuid);
  const envRequest = EnvStore.getEnvRequest(currentAppGuid);
  const envUpdateError = EnvStore.getUpdateError(currentAppGuid);
  const space = SpaceStore.get(SpaceStore.currentSpaceGuid);
  const org = OrgStore.get(OrgStore.currentOrgGuid);
  const upsisRequest = space
    ? UPSIStore.getAllForSpaceRequest(space.guid)
    : null;

  if (app) {
    // This depends on DomainStore
    route = RouteStore.getRouteURLForApp(app);
  }

  const quotaGuid =
    (space && space.space_quota_definition_guid) ||
    (org && org.quota_definition_guid) ||
    null;

  const quota = QuotaStore.get(quotaGuid);

  return {
    app: app || {},
    currentAppGuid,
    currentOrgName: OrgStore.currentOrgName,
    currentSpaceName: SpaceStore.currentSpaceName,
    empty: !AppStore.loading && !appReady(app) && !QuotaStore.loading,
    envRequest,
    envUpdateError,
    loading:
      OrgStore.loading ||
      SpaceStore.loading ||
      AppStore.loading ||
      QuotaStore.loading,
    org,
    route,
    quota,
    space,
    upsisRequest
  };
}

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = mapStoreToState();

    this._onChange = this._onChange.bind(this);
    this._onRestart = this._onRestart.bind(this);
    this._onStart = this._onStart.bind(this);
  }

  componentDidMount() {
    AppStore.addChangeListener(this._onChange);
    DomainStore.addChangeListener(this._onChange);
    EnvStore.addChangeListener(this._onChange);
    OrgStore.addChangeListener(this._onChange);
    QuotaStore.addChangeListener(this._onChange);
    RouteStore.addChangeListener(this._onChange);
    SpaceStore.addChangeListener(this._onChange);
    UPSIStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
    DomainStore.removeChangeListener(this._onChange);
    EnvStore.removeChangeListener(this._onChange);
    OrgStore.removeChangeListener(this._onChange);
    QuotaStore.removeChangeListener(this._onChange);
    RouteStore.removeChangeListener(this._onChange);
    SpaceStore.removeChangeListener(this._onChange);
    UPSIStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(mapStoreToState());
  }

  _onRestart() {
    appActions.restart(this.state.app.guid);
  }

  _onStart() {
    appActions.start(this.state.app.guid);
  }

  get statusUI() {
    let label;
    let worstState = this.state.app.state;
    if (this.state.app.state === appStates.started) {
      // If the app is started, use the instance state
      worstState = worstAppInstanceState(
        (this.state.app.app_instances || []).map(instance => instance.state)
      );
    }

    if (worstState) {
      label = <span className="usa-label">{worstState}</span>;
    }

    return label;
  }

  get openApp() {
    const route = this.state.route;
    if (!route) return null;
    return (
      <Action
        style="primary"
        href={`https://${route}`}
        label="open app"
        type="outline"
      >
        <span>Open app</span>
      </Action>
    );
  }

  get restart() {
    let loading;

    let handler = this._onRestart;
    let actionText = "Restart app";
    if (!AppStore.isRunning(this.state.app)) {
      handler = this._onStart;
      actionText = "Start app";
    }

    if (AppStore.isStarting(this.state.app)) {
      loading = <Loading text="Starting app" style="inline" />;
    }

    if (AppStore.isRestarting(this.state.app)) {
      loading = <Loading text="Restarting app" style="inline" />;
    }

    const action = loading || (
      <Action
        style="primary"
        clickHandler={handler}
        label={actionText}
        type="outline"
      >
        <span>{actionText}</span>
      </Action>
    );

    return action;
  }

  get error() {
    let error;

    if (this.state.app.error) {
      error = <SystemErrorMessage error={this.state.app.error} />;
    }

    return error;
  }

  get logsDocumentation() {
    return <config.snippets.logs />;
  }

  render() {
    const {
      org,
      space,
      app,
      envRequest,
      envUpdateError,
      upsisRequest
    } = this.state;

    const loading = <Loading text="Loading app" />;
    let content = <div>{loading}</div>;
    const title = (
      <span>
        <EntityIcon
          entity="app"
          health={appHealth(this.state.app)}
          iconSize="large"
        />
        {this.state.app.name} {this.statusUI}
      </span>
    );

    if (this.state.empty) {
      content = <h4 className="test-none_message">App not available</h4>;
    } else if (!this.state.loading && appReady(this.state.app)) {
      content = (
        <div>
          <div className="grid">
            <div className="grid-width-12">
              <Breadcrumbs org={org} space={space} app={app} />
              <PageHeader title={title}>
                {this.error}
                {this.openApp}
                {this.restart}
              </PageHeader>
            </div>
          </div>
          <Panel title="Usage and allocation">
            <UsageLimits app={this.state.app} quota={this.state.quota} />
          </Panel>

          <Panel title="Routes">
            <RoutesPanel />
          </Panel>

          <Panel title="Services">
            <ServiceInstancePanel />
          </Panel>

          {upsisRequest && <UPSIPanel app={app} upsisRequest={upsisRequest} />}

          {envRequest && (
            <EnvPanel
              app={app}
              envRequest={envRequest}
              updateError={envUpdateError}
            />
          )}

          <Panel title="Recent activity">
            {this.logsDocumentation}
            <ActivityLog />
          </Panel>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

AppContainer.propTypes = {};
