/* This file will add new activity
* @class POC.view.main.AddActivity
* @extends Ext.form.Panel
*/

Ext.define('POC.view.main.AddSpritesOnClick', {
 extend: 'Ext.form.Panel',
 xtype: 'nodeTool',
 requires: [
       'POC.GraphState'
 ],
 frame: true,
 preventHeader: true,
 bodyPadding: '10',
 layout: 'default',
 defaults: {
          listeners: {
              scope: this,
              check: function(checkbox,opts) {
                var cmp1 = Ext.ComponentQuery.query('#circle')[0],
                    cmp2 = Ext.ComponentQuery.query('#rectangle')[0];
                    if(checkbox._itemId == 'circle'){
                      POC.GraphState.drawTypeOnClick = 'circle';
                      cmp2.uncheck();
                    }
                    else if(checkbox._itemId == 'rectangle'){
                      POC.GraphState.drawTypeOnClick = 'rectangle';
                      cmp1.uncheck();
                    }
              }
          }
     },
 //items represents various form containers
     items: [{
            xtype: 'checkboxfield',
            itemId: 'circle',
            name : 'circle',
            label: 'Circle',
            value: 'Circle',

        },
        {
            xtype: 'checkboxfield',
            itemId: 'rectangle',
            name : 'rectangle',
            value: 'rectangle',
            label: 'Rectangle',

        },{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [
                { xtype: 'spacer' },
                {
                    text: 'Stop',
                    handler: function() {
                          var cmp1 = Ext.ComponentQuery.query('#circle')[0],
                              cmp2 = Ext.ComponentQuery.query('#rectangle')[0];

                          POC.GraphState.drawTypeOnClick = null;
                          cmp1.uncheck();
                          cmp2.uncheck();
                    }
                },
                { xtype: 'spacer' }
            ]
        }],
  renderTo: Ext.getBody()
});
