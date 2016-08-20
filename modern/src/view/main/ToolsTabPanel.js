/**
 * This file contains tab panel for various operations
 * @class POC.view.main.TabPanel
 * @extends Ext.tav.Panel
 */

Ext.define('POC.view.main.ToolsTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'toolTabpanel',
    requires: [
      // 'Ext.ux.Mediator',
      'POC.view.main.UploadGraph',
      'POC.view.main.NodeInfo',
      'POC.view.main.AddActivity',
      'POC.view.main.SaveGraph',
      'POC.view.main.ToolsTabPanelController',
      'POC.view.main.AddSpritesOnClick'
    ],
    controller: 'ToolsTabController',
     tabBar: {
         layout: {
             pack: Ext.filterPlatform('ie10') ? 'start' : 'center'
         }
     },

    //items represents various tabs
    items: [{
        title: 'Current',
        // layout: 'fit',
        items: [{
          xtype      : 'info'       //node information tab
        }]
    },
    {
        title: 'Add Activity',
        items: [{
          xtype      : 'activity'  //Add activity tab
        }]
    },
    {
        title: 'Save',
        items: [{
          xtype      : 'save'    //Save graph to client system
        }],
    },
     {
        title: 'Upload Graph    ',
        items: [{
          xtype      : 'upload'  //upload graph to server
        }]
    },
     {
        title: 'Add Circle and Rectangles',
        items: [{
          xtype      : 'nodeTool' // to add sprites manually on click
        }]
    }
  ]
});
