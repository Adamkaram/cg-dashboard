
import '../../global_setup.js';

import AppDispatcher from '../../../dispatcher.js';
import cfApi from '../../../util/cf_api.js';
import OrgStore from '../../../stores/org_store.js';
import { orgActionTypes } from '../../../constants';

function wrapOrgs(orgs) {
  var n = 0;
  return orgs.map((org) => {
    return {
      metadata: { guid: n },
      entity: org
    };
    n++;
  });
};

function unwrapOrgs(orgs) {
  return orgs.map((org) => {
    return Object.assign(org.entity, org.metadata);
  });
}

describe('OrgStore', () => {
  var sandbox;

  beforeEach(() => {
    OrgStore._data = [];
    OrgStore._currentOrg = null;
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('constructor()', () => {
    it('should set _data to empty array', () => {
      expect(OrgStore._data).toBeEmptyArray();
    });
  });

  describe('getAll()', () => {
    it('should return object when no state', () => {
      expect(OrgStore.getAll()).toBeArray();
    });
  });

  describe('get()', () => {
    it('should return the correct org based on guid', () => {
      var testOrgs = [
        { guid: '1xxa', name: 'testOrgA' },
        { guid: '1xxb', name: 'testOrgB' }
      ];

      OrgStore._data = testOrgs;

      let actual = OrgStore.get(testOrgs[0].guid);

      expect(actual).toEqual(testOrgs[0]);
    });
  });

  describe('get currentOrg', function() {
    it('should start with null, none selected', function() {
      expect(OrgStore.currentOrg).toBe(null);
    });

    it('should return the current org its on', function() {
      var expected = { name: 'testOrgA', guid: 'asdlfkja;' };
      OrgStore._currentOrg = expected;
      expect(OrgStore.currentOrg).toEqual(expected);
    });
  });

  describe('on orgs received', () => {
    it('should set data to passed in orgs', () => {
      var expected = wrapOrgs([{t: 1}, {t: 2}]);
      expect(OrgStore.getAll()).toBeArray();

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORGS_RECEIVED,
        orgs: expected
      });

      expect(OrgStore.getAll()).toEqual(unwrapOrgs(expected));
    });

    it('should emit a change event', () => {
      var spy = sandbox.spy(OrgStore, 'emitChange');

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORGS_RECEIVED,
        orgs: []
      });

      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('on org fetch', function() {
    it('should call the api org fetch function', function() {
      var spy = sandbox.spy(cfApi, 'fetchOrg'),
          expected = 'xsfewq';

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORG_FETCH,
        orgGuid: expected
      });

      expect(spy).toHaveBeenCalledOnce();
      let arg = spy.getCall(0).args[0];
      expect(arg).toEqual(expected);
    });
  });

  describe('on org received', function() {
    it('should emit a change event', function() {
      var spy = sandbox.spy(OrgStore, 'emitChange');

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORG_RECEIVED,
        org: { guid: 'asdf' }
      });

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should ensure org passed in has data added to it', () => {
      var testGuid = 'xaaddf',
          expected = {
            guid: testGuid,
            name: 'orgA',
            spaces: [
              { guid: 'xaaddf1', name: 'spaceA'},
              { guid: 'xaaddf2', name: 'spaceB'}
            ]
          };

      OrgStore._data = [
        { guid: testGuid, spaceUrl: 'https://space' }
      ];
      expect(OrgStore.get(testGuid)).toBeObject();

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORG_RECEIVED,
        org: expected
      });

      expect(OrgStore._data[0].guid).toEqual(expected.guid);
      expect(OrgStore._data[0].spaces).toEqual(expected.spaces);
    });
  });

  describe('on org change current', function() {
    it('should set current org to org with guid passed in', function() {
      var expected = { guid: 'sdsf', name: 'testA' };

      OrgStore._data.push(expected);

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORG_CHANGE_CURRENT,
        orgGuid: expected.guid
      });

      expect(OrgStore.currentOrg).toEqual(expected);
    });
    it('should emit a change event if it finds the org', function() {
      var spy = sandbox.spy(OrgStore, 'emitChange'),
          expected = { guid: 'sdsf', name: 'testA' };

      OrgStore._data.push(expected);

      AppDispatcher.handleViewAction({
        type: orgActionTypes.ORG_CHANGE_CURRENT,
        orgGuid: expected.guid
      });

      expect(spy).toHaveBeenCalledOnce();
    });
  });
});