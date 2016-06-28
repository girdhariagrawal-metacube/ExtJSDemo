/**
* This class represents the save graph controller to save graph to client system
* @class POC.view.main.SaveGraphController
* @extends Ext.app.ViewController
*/

Ext.define('POC.view.main.UploadGraphController', {
 extend: 'Ext.app.ViewController',
 alias: 'controller.upload',
 upload: function(me){
     var form     = me.up('form').getForm();
     var filename = form.getFieldValues().fileToUpload.split('\\')[2];
     if(form.isValid()){
         form.submit({
             params: {
               domain: '52.27.104.117:1841'
             },
             url: 'http://52.27.104.117/phpfileupload/file.php',
             waitMsg: 'Uploading Graph',
             success: function(fp, action) {
              console.log(action);
             },
             failure: function(fp, action) {
              Ext.data.JsonP.request({
                url : 'http://52.27.104.117/phpfileupload/response.php',
                callbackName: 'responseCallback',
                params : {
                  filename : filename
                },
                callback: function(p,data) {
                  // Ext.getStore('nodes').loadData([],false);
                  // Ext.getStore('nodes').add(data);
                }
              });

             }
         });
     }
 },
 reset: function(me) {
     me.up('form').getForm().reset();
 }
});
