/**
 * This class represents the view controller for flow animation , it contains
 * all the functions deciding the flow path between the start and end nodes
 * @class POC.view.main.FlowAnimationController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.FlowAnimationController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.FlowAnimate',

    /**
      * it is responsible changing the global ruling variables according to the
      * curently selected checkbox
      * @param {object} checkbox
      * @param {json obj} opts
      */

    selectFlow: function(checkbox,opts){
      POC.GraphState.flowSlectionOn = true;
    },

    /**
      * it animates the flow between two given nodes ie. start and end of the flow
      */

    animateFlow: function(){
      var startNode = POC.GraphState.flowStartNode,
          endNode   = POC.GraphState.flowEndNode,
          allEdges  = [],
          allNodes  = {},
          pathNodes  = [],
          nodeInfo;

      // if both start and end nodes are selected
      if(startNode && endNode){
          this.collectData(allNodes, allEdges);
          this.checkIfInConnectedGraph(allNodes);
      }
    },

    /**
      * it is responsible changing the global ruling variables according to the
      * curently selected checkbox
      * @param {object} checkbox
      * @param {json obj} opts
      */

    checkIfInConnectedGraph: function(allNodes){
      Ext.each(allNodes,function(node){

      });
    },

  /**
    * it is responsible changing the global ruling variables according to the
    * curently selected checkbox
    * @param {object} checkbox
    * @param {json obj} opts
    */

    collectData: function(allNodes, allEdges){
      // collecting basic info of all the current nodes in draw surface
      Ext.each(surface._items, function(item) {
          nodeInfo = item.nodeInfo;
          if ((item.type == POC.Constants.CIRCLE || POC.Constants.STATE_SPRITE_TYPE) && nodeInfo) {
            allNodes[nodeInfo.nodeId] = nodeInfo;
          }
          else if(item.type == POC.Constants.LINE){
            allEdges.push(item);
          }
      });
    }

});
