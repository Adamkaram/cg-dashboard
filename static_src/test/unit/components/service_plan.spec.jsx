import React from 'react';
import { shallow } from 'enzyme';
import ServicePlan from '../../../components/service_plan.jsx';
import Action from '../../../components/action.jsx';

describe('<ServicePlan />', () => {
  const props = {
    cost: 'Free',
    onAddInstance: sinon.spy(),
    plan: {
      guid: 'zgwefzexst4',
      name: 'redis',
      description: 'in-memory key value store'
    }
  };
  const findPlanNodeByLabel = (wrapper, label) =>
    wrapper.find('td').filterWhere(node => node.prop('label') === label);

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ServicePlan {...props} />);
  });

  it('renders an action button for service instance creation', () => {
    const button = wrapper.find(Action);

    expect(button.length).toBe(1);
    expect(button.props().children).toBe('Create service instance');
  });

  it('renders the name of the plan', () => {
    const name = findPlanNodeByLabel(wrapper, 'Name');

    expect(name.text()).toBe(props.plan.name);
  });

  it('renders the plan description', () => {
    const description = findPlanNodeByLabel(wrapper, 'Description');

    expect(description.text()).toBe(props.plan.description);
  });

  it('calls its `onAddInstance` prop passing the plan guid from handler', () => {
    wrapper.instance().handleClick();

    expect(props.onAddInstance.calledOnce).toBe(true);
    expect(props.onAddInstance.calledWith(props.plan.guid)).toBe(true);
  });
});

describe('with multi param plan', () => {
  it('renders a link to documentation', () => {
    let updatedProp;
    let wrapper;
    let button;
    const plans = [
      'cdn-route',
      'space-auditor',
      'space-deployer',
      'oauth-client'
    ];
    const props = {
      cost: 'Free',
      onAddInstance: sinon.spy(),
      plan: {
        guid: 'zgwefzexst4',
        description: 'in-memory key value store'
      }
    };
    for (let i = plans.length - 1; i >= 0; i--) {
      updatedProp = Object.assign(props);
      updatedProp.plan.name = plans[i];
      wrapper = shallow(<ServicePlan {...props} />);
      button = wrapper.find(Action);

      expect(button.length).toBe(1);
      expect(button.props().children).toBe('Display documentation link');
    }
  });
});
