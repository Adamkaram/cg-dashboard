import PropTypes from 'prop-types';
import React from 'react';
import Action from './action.jsx';
import { FormError } from './form';
import PanelActions from './panel_actions.jsx';
import formatRoute from '../util/format_route';
import routeFormCss from '../css/route_form.css';

const propTypes = {
  domains: PropTypes.array.isRequired,
  route: PropTypes.object,
  routeLimit: PropTypes.number,
  error: PropTypes.object,
  submitHandler: PropTypes.func,
  cancelHandler: PropTypes.func
};

const defaultProps = {
  route: {},
  routeLimit: -1,
  error: null,
  submitHandler: ev => {
    ev.preventDefault();
  },
  cancelHandler: ev => {
    ev.preventDefault();
  }
};

export default class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain_name: props.route.domain_name,
      domain_guid: props.route.domain_guid, // snake_case since it's an api arg
      guid: props.route.guid,
      host: props.route.host,
      path: props.route.path
    };
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  // TODO: If there are multiple route forms on the page, does it matter if
  // they all have elements with the same names? IDs are unique
  _onChange(event) {
    event.preventDefault();
    const newValue = {};
    newValue[event.target.name] = event.target.value;

    if (event.target.name === 'domain_guid') {
      newValue.domain_name = this.props.domains.find(
        domain => domain.guid === event.target.value
      ).name;
    }

    this.setState(newValue);
  }

  _onSubmit(event) {
    event.preventDefault();
    const payload = {};
    Object.keys(this.state).forEach(key => {
      let value = this.state[key];
      // path needs to start with a / per the cf api docs
      if (key === 'path' && !value) {
        value = '';
      } else if (key === 'path' && value[0] !== '/' && value !== '') {
        value = `/${value}`;
      }
      payload[key] = value;
    });
    this.props.submitHandler(payload);
  }

  get fullUrl() {
    const { domain_name, host, path } = this.state;
    return formatRoute(domain_name, host, path);
  }

  get hasChanged() {
    let changed = false;

    if (this.state.host !== this.props.route.host) {
      changed = true;
    } else if (this.state.domain_guid !== this.props.route.domain_guid) {
      changed = true;
    } else if (this.state.path !== this.props.route.path) {
      changed = true;
    }

    return changed;
  }

  get submitActionText() {
    if (this.props.route.guid) return 'OK';
    return 'Create';
  }

  render() {
    const route = this.props.route;
    const domains = this.props.domains;
    const routeLimit = this.props.routeLimit;
    let limit;

    if (routeLimit > -1) {
      // TODO move form notification into own component.
      limit = (
        <span className="form-notification form-notification-info">
          <strong>{routeLimit}</strong> routes remain in your space quota
        </span>
      );
    }

    return (
      <form className="route-form panel-form-replace" onSubmit={this._onSubmit}>
        {limit}
        <fieldset>
          <div className="route-fields">
            <div className="route-field-host">
              <label htmlFor={`${route.guid}-host`}>Host</label>
              <input
                type="text"
                id={`${route.guid}-host`}
                name="host"
                value={this.state.host}
                onChange={this._onChange}
              />
            </div>
            <div className="route-field-domain">
              <label htmlFor={`${route.guid}-domain`}>Domain</label>
              <select
                id={`${route.guid}-domain`}
                name="domain_guid"
                onChange={this._onChange}
                value={this.props.route.domain_guid}
              >
                <option key="none">---</option>
                {domains.map(domain => (
                  <option key={domain.guid} value={domain.guid}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="route-field-path">
              <label htmlFor={`${route.guid}-path`}>Path (optional)</label>
              <input
                type="text"
                id={`${route.guid}-path`}
                name="path"
                value={this.state.path}
                onChange={this._onChange}
              />
            </div>
          </div>
        </fieldset>
        <div>
          <label htmlFor="route-preview">Route preview</label>
          <input
            type="text"
            readOnly
            id="route-preview"
            className="route-form-preview"
            value={this.fullUrl}
          />
          <div>
            {(() => {
              // Props error is non-specific when error happens at route creation.
              if (this.props.error) {
                return <FormError message={this.props.error.description} />;
                // Route error is a error when updating/deleting a specific route.
              } else if (route.error) {
                return <FormError message={route.error.description} />;
              }
            })()}
          </div>
        </div>
        <div className="route-form-actions">
          <PanelActions>
            <Action
              clickHandler={this.props.cancelHandler}
              label="Cancel"
              style="base"
              type="outline"
            >
              Cancel
            </Action>
            <Action
              clickHandler={this._onSubmit}
              label={this.submitActionText}
              style="finish"
              disabled={!this.hasChanged}
            >
              {this.submitActionText}
            </Action>
          </PanelActions>
        </div>
      </form>
    );
  }
}

RouteForm.propTypes = propTypes;
RouteForm.defaultProps = defaultProps;
