/**
 * This class represents the save graph controller to save graph to client system

 * @class POC.view.main.SaveGraphController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.SaveGraphController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.saveGraph',
  requires: [
    'POC.view.main.Graph'
  ],
  saveGraph: function(me){

    //will download a file which contains all the node data
      var nodes     = Ext.getStore('nodes').getRange(),
          form      = me.up('form').getForm (),
          values    = form.getFieldValues (),
          obj       = {
            nodes : [],
            state : {}
          },
          x,
          y,
          data;

      Ext.each(nodes, function(node) {
          Ext.each(surface._items, function(item) {
            if(item.nodeInfo && (item.nodeInfo.nodeId === node.data.nodeId)) {
              x = item.x;
              y = item.y;
            }
          });
      //adding store data into obj object
          obj.nodes.push({
              data:{
                  "nodeId"        :  node.data.nodeId,
                  "nodeName"      :  node.data.nodeName,
                  "forwardEdges"  :  node.data.forwardEdges,
                  "backwardEdges" :  node.data.backwardEdges,
                  "x"             :  x,
                  "y"             :  y
                }
          });
      });
      obj.state = {
        xBase       :  App.GraphState.xBase,
        yBase       :  App.GraphState.yBase,
        xShift      :  App.GraphState.xShift,
        xPoint      :  App.GraphState.xPoint,
        yPoint      :  App.GraphState.yPoint,
        totalNodes  :  App.GraphState.totalNodes
      };
      // now adding the graph state
      data                      = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
      me.getEl().dom.download   = "Graph.json";   //values.filename+ need to add
      me.getEl().dom.href       = "data:"+data;
  }
});
