/**
 * This file will add new activity
 * @class POC.view.main.AddActivity
 * @extends Ext.form.Panel
 */

Ext.define('POC.view.main.AddActivity', {
  extend: 'Ext.form.Panel',
  xtype: 'activity',
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
      id: 'nodeName',
      emptyText: 'Node Name',
      fieldLabel: 'Name',
      name: 'nodeName',
      xtype: 'textfield',
      allowBlank: false
    }, {
      id: 'forwardEdges',
      emptyText: 'Enter Forward Edges seperated by comma',
      fieldLabel: 'Forward Edges',
      name: 'forwardEdges',
      xtype: 'textfield'
    }, {
      id: 'backwardEdges',
      emptyText: 'Enter Backward Edges seperated by comma',
      fieldLabel: 'Backward Edges',
      name: 'backwardEdges',
      xtype: 'textfield'
  }],
  //buttons represents operations related to form i.e. save, reset
  buttons: [{
      text: 'Save',
      handler: function(){
          var form = this.up('form').getForm();
          if(form.isValid()){
              form.submit({
                  url: 'upload.php',
                  waitMsg: 'Graph Uploading',
                  success: function(fp, o) {
                      msg('Success', 'Processed Graph "' + o.result.file + '" on the server');
                  }
              });
          }
      }
  },{
      text: 'Reset',
      handler: function() {
          this.up('form').getForm().reset();
      }
  }]
});
