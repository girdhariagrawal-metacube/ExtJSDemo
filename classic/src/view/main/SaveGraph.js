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
    bodyPadding: '10 10 20',
    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'side',
        labelWidth: 50
    },
    //items represents container to upload file
    items: [{
      xtype: 'container',
      layout: 'hbox',
      items: [{
            xtype: 'textfield',
            id: 'file-name',
            name: 'filename',
            emptyText: 'Name Graph File',
            fieldLabel: 'Graph Name',
            labelWidth: 100,
            allowBlank: false,
            flex: 1,
            reference: 'filename'
        }, {    //download link as button design
        itemId: 'downloadLink',
        xtype: 'box',
        margin: "0 0 0 10",
        style: 'background-color:#5fa2dd;padding:7px;text-decoration:none;color:#ffffff;',
        autoEl: {
            tag: 'a',
            href: '#',
            html: 'Download',
        },
        listeners: {
            scope: this,
            render: function(c){

              //will download a file which contains all the node data
                var nodes = Ext.getStore('nodes').getRange();
                var obj = [];
                var x,y;
                Ext.each(nodes, function(node) {
                    Ext.each(surface._items, function(item) {
                      if(item.nodeInfo && (item.nodeInfo.nodeId === node.data.nodeId)) {
                        x = item.x;
                        y = item.y;
                      }
                    });
                    //adding store data into obj object
                    obj.push({
                      "nodeId"        :  node.data.nodeId,
                      "nodeName"      :  node.data.nodeName,
                      "forwardEdges"  :  node.data.forwardEdges,
                      "backwardEdges" :  node.data.backwardEdges,
                      "x"             :  x,
                      "y"             :  y
                    });
                });
                var form = c.up('form').getForm ();
                var values = form.getFieldValues ();
                var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
                c.getEl().dom.download="data.json";   //values.filename+ need to add
                c.getEl().dom.href="data:"+data;
        }
    }
    }]
  }]
});
