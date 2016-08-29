
/**
 * This class represents the custom draw component, to draw graph upon
 * @class POC.view.main.CustomDrawComponent
 * @extends Ext.draw.Component
 */

Ext.define('POC.view.main.CustomDrawComponent', {
    extend: 'Ext.draw.Component',
    xtype: 'custom-draw-component',

    requires: ['Ext.draw.PathUtil'],
    isDragging: false,
    startX: 0,
    startY: 0,
    translationX: 0,
    translationY: 0,
    target: null,
    moving: null,
    ghostNode : null,

    listeners: {
        element     : 'element',
        scope       : 'this',
        mousedown   : 'onMouseDown',
        mousemove   : 'onMouseMove',
        mouseup     : 'onMouseUp',
        mouseleave  : 'onMouseUp'
    },

    /**
      * it finds the sprite object hosting the click event using the Ext.draw.PathUtil
      * @param { array } sprites
      * @param {integer} x
      * @param {integer} y
      */

    findTarget: function (sprites, x, y) {
        var me = this,
            sprite,
            i, ln;

        if (me.target) {
            me.target.setAttributes({
                strokeStyle: 'black'
            });
        }
        for (i = 0, ln = sprites.length; i < ln; i++) {
            sprite = sprites[i];
            if (sprite.isPath && sprite.isPointInPath(x, y)) {
                me.target = sprite;
                return sprite;
            }
        }
    },

    /**
      * it defines action corresponding to the mouse down event for draw component
      * @param { event object} e
      */

    onMouseDown: function (e) {
        var me = this,
            surface = me.getSurface(),
            sprites = surface.getItems(),
            xy = surface.getEventXY(e),
            x = xy[0],
            y = xy[1],
            target,
            newSpriteArray,
            newSprite;

        // finding the target sprite corresponding to the event
        target = me.findTarget(sprites, x, y);
        // if click event not on any sprite, check if we need to create new sprite
        if(!target){
            this.addSpriteOnClick(x,y);
        }
        if(target) {

          switch(target.type){
            case POC.Constants.CIRCLE:
                //checking if in mode to create edges between two nodes or select flow nodes
                this.checkifToCreateEdgeAndSelectFlow(target);
                // creating the ghost node
                newSpriteArray = this.createNodeSprite(target.x,target.y, nodeInfo);
                newSprite      = surface.add(newSpriteArray);
                break;
            case POC.Constants.STATE_SPRITE_TYPE:
                //checking if in mode to create edges between two nodes or select flow nodes
                this.checkifToCreateEdgeAndSelectFlow(target);
                // creating the ghost node
                newSpriteArray = this.createStateSprite(target.x,target.y, nodeInfo);
                newSprite      = surface.add(newSpriteArray);
                break;
          }

          ghostNode   = newSprite[0];
          target.setAttributes({
              globalAlpha : 0.3
          });
          me.isDragging = true;
          me.startX = x;
          me.startY = y;
          me.translationX = target.attr.translationX;
          me.translationY = target.attr.translationY;
      }
    },

    /**
      * it defines action corresponding to the mouse move event for draw component
      * @param { event object} e
      */

    onMouseMove: function (e) {
        var me = this,
            surface = me.getSurface(),
            sprites = surface.getItems(),
            xy = surface.getEventXY(e),
            intersections = [],
            x = xy[0],
            y = xy[1],
            deltaX, deltaY,
            sprite,
            points,
            i, ln;

        if (me.isDragging) {
            deltaX = x - me.startX;
            deltaY = y - me.startY;
            me.target.setAttributes({
                translationX: me.translationX + deltaX,
                translationY: me.translationY + deltaY
            });
        } else {
            target = me.findTarget(sprites, x, y);
            if (target) {
                target.setAttributes({
                    // strokeStyle: 'red',
                });
            }
        }
        surface.renderFrame();
    },

    /**
      * it defines action corresponding to the mouse up event for draw component
      * @param { event object} e
      */

    onMouseUp: function (e) {
        var me = this,
            surface = me.getSurface(),
            xy = surface.getEventXY(e),
            nodeId;

        if(me.isDragging) {
          // checking for the reference to the graph controller in graphState file,
          // INFO: we have to store reference because Extjs doesn't
          // allow us to create reference more than once
          if(!POC.GraphState.ref){
              ref = POC.app.getController('POC.view.main.GraphController');
              POC.GraphState.ref = ref;
          }
          ref =  POC.GraphState.ref;
          ref.shiftNodeWithEdgeArrow(me.target, surface.getEventXY(e));
          me.target.x = xy[0];
          me.target.y = xy[1];
          nodeId = me.target.nodeInfo.nodeId;
          //updating the co-ordinates array.
          this.updateNodeCoordinateArray(nodeId, xy[0], xy[1]);
          // now destory the ghost sprite
          ghostNode.destroy();
        }
        me.isDragging = false;
        surface.renderFrame();
    },

    /**
      * it creates the sprite either for node or state depending on it's type
      * with the help of corresponding calls to createNodeSprite or
      * createStateSprite function
      * @param {integer} x
      * @param {integer} y
      */

    addSpriteOnClick: function(x,y){
        var newSprite,
            nodeInfo =  {
               nodeId        : POC.GraphState.totalNodes,
               nodeName      : "new",
               forwardEdges  : [],
               backwardEdges : []
            };

        // adding new node to the node store
        Ext.getStore('nodes').add({
            'nodeId'        : POC.GraphState.totalNodes,
            'nodeName'      : nodeInfo.nodeName,
            'forwardEdges'  : nodeInfo.forwardEdges,
            'backwardEdges' : nodeInfo.backwardEdges
        });

        POC.GraphState.totalNodes = POC.GraphState.totalNodes + 1;

        switch(POC.GraphState.drawTypeOnClick){
          case POC.Constants.CIRCLE:
          // creating a circle sprite
              newSprite = this.createNodeSprite(x,y, nodeInfo);
              surface.add(newSprite);
          // restricting one sprite creation at a time
              this.stopSpriteOnClick();
              this.updateNodeCoordinateArray(nodeInfo.nodeId, x, y);
              break;
          case POC.Constants.RECTANGLE:
          // creating a rectangle sprite
              newSprite = this.createStateSprite(x,y, nodeInfo);
              surface.add(newSprite);
          // restricting one sprite creation at a time
              this.stopSpriteOnClick();
              this.updateNodeCoordinateArray(nodeInfo.nodeId, x, y);
              break;
        }
    },

    /**
      * it creates the edge between origin node and destination edge with the
      * help of corresponding calls to createLineSprite function
      * @param {object} target
      */

    createEdgeTarget1ToTarget2: function(target){
      var isTarget1Set = POC.GraphState.isTarget1Set,
          coordinateArray,
          startingNodeId,
          destinationId,
          edgeSprite;

      if(isTarget1Set == false){
        POC.GraphState.target1 = target;
        POC.GraphState.isTarget1Set = true;
      }
      // here we are restricting the
      else if(isTarget1Set == true && POC.GraphState.target1 !== target ){
        if(!POC.GraphState.ref){
            ref = POC.app.getController('POC.view.main.GraphController');
            POC.GraphState.ref = ref;
        }
        ref =  POC.GraphState.ref;
        coordinateArray = POC.GraphState.nodeCoordinates,
        startingNodeId  = POC.GraphState.target1.nodeInfo.nodeId,
        destinationId   = target.nodeInfo.nodeId,

        // creating the edge sprite and adding it to surface
        edgeSprite = ref.createLineSprite(coordinateArray, startingNodeId, destinationId);
        surface.add(edgeSprite);

        //disable the edge creation functionality
        this.stopSpriteOnClick();

        // updating the newly created edge between two nodes in the forwardEdges
        this.updateEdgesOfNode(POC.GraphState.target1, target, startingNodeId, destinationId);
        POC.GraphState.isTarget1Set = false;
      }
    },

    /**
      * it is responsible for creating and returning a node sprite to be added
      * @param {integer} x
      * @param {integer} y
      * @param {json object} info json obj containing info about it
      */

    createNodeSprite: function(x, y, info) {
      info.nodeType = POC.Constants.CIRCLE;
      return [{
          type         : POC.Constants.NODE_SPRITE_TYPE,
          radius       : POC.Constants.CIRCLE_RADIUS,
          fillStyle    : POC.Constants.CIRCLE_FILLSTYLE,
          nodeInfo     : info,
          x            : x,
          y            : y,
          draggable    : true,
          strokeStyle  : POC.Constants.CIRCLE_STROKESTYLE,
          lineWidth    : POC.Constants.CIRCLE_LINE_WIDTH,
          zIndex       : POC.Constants.CIRCLE_Z_INDEX,
      }];
    },

    /**
      * it is responsible for creating and returning a state sprite to be added
      * @param {integer} x
      * @param {integer} y
      * @param {json object} info json obj containing info about it
      */

    createStateSprite: function(x, y, info){
      info.nodeType = POC.Constants.RECTANGLE;
      return [{
           type         : POC.Constants.STATE_SPRITE_TYPE,
           nodeInfo     : info,
           x            : x,
           y            : y,
           width        : POC.Constants.RECTANGLE_WIDTH,
           height       : POC.Constants.RECTANGLE_HEIGHT,
           lineWidth    : POC.Constants.RECTANGLE_LINE_WIDTH,
           strokeStyle  : POC.Constants.RECTANGLE_STROKESTYLE,
           fillStyle    : POC.Constants.RECTANGLE_FILLSTYLE,
           zIndex       : POC.Constants.RECTANGLE_Z_INDEX,

        }];
    },

    /**
      * it is responsible for updating the forwardEdges array
      * @param {object} originNode the instance of the origin node from where
      * edges is originating
      */

    updateEdgesOfNode: function(originNode, destinationNode, startingNodeId, destinationId){
      // pushing the destinationId in the forward edges array of origin
      originNode.nodeInfo.forwardEdges.push(destinationId);

      // pushing startingId in the backward node array of destination node
      destinationNode.nodeInfo.backwardEdges.push(startingNodeId);
    },

    /** Updates the array of co-ordinates of all the nodes in the graph, stored
      * in the graphstate
      * @param {integer} x
      * @param {integer} y
      * @param {json object} info json obj containing info about it
      */

    updateNodeCoordinateArray: function(nodeId, x, y) {
      POC.GraphState.nodeCoordinates[nodeId] = {
        x : x,
        y : y
      };
    },

    /**
      * it unchecks all the checkbox and changes the graph state
      */

    stopSpriteOnClick: function() {
          var cmp1 = Ext.ComponentQuery.query('#circle')[0],
              cmp2 = Ext.ComponentQuery.query('#rectangle')[0],
              cmp3 = Ext.ComponentQuery.query('#edge')[0];

          POC.GraphState.drawTypeOnClick = null;
          cmp1.uncheck();
          cmp2.uncheck();
          cmp3.uncheck();
    },

    /**
      * it is responsible for checking if the edge creation is enabled or flow nodes
      * selection is on, and calling the corresponding the functions
      * @param {object} target currently selected node
      */

    checkifToCreateEdgeAndSelectFlow: function(target){
      // checking if we need to create the edge between the nodes
      if(POC.GraphState.drawTypeOnClick == POC.Constants.EDGE){
          this.createEdgeTarget1ToTarget2(target);
      }
      // checking if the flow nodes selection process is on
      if(POC.GraphState.flowSlectionOn){
        // if starting is not already selected
        if(!POC.GraphState.isFlowStartNodeSelected){
          POC.GraphState.flowStartNode = target;
          POC.GraphState.isFlowStartNodeSelected = true;
        }
        else {
          // select flow's end node
          POC.GraphState.flowEndNode = target;
          var cmp1 = Ext.ComponentQuery.query('#flow')[0];
          cmp1.uncheck();
          POC.GraphState.isFlowStartNodeSelected = false;
          POC.GraphState.flowSlectionOn = false;
        }
      }
    }
});
