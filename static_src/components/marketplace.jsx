/**
 * Renders the marketplace page
 */

import React from 'react';
import CreateServiceInstance from './create_service_instance.jsx';
import Loading from './loading.jsx';
import OrgStore from '../stores/org_store';
import PanelDocumentation from './panel_documentation.jsx';
import ServiceInstanceStore from '../stores/service_instance_store';
import ServiceList from './service_list.jsx';
import ServicePlanStore from '../stores/service_plan_store';
import ServiceStore from '../stores/service_store';
import { config } from 'skin';

const propTypes = {};

function stateSetter() {
  const loading = ServiceStore.loading || ServicePlanStore.loading;
  const currentOrgGuid = OrgStore.currentOrgGuid;

  return {
    currentOrgGuid,
    loading,
    currentOrg: OrgStore.get(currentOrgGuid),
    createInstanceForm: ServiceInstanceStore.createInstanceForm,
    services: ServiceStore.getAll().map(service => {
      const plan = ServicePlanStore.getAllFromService(service.guid);
      return { ...service, servicePlans: plan };
    })
  };
}

export default class Marketplace extends React.Component {
  constructor(props) {
    super(props);

    this.state = stateSetter();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    OrgStore.addChangeListener(this._onChange);
    ServiceStore.addChangeListener(this._onChange);
    ServicePlanStore.addChangeListener(this._onChange);
    ServiceInstanceStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    OrgStore.removeChangeListener(this._onChange);
    ServiceStore.removeChangeListener(this._onChange);
    ServicePlanStore.removeChangeListener(this._onChange);
    ServiceInstanceStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(stateSetter());
  }

  get documentation() {
    return (
      <PanelDocumentation description>
        <p>
          Use this marketplace to create service instances for apps in this
          space. Then bind service instances to apps. See{' '}
          <a href="https://cloud.gov/docs/services/">
            docs for these services
          </a>, and
          {config.docs.managed_services && (
            <span>
              <a href={config.docs.managed_services}>
                {' '}
                learn about using service instances
              </a>.
            </span>
          )}
        </p>
      </PanelDocumentation>
    );
  }

  render() {
    const state = this.state;
    let form;

    if (state.createInstanceForm) {
      form = (
        <CreateServiceInstance
          error={state.createInstanceForm.error}
          service={state.createInstanceForm.service}
          servicePlan={state.createInstanceForm.servicePlan}
        />
      );
    }

    let content = <Loading text="Loading marketplace services" />;

    if (!state.loading) {
      content = (
        <div>
          {this.documentation}
          <ServiceList services={state.services} />
          {form}
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

Marketplace.propTypes = propTypes;
