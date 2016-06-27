/**
 * This file contains code to upload graph to server graph will be in the form
 * of json file
 * @class POC.view.main.UploadGraph
 * @extends Ext.form.Panel
 */

Ext.define('POC.view.main.UploadGraph', {
    extend: 'Ext.form.Panel',
    xtype: 'upload',
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
        xtype: 'filefield',
        id: 'form-file',
        emptyText: 'Select an JSON file',
        fieldLabel: 'Graph',
        name: 'fileToUpload',
        buttonText: '',
        buttonConfig: {
            iconCls: 'fa-folder-open-o'
        }
    }],
    //buttons are operations on form
    buttons: [{
        text: 'Save',
        handler: function(){
            var form = this.up('form').getForm();
            if(form.isValid()){
                form.submit({
                    params: {
                      domain: document.domain
                    },
                    url: 'http://52.27.104.117/phpfileupload/file.php',
                    waitMsg: 'Graph Uploading',
                    success: function(fp, action) {

                    },
                    failure: function(fp, action) {
                      console.log("FP");
                      console.log(fp);
                      console.log("O");
                      console.log(action);
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
