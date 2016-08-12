/**
 * This file contains code to upload graph to server graph will be in the form
 * of json file
 * @class POC.view.main.UploadGraph
 * @extends Ext.form.Panel
 */

Ext.define('POC.view.main.UploadGraph', {
    extend: 'Ext.form.Panel',
    requires: ['POC.view.main.UploadGraphController'],
    xtype: 'upload',
    frame: true,
    controller: 'upload',
    preventHeader: true,
    bodyPadding: '20',
    //items represents container to upload file
    items: [{
         xtype: 'textfield',
         name: 'name',
         margin: '2',
         allowBlank: 'false',
         label: 'Activity'
     },{
        xtype: 'filefield',
        label: "Graph:",
        name: 'fileToUpload',
        accept: 'file'
    },{
        xtype:'button',
        name: 'uploadButton',
        margin: '2',
        text: 'Upload',
        handler: 'upload'
    },{
      xtype: 'spacer' 
  }],

});
