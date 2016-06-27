/**
 * This class represents the save graph controller to save graph to client system

 * @class POC.view.main.SaveGraphController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.SaveGraphController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.SaveGraphController',
  requires: [
    'POC.view.main.Graph'
  ],
  saveGraph: function(me){

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
      var form = me.up('form').getForm ();
      var values = form.getFieldValues ();
      var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
      me.getEl().dom.download = "Graph.json";   //values.filename+ need to add
      me.getEl().dom.href="data:"+data;
  }
});
