/* This file will add new activity
* @class POC.view.main.AddActivity
* @extends Ext.form.Panel
*/

Ext.define('POC.view.main.AddSpritesOnClick', {
 extend: 'Ext.form.Panel',
 xtype: 'nodeTool',
 requires: [
       'POC.GraphState',
       'POC.view.main.ToolsTabPanelController',
 ],
 controller: 'ToolsTabController',
 frame: true,
 preventHeader: true,
 bodyPadding: '10',
 height: '100%',
 width: '100%',
 layout: 'default',
 defaults: {
          listeners: {
              // scope: this,
              check: 'onCheckBoxTick'
          }
     },
 //items represents various form containers
     items: [{
            xtype: 'checkboxfield',
            itemId: 'circle',
            name : 'circle',
            label: 'CIRCLE (Click anywhere. Click stop to uncheck all)',
            value: 'circle',

        },
        {
            xtype: 'checkboxfield',
            itemId: 'rectangle',
            name : 'rectangle',
            value: 'rectangle',
            label: 'RECTANGLE (Click anywhere, Click stop to uncheck all)',

        },{
            xtype: 'checkboxfield',
            itemId: 'edge',
            name : 'edge',
            value: 'edge',
            label: 'EDGE (Click first origin and then target sprite to create edge)',

        },{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
                { xtype: 'spacer' },
                {
                    text: 'Stop',
                    handler: 'stopSpriteOnClick'
                },
                { xtype: 'spacer' }
            ]
        }],
  renderTo: Ext.getBody()
});
