import '../../global_setup.js';

import AppDispatcher from '../../../dispatcher.js';
import cfApi from '../../../util/cf_api.js';
import orgActions from '../../../actions/org_actions.js';
import { orgActionTypes } from '../../../constants.js';

describe('orgActions', () => {
  var sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('fetchAll()', () => {
    it('should dispatch a view event of type orgs fetch', (done) => {
      var spy = sandbox.spy(AppDispatcher, 'handleViewAction');

      orgActions.fetchAll();

      setTimeout(() => {
        let arg = spy.getCall(0).args[0];
        expect(arg.type).toEqual(orgActionTypes.ORGS_FETCH);
        done();
      });
    });
  });

  describe('changeCurrentOrg()', function() {
    it('should send an org change current event action with new org', function() {
      var spy = sandbox.spy(AppDispatcher, 'handleViewAction'),
          expected = 'asdlfka';

      orgActions.changeCurrentOrg(expected);

      expect(spy).toHaveBeenCalledOnce();
      let arg = spy.getCall(0).args[0];
      expect(arg.type).toEqual(orgActionTypes.ORG_CHANGE_CURRENT);
      expect(arg.orgGuid).toEqual(expected);
    });
  });
});
