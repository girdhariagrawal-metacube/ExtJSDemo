/**
 * This file contains tab panel for various operations
 * @class POC.view.main.TabPanel
 * @extends Ext.tav.Panel
 */

Ext.define('POC.view.main.ToolsTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'tabpanel',
    requires: [
      'Ext.plugin.Viewport',
      'POC.view.main.NodeInfo',
      'POC.view.main.SaveGraph'
    ],
    //items represents various tabs
    items: [{
        title: 'Current Node Information',
        items: [{
          xtype      : 'info'       //node information tab
        }]
    }, {
        title: 'Add Activity',
        items: [{
          xtype      : 'activity'  //Add activity tab
        }]
    }, {
        title: 'Save Graph',
        items: [{
          xtype      : 'save'    //Save graph to client system
        }]
    }, {
        title: 'Upload Graph',
        items: [{
          xtype      : 'upload'  //upload graph to server
        }]
    }]
});
