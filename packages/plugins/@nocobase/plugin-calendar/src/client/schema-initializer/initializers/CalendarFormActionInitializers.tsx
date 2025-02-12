import { SchemaInitializer, useCollection } from '@nocobase/client';
import { generateNTemplate } from '../../../locale';

// 表单的操作配置
export const CalendarFormActionInitializers: SchemaInitializer = new SchemaInitializer({
  title: generateNTemplate('Configure actions'),
  name: 'CalendarFormActionInitializers',
  icon: 'SettingOutlined',
  style: {
    marginLeft: 8,
  },
  items: [
    {
      type: 'itemGroup',
      name: 'enableActions',
      title: generateNTemplate('Enable actions'),
      children: [
        {
          name: 'edit',
          title: generateNTemplate('Edit'),
          Component: 'UpdateActionInitializer',
          schema: {
            'x-component': 'Action',
            'x-decorator': 'ACLActionProvider',
            'x-component-props': {
              type: 'primary',
            },
          },
          useVisible() {
            const collection = useCollection();
            return (collection.template !== 'view' || collection?.writableView) && collection.template !== 'sql';
          },
        },
        {
          name: 'delete',
          title: generateNTemplate('Delete'),
          Component: 'DestroyActionInitializer',
          schema: {
            'x-component': 'Action',
            'x-decorator': 'ACLActionProvider',
          },
          visible: function useVisible() {
            const collection = useCollection();
            return (collection.template !== 'view' || collection?.writableView) && collection.template !== 'sql';
          },
        },
        {
          name: 'deleteEvent',
          title: generateNTemplate('Delete Event'),
          Component: 'DeleteEventActionInitializer',
          schema: {
            'x-component': 'Action',
            'x-decorator': 'ACLActionProvider',
          },
          useVisible() {
            const collection = useCollection();
            return (collection.template !== 'view' || collection?.writableView) && collection.template !== 'sql';
          },
        },
      ],
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      type: 'subMenu',
      name: 'customize',
      title: generateNTemplate('Customize'),
      children: [
        {
          name: 'popup',
          title: generateNTemplate('Popup'),
          Component: 'CustomizeActionInitializer',
          schema: {
            type: 'void',
            title: generateNTemplate('Popup'),
            'x-action': 'customize:popup',
            'x-designer': 'Action.Designer',
            'x-component': 'Action',
            'x-component-props': {
              openMode: 'drawer',
            },
            properties: {
              drawer: {
                type: 'void',
                title: generateNTemplate('Popup'),
                'x-component': 'Action.Container',
                'x-component-props': {
                  className: 'nb-action-popup',
                },
                properties: {
                  tabs: {
                    type: 'void',
                    'x-component': 'Tabs',
                    'x-component-props': {},
                    'x-initializer': 'TabPaneInitializers',
                    properties: {
                      tab1: {
                        type: 'void',
                        title: generateNTemplate('Details'),
                        'x-component': 'Tabs.TabPane',
                        'x-designer': 'Tabs.Designer',
                        'x-component-props': {},
                        properties: {
                          grid: {
                            type: 'void',
                            'x-component': 'Grid',
                            'x-initializer': 'RecordBlockInitializers',
                            properties: {},
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          name: 'updateRecord',
          title: generateNTemplate('Update record'),
          Component: 'CustomizeActionInitializer',
          schema: {
            title: generateNTemplate('Update record'),
            'x-component': 'Action',
            'x-designer': 'Action.Designer',
            'x-acl-action': 'update',
            'x-action': 'customize:update',
            'x-action-settings': {
              assignedValues: {},
              onSuccess: {
                manualClose: true,
                redirecting: false,
                successMessage: generateNTemplate('Updated successfully'),
              },
            },
            'x-component-props': {
              useProps: '{{ useCustomizeUpdateActionProps }}',
            },
          },
          useVisible() {
            const collection = useCollection();
            return (collection.template !== 'view' || collection?.writableView) && collection.template !== 'sql';
          },
        },
        {
          name: 'customRequest',
          title: generateNTemplate('Custom request'),
          Component: 'CustomRequestInitializer',
          useVisible() {
            const collection = useCollection();
            return (collection.template !== 'view' || collection?.writableView) && collection.template !== 'sql';
          },
        },
      ],
    },
  ],
});
