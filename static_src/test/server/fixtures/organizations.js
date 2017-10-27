const organizations = [
  {
    metadata: {
      guid: '4a962676-e687-46c4-95f4-7a83712065c6',
      url: '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6',
      created_at: '2015-03-02T19:58:26Z',
      updated_at: '2015-12-30T06:59:51Z'
    },
    entity: {
      name: 'fake-sandbox',
      billing_enabled: false,
      quota_definition_guid: '69736a84-3b19-4a9e-90f0-3e44c3236271',
      status: 'active',
      default_isolation_segment_guid: null,
      quota_definition_url:
        '/v2/quota_definitions/69736a84-3b19-4a9e-90f0-3e44c3236271',
      spaces_url:
        '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/spaces',
      domains_url:
        '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/domains',
      private_domains_url:
        '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/private_domains',
      users_url: '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/users',
      managers_url:
        '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/managers',
      billing_managers_url:
        '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/billing_managers',
      auditors_url:
        '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/auditors',
      app_events_url:
        '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/app_events',
      space_quota_definitions_url:
        '/v2/organizations/4a962676-e687-46c4-95f4-7a83712065c6/space_quota_definitions'
    }
  },
  {
    metadata: {
      guid: 'cfeb9be5-a61a-4f68-894e-8808ab008aaa',
      url: '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa',
      created_at: '2015-03-13T22:37:53Z',
      updated_at: '2015-06-25T20:27:02Z'
    },
    entity: {
      name: 'fake-cf',
      billing_enabled: false,
      quota_definition_guid: 'f7963421-c06e-4847-9913-bcd0e6048fa2',
      status: 'active',
      default_isolation_segment_guid: null,
      quota_definition_url:
        '/v2/quota_definitions/f7963421-c06e-4847-9913-bcd0e6048fa2',
      spaces_url:
        '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/spaces',
      domains_url:
        '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/domains',
      private_domains_url:
        '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/private_domains',
      users_url: '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/users',
      managers_url:
        '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/managers',
      billing_managers_url:
        '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/billing_managers',
      auditors_url:
        '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/auditors',
      app_events_url:
        '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/app_events',
      space_quota_definitions_url:
        '/v2/organizations/cfeb9be5-a61a-4f68-894e-8808ab008aaa/space_quota_definitions'
    }
  },
  {
    metadata: {
      guid: '48b3f8a1-ffe7-4aa8-8e85-94768d6bd250',
      url: '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250',
      created_at: '2015-08-14T19:20:03Z',
      updated_at: '2016-04-18T18:16:27Z'
    },
    entity: {
      name: 'fake-cf-deck-testing',
      billing_enabled: false,
      quota_definition_guid: 'f7963421-c06e-4847-9913-bcd0e6048fa2',
      status: 'active',
      default_isolation_segment_guid: null,
      quota_definition_url:
        '/v2/quota_definitions/f7963421-c06e-4847-9913-bcd0e6048fa2',
      spaces_url:
        '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/spaces',
      domains_url:
        '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/domains',
      private_domains_url:
        '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/private_domains',
      users_url: '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/users',
      managers_url:
        '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/managers',
      billing_managers_url:
        '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/billing_managers',
      auditors_url:
        '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/auditors',
      app_events_url:
        '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/app_events',
      space_quota_definitions_url:
        '/v2/organizations/48b3f8a1-ffe7-4aa8-8e85-94768d6bd250/space_quota_definitions'
    }
  },
  {
    metadata: {
      guid: 'user_role-org_x-ffe7-4aa8-8e85-94768d6bd250',
      url: '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250',
      created_at: '2015-08-14T19:20:03Z',
      updated_at: '2016-04-18T18:16:27Z'
    },
    entity: {
      name: 'fake-cf-user_role-org_x-testing',
      billing_enabled: false,
      quota_definition_guid: 'f7963421-c06e-4847-9913-bcd0e6048fa2',
      status: 'active',
      default_isolation_segment_guid: null,
      quota_definition_url:
        '/v2/quota_definitions/f7963421-c06e-4847-9913-bcd0e6048fa2',
      spaces_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/spaces',
      domains_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/domains',
      private_domains_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/private_domains',
      users_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/users',
      managers_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/managers',
      billing_managers_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/billing_managers',
      auditors_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/auditors',
      app_events_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/app_events',
      space_quota_definitions_url:
        '/v2/organizations/user_role-org_x-ffe7-4aa8-8e85-94768d6bd250/space_quota_definitions'
    }
  },
  {
    metadata: {
      guid: 'user_role-org_y-ffe7-4aa8-8e85-94768d6bd250',
      url: '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250',
      created_at: '2015-08-14T19:20:03Z',
      updated_at: '2016-04-18T18:16:27Z'
    },
    entity: {
      name: 'fake-cf-user_role-org_y-testing',
      billing_enabled: false,
      quota_definition_guid: 'f7963421-c06e-4847-9913-bcd0e6048fa2',
      status: 'active',
      default_isolation_segment_guid: null,
      quota_definition_url:
        '/v2/quota_definitions/f7963421-c06e-4847-9913-bcd0e6048fa2',
      spaces_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/spaces',
      domains_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/domains',
      private_domains_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/private_domains',
      users_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/users',
      managers_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/managers',
      billing_managers_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/billing_managers',
      auditors_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/auditors',
      app_events_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/app_events',
      space_quota_definitions_url:
        '/v2/organizations/user_role-org_y-ffe7-4aa8-8e85-94768d6bd250/space_quota_definitions'
    }
  }
];

module.exports = organizations;
