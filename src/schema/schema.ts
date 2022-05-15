import { ISchema } from './types';

export const schema: ISchema = {
  sections: [
    {
      title: 'General',
      featureFlagGroups: [
        [
          {
            id: 'caseManagement',
            title: 'Case Management',
          },
        ],
        [
          {
            id: 'mapTimeline',
            title: 'Map Timeline',
          },
        ],
        [
          {
            id: 'viewsAndBriefings',
            title: 'Views & Briefings',
          },
        ],
        [
          {
            id: 'notifications',
            title: 'Notifications',
          },
        ],
        [
          {
            id: 'massCommunications',
            title: 'Mass Communications',
          },
        ],
        [
          {
            id: 'trafficCameras',
            title: 'Traffic Cameras',
          },
        ],
      ],
    },
    {
      title: 'Settings',
      featureFlagGroups: [
        [
          {
            id: 'auditLog',
            title: 'Audit Log',
          },
          {
            id: 'users',
            title: 'Users',
            childFeatureFlags: [
              {
                id: 'usersAdd',
                title: 'Users Add',
              },
              {
                id: 'usersDelete',
                title: 'Users Delete',
              },
              {
                id: 'usersEdit',
                title: 'Users Edit',
              },
              {
                id: 'maxUsers',
                title: 'Max Users',
                additionalInput: {
                  type: 'dropdown',
                  options: [
                    5,
                    10,
                    15,
                    20,
                    50,
                    100,
                  ],
                },
              },
            ],
          },
        ],
      ],
    },
    {
      title: 'Alerts',
      featureFlagGroups: [
        [
          {
            id: 'alertManager',
            title: 'Alert Manager',
          },
          {
            id: 'alertRules',
            title: 'Alert Rules',
            additionalInput: {
              type: 'dropdown',
              options: [
                5,
                10,
                15,
                20,
                50,
                100,
              ],
            },
          },
        ],
      ],
    },
  ],
};
