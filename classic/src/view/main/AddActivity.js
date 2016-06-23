/**
 * This file will add new activity
 * @class POC.view.main.AddActivity
 * @extends Ext.form.Panel
 */

Ext.define('POC.view.main.AddActivity', {
  extend: 'Ext.form.Panel',
  xtype: 'activity',
  controller: 'activity',
  frame: true,
  preventHeader: true,
  bodyPadding: '10 10 0',
  defaults: {
      anchor: '100%',
      allowBlank: false,
      msgTarget: 'side',
      labelWidth: 150
  },


  //items represents various form containers
  items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    margin: '0 0 5 0',
                    items: [{
                      id: 'nodeName',
                      emptyText: 'Enter Activity Name',
                      fieldLabel: 'Activity Name',
                      name: 'nodeName',
                      xtype: 'textfield',
                      allowBlank: false,
                      flex: 1,
                    }, {
                      id: 'forwardEdges',
                      emptyText: 'Enter Forward Edges seperated by comma',
                      fieldLabel: 'Forward Edges',
                      name: 'forwardEdges',
                      xtype: 'textfield',
                      width: 450,
                      margin: '0 0 0 10'
                    }, {
                      id: 'backwardEdges',
                      emptyText: 'Enter Backward Edges seperated by comma',
                      fieldLabel: 'Backward Edges',
                      name: 'backwardEdges',
                      xtype: 'textfield',
                      width: 450,
                      margin: '0 0 0 10'
                  }]
                }],
  //buttons represents operations related to form i.e. save, reset
  buttons: [{
      text: 'Add',
      handler: 'addActivity'
  },{
      text: 'Reset',
      handler: 'resetForm'
  }]
});
