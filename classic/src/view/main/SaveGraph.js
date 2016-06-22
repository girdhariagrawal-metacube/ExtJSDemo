/**
 * This file contains code to save graph on client system, graph will be in the form
 * of json file
 * @class POC.view.main.UploadGraph
 * @extends Ext.form.Panel
 */

Ext.define('POC.view.main.SaveGraph', {
    extend: 'Ext.form.Panel',
    xtype: 'save',
    frame: true,
    preventHeader: true,
    bodyPadding: '10 10 0',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'side',
        labelWidth: 50
    },
    //items represents container to upload file
    items: [{
        xtype: 'textfield',
        id: 'file-name',
        name: 'filename',
        emptyText: 'Name Graph File',
        fieldLabel: 'Graph Name',
        labelWidth: 100,
        allowBlank: false
    }],
    //buttons are operations on form
    buttons: [{
      text: 'Download',
      iconCls: 'fa fa-download',
      handler: function(){
            var form = this.up('form').getForm();
            console.log("File save");
          }
    }]
});
