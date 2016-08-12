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
      // 'POC.view.main.AddNode'
    ],
    controller: 'ToolsTabController',
    //items represents various tabs
    items: [{
        title: 'Current',
        layout: 'fit',
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
        tabConfig: {
                    listeners: {
                        click: 'updateJsonFile'
                    }
                }
    },
     {
        title: 'Upload Graph',
        items: [{
          xtype      : 'upload'  //upload graph to server
        }]
    },
     {
        title: 'Add Circle and Rectangles',
        items: [{
          xtype: 'nodeTool',
          frame: true,
          preventHeader: true,
          bodyPadding: '10',
          layout: 'default',
          //items represents various form containers
              items: [{
                     xtype: 'checkboxfield',
                     name : 'circle',
                     label: 'Circle',
                     value: 'Circle',
                     checked: true
                 },
                 {
                     xtype: 'checkboxfield',
                     name : 'rectangle',
                     label: 'Rectangle'
                 }],
           renderTo: Ext.getBody()

        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
                { xtype: 'spacer' },
                {
                    text: 'getValues',
                    handler: function() {
                        var form = Ext.ComponentQuery.query('formpanel')[0],
                            values = form.getValues();

                        Ext.Msg.alert(null,
                            "Circle: " + ((values.tomato) ? "yes" : "no") +
                            "<br />Rectangle: " + ((values.salami) ? "yes" : "no")
                        );
                    }
                },
                { xtype: 'spacer' }
            ]
        }]
    }
  ],
      listeners: {
      move: 'updateJsonFile'
    }
});
