/**
 * This class represents the save graph controller to save graph to client system

 * @class POC.view.main.SaveGraphController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.UploadGraphController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.upload',

  upLoad: function(me){
      var form = me.up('form').getForm();
      if(form.isValid()){
          form.submit({
              params: {
                domain: document.domain
              },
              url: 'http://52.27.104.117/phpfileupload/file.php',
              waitMsg: 'Uploading Graph',
              success: function(fp, action) {
              },
              failure: function(fp, action) {
              }
          });
      }
  },
  reset: function(me) {
      me.up('form').getForm().reset();
  }
});
