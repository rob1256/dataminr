import { ISchema } from './types';

const schema: ISchema = {
  sections: [
    {
      title: 'General',
      featureFlagGroups: [
        [
          {
            title: 'Case Management',
          },
        ],
        [
          {
            title: 'Map Timeline',
          },
        ],
        [
          {
            title: 'Views & Briefings',
          },
        ],
        [
          {
            title: 'Notifications',
          },
        ],
        [
          {
            title: 'Mass Communications',
          },
        ],
        [
          {
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
            title: 'Audit Log',
          },
          {
            title: 'Users',
            children: [
              {
                title: 'Users Add',
              },
              {
                title: 'Users Delete',
              },
              {
                title: 'Users Edit',
              },
              {
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
            title: 'Alert Manager',
          },
          {
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
          }
        ],
      ],
    },
  ],
};

export default schema;
