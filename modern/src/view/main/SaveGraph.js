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
    bodyPadding: '20',

    // controller: 'saveGraph',
    //items represents container to upload file
    items: [{
      xtype: 'button',
          renderTo: Ext.getBody(),
          text: 'Download',
          href: '#',
          autoEl: {
            tag: 'a',
            download: 'graph.json'
          }
    }]
});
