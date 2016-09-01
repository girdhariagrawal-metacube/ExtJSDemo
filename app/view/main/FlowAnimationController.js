/**
 * This class represents the view controller for flow animation , it contains
 * all the functions to decide the flow path between the start and end nodes
 * @class POC.view.main.FlowAnimationController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.FlowAnimationController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.flowAnimate',

    /**
      * it is responsible changing the global ruling variables according to the
      * curent sate of checkbox
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
      var startNode    = POC.GraphState.flowStartNode,
          endNode      = POC.GraphState.flowEndNode,
          allEdges     = [],
          allNodes     = {},
          pathNodes    = [],
          pathSprites  = [],
          areAdjacent  = false;

      // if both start and end nodes are selected
      if(startNode && endNode){
          this.checkIfAdjacentNodes(startNode, endNode)? (areAdjacent = true): (areAdjacent = false);
          this.collectData(allNodes, allEdges);

          // if not adjacent then find the nodes in between
          if(areAdjacent == false){
            this.findAllPossiblePaths(allNodes, startnode, endNode);
          }
          else if(areAdjacent == true){
            // if both start and end nodes are adjacent to each other
            pathNodes.push(startNode);
            pathNodes.push(endNode);
          }
          this.generateOrderedAnimateArray(pathNodes, pathSprites, allEdges);
          // finally ready to animate
          this.animateSpritesNow(pathSprites);
      }
    },

    findAllPossiblePaths: function(allNodes, startNode, endNode){

    },

  /**
    * responsible for collecting the required data of each node and edge
    * present in the graph, to be used in identification of the paths
    * @param {json object} allNodes
    * @param {array} allEdges
    */

    collectData: function(allNodes, allEdges){
      // collecting basic info of all the current nodes in draw surface
      Ext.each(surface._items, function(item) {
          nodeInfo = item.nodeInfo;
          if ((item.type == POC.Constants.CIRCLE || POC.Constants.STATE_SPRITE_TYPE) && nodeInfo) {
            allNodes[nodeInfo.nodeId] = item;
          }
          else if(item.type == POC.Constants.LINE){
            allEdges.push(item);
          }
      });
    },

  /**
    * checks if the given first and second node are adjacent to each other
    * @param {object} firstNode
    * @param {object} secondNode
    */

    checkIfAdjacentNodes: function(firstNode, secondNode){
      var firstNodeInfo    = firstNode.nodeInfo;
          forwardEdges     = firstNodeInfo.forwardEdges,
          backwardEdges    = firstNodeInfo.backwardEdges,
          endNodeId        = secondNode.nodeInfo.Id;

      // checking if the two nodes are just adjacent nodes
      return (this.checkIfInArray(forwardEdges, endNodeId) || this.checkIfInArray(backwardEdges, endNodeId))? true: false;
    },

  /**
    * checks if the given item is in the array
    */

    checkIfInArray: function(array, searchItem){
      return array.indexOf(searchItem)? true: false;
    },

  /**
    * returns an array of instances in order to be animated in order to achieve
    * flow animation
    * @param {object} firstNode
    * @param {object} secondNode
    */

    generateOrderedAnimateArray: function(pathNodes, pathSprites, allEdges){
      var maxIndex        = pathNodes.length - 1,
          self            = this,
          foundConnection = false,
          edgeInstance;

      if(pathNodes && pathNodes[0]){
        pathSprites.push(pathNodes[0]);
      }

      Ext.each(pathNodes, function(node, index){
          edgeInstance = null;

          if(index < maxIndex){
            edgeInstance = self.findConnectingEdge(node, pathNodes[index + 1], allEdges);
            if(edgeInstance)
              pathSprites.push(edgeInstance);
              foundConnection = true;
          }
          if(foundConnection == true && index > 0){
            pathSprites.push(node);
            foundConnection = false;
          }
      });
    },

  /**
    * finds the connecting edge instance between given source and destination node
    * @param {object} source
    * @param {object} secondNode
    * @param {array} allEdges
    */

    findConnectingEdge: function(source, destination, allEdges){
      var sourceX       = source.x,
          sourceY       = source.y,
          destinationX  = destination.x,
          destinationY  = destination.y,
          edgeInstance;

      Ext.each(allEdges, function(edge){
          if((edge.fromX == sourceX && edge.fromY == sourceY && edge.toX == destinationY && edge.toY == destinationY) ||
             (edge.fromX == destinationX && edge.fromY == destinationY && edge.toX == sourceX && edge.toY == sourceY)){
               edgeInstance = edge;
             }
      });
      return edgeInstance;
    },

    /**
      * animates the nodes and edges falling in the path
      * @param {array} pathSprites
      */

    animateSpritesNow: function(pathSprites){

      Ext.each(pathSprites, function(sprite){
        // changing the attributes of nodes falling in flow path
        if(sprite.type == POC.Constants.CIRCLE){
          sprite.setAttributes({
              shadowColor: '#000000',
              shadowBlur: 10,
              fillStyle: '#abcdef'
          });
        }
      });
    }
});
