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

        target = me.findTarget(sprites, x, y);
        if(!target){
            this.addSpriteOnClick(x,y);
        }
        if(target) {

          switch(target.type){
            case POC.Constants.CIRCLE:
                if(POC.GraphState.drawTypeOnClick == POC.Constants.EDGE){
                    this.createEdgeTarget1ToTarget2(target);
                }
                newSpriteArray = this.createNodeSprite(target.x,target.y, nodeInfo);
                newSprite = surface.add(newSpriteArray);
                break;
            case POC.Constants.STATE_SPRITE_TYPE:
                if(POC.GraphState.drawTypeOnClick == POC.Constants.EDGE){
                  this.createEdgeTarget1ToTarget2(target);
                }
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

    // Action corresponding to the mouse up event from draw component
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

    addSpriteOnClick: function(x,y){
        var newSprite,
            nodeInfo =  {
               nodeId        : POC.GraphState.totalNodes,
               nodeName      : "new",
               forwardEdges  : [],
               backwardEdges : []
            };

        POC.GraphState.totalNodes = POC.GraphState.totalNodes + 1;
        // adding new node to the node store
        Ext.getStore('nodes').add({
            'nodeId'        : POC.GraphState.totalNodes,
            'nodeName'      : nodeInfo.nodeName,
            'forwardEdges'  : nodeInfo.forwardEdges,
            'backwardEdges' : nodeInfo.backwardEdges
        });
        Ext.getStore('nodes').load();

        switch(POC.GraphState.drawTypeOnClick){
          case POC.Constants.CIRCLE:
              newSprite = this.createNodeSprite(x,y, nodeInfo);
              surface.add(newSprite);
              this.updateNodeCoordinateArray(nodeInfo.nodeId, x, y);
              break;
          case POC.Constants.RECTANGLE:
              newSprite = this.createStateSprite(x,y, nodeInfo);
              surface.add(newSprite);
              this.updateNodeCoordinateArray(nodeInfo.nodeId, x, y);
              break;
        }
    },

    createEdgeTarget1ToTarget2: function(target){
      var coordinateArray,
          startingNodeId,
          destinationId,
          edgeSprite;

      if(POC.GraphState.isTarget1Set == false){
        POC.GraphState.target1 = target;
        POC.GraphState.isTarget1Set = true;
      }
      else {
        if(!POC.GraphState.ref){
            ref = POC.app.getController('POC.view.main.GraphController');
            POC.GraphState.ref = ref;
        }
        ref =  POC.GraphState.ref;
        coordinateArray = POC.GraphState.nodeCoordinates,
        startingNodeId  = POC.GraphState.target1.nodeInfo.nodeId,
        destinationId   = target.nodeInfo.nodeId,
        edgeSprite = ref.createLineSprite(coordinateArray, startingNodeId, destinationId);
        surface.add(edgeSprite);
        POC.GraphState.isTarget1Set = false;
      }
    },

    createNodeSprite: function(x, y, info) {
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

    createStateSprite: function(x, y, info){
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

    updateNodeCoordinateArray: function(nodeId, x, y) {
      POC.GraphState.nodeCoordinates[nodeId] = {
        x : x,
        y : y
      };
    }
});
