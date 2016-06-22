/**
 * This class represents the tabbed tool panel, it contains all the tools options
 * for given graph model.
 * @class POC.view.main.ToolsTabPanel
 * @extends Ext.tab.Panel
 */

Ext.define('POC.view.main.ToolsTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'tools',

    requires: [
        'Ext.plugin.Viewport',
        'POC.view.main.NodeInfo'
    ],

    items: [{
        title     : 'Current Node Information',
        iconCls   : 'fa fa-check-circle',

        items : [{
            xtype: 'info'
          }]
       }]
});
