/* This file will add new activity
* @class POC.view.main.AddActivity
* @extends Ext.form.Panel
*/

Ext.define('POC.view.main.AddNode', {

 extend: 'Ext.Panel',
 xtype: 'nodeTool',
 // requires: [
 //       'POC.view.main.ActivityController'
 // ],
 frame: true,
 preventHeader: true,
 //controller: 'ActivityController',
 bodyPadding: '10',
 layout: 'default',
 //items represents various form containers
     // The fields
 // scrollable: true,
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
                            "Tomato: " + ((values.tomato) ? "yes" : "no") +
                            "<br />Salami: " + ((values.salami) ? "yes" : "no")
                        );
                    }
                },
                { xtype: 'spacer' }
            ]
        }],
  renderTo: Ext.getBody()

});
