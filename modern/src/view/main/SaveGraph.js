                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        /**
 * This file contains code to save graph on client system, graph will be in the form
 * of json file
 * @class POC.view.main.SaveGraph
 * @extends Ext.form.Panel
 */

Ext.define('POC.view.main.SaveGraph', {
    extend: 'Ext.form.Panel',
    xtype: 'save',
    requires: [
      'POC.view.main.SaveGraphController'
    ],
    controller: 'saveGraph',
    frame: true,
    preventHeader: true,
    bodyPadding: '20',
    height: '100%',
    width: '100%',

    items: [{
      xtype: 'button',
          renderTo: Ext.getBody(),
          text: 'Create Download file',
          handler: 'openDownloadPanel'
    }]
});
