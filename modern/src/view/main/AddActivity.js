/* This file will add new activity
* @class POC.view.main.AddActivity
* @extends Ext.form.Panel
*/

Ext.define('POC.view.main.AddActivity', {

 extend: 'Ext.form.Panel',
 xtype: 'activity',
 requires: [
       'POC.view.main.ActivityController'
 ],
 frame: true,
 preventHeader: true,
 controller: 'ActivityController',
 bodyPadding: '10',
 layout: 'default',
 //items represents various form containers
     // The fields
 scrollable: true,
     items: [{
          xtype: 'textfield',
          name: 'name',
          margin: '2',
          allowBlank: 'false',
          label: 'Activity'
      },{
           xtype: 'textfield',
           name: 'forwardEdges',
           margin: '2',
           label: 'Forward Edges'
       },{
          xtype: 'textfield',
          name: 'backwardEdges',
          margin: '2',
          label: 'Backward Edges'
        },{
          xtype: 'container',
          layout: 'hbox',
          items: [{
                  xtype:'button',
                  name: 'submit',
                  width: '45%',
                  margin: '2',
                  text: 'Add',
                  handler: 'addActivity'
                },{
                  xtype:'button',
                  name: 'Reset',
                  width: '45%',
                  margin: '2',
                  text: 'Reset',
                  handler: 'resetForm'
                }]
        }],
  renderTo: Ext.getBody()

});
