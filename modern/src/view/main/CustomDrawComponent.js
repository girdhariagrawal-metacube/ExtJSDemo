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
            target;

        target = me.findTarget(sprites, x, y);
        if(!target){
            this.addSpriteOnClick(x,y);
        }
        if (target && target.type == 'circle') {
            var newSprite = surface.add([{
                type         : POC.Constants.NODE_SPRITE_TYPE,
                radius       : POC.Constants.CIRCLE_RADIUS,
                fillStyle    : POC.Constants.CIRCLE_FILLSTYLE,
                x            : x,
                y            : y,
                draggable    : true,
                strokeStyle  : POC.Constants.CIRCLE_STROKESTYLE,
                lineWidth    : POC.Constants.CIRCLE_LINE_WIDTH,
                zIndex       : 0,
                // fx: {
                //      duration: POC.Constants.FX_DURATION
                //  }
            }]);

            ghostNode   = newSprite[0];
            target.setAttributes({
                strokeStyle: 'red'
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
                    strokeStyle: 'red'
                });
            }
        }
        surface.renderFrame();
    },

    // Action corresponding to the mouse up event from draw component
    onMouseUp: function (e) {
        var me = this,
            surface = me.getSurface();

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
          me.target.x = surface.getEventXY(e)[0];
          me.target.y = surface.getEventXY(e)[1];
          ghostNode.destroy();
        }
        me.isDragging = false;
        surface.renderFrame();
    },

    addSpriteOnClick: function(x,y){
        POC.GraphState.totalNodes = POC.GraphState.totalNodes + 1;
        var nodeInfo = {
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
        console.log(Ext.getStore('nodes').getRange().length);
        if(POC.GraphState.drawTypeOnClick == 'circle'){
          surface.add([{
              type         : POC.Constants.NODE_SPRITE_TYPE,
              radius       : POC.Constants.CIRCLE_RADIUS,
              fillStyle    : POC.Constants.CIRCLE_FILLSTYLE,
              nodeInfo     : nodeInfo,
              x            : x,
              y            : y,
              draggable    : true,
              strokeStyle  : POC.Constants.CIRCLE_STROKESTYLE,
              lineWidth    : POC.Constants.CIRCLE_LINE_WIDTH,
              zIndex       : POC.Constants.CIRCLE_Z_INDEX,
          }]);
        }
        else if(POC.GraphState.drawTypeOnClick == 'rectangle') {
          surface.add([{
               type         : POC.Constants.STATE_SPRITE_TYPE,
               nodeInfo     : nodeInfo,
               x            : x,
               y            : y,
               width        : POC.Constants.RECTANGLE_WIDTH,
               height       : POC.Constants.RECTANGLE_HEIGHT,
               lineWidth    : POC.Constants.RECTANGLE_LINE_WIDTH,
               strokeStyle  : POC.Constants.RECTANGLE_STROKESTYLE,
               fillStyle    : POC.Constants.RECTANGLE_FILLSTYLE,
               zIndex       : POC.Constants.RECTANGLE_Z_INDEX,

            }]);
        }
    }
});
