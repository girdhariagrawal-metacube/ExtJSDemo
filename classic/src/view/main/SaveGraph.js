                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        /**
 * This file contains code to save graph on client system, graph will be in the form
 * of json file
 * @class POC.view.main.SaveGraph
 * @extends Ext.form.Panel
 */

Ext.define('POC.view.main.SaveGraph', {
    extend: 'Ext.form.Panel',
    xtype: 'save',
    frame: true,
    preventHeader: true,
    bodyPadding: '10 10 20 40%',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'side',
        labelWidth: 50
    },
    controller: 'SaveGraphController',
    //items represents container to upload file
    items: [{
      xtype: 'container',
      layout: 'hbox',
      items: [{    //download link as button design
        itemId: 'downloadLink',
        xtype: 'box',
        style: 'background-color:#5fa2dd;padding:7px;text-decoration:none;color:#ffffff;',
        autoEl: {
            tag: 'a',
            href: '#',
            html: 'Download'
        },
        listeners: {
            render: 'saveGraph'
      }
    }]
  }]
});
