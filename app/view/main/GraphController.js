/**
 * This class represents the view controller for graph rendering view, it
 * contains all the functions for events
 * @class POC.view.main.GraphController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.GraphController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.graph',

  // connecting view event with its controlling function
  config: {
     control: {
         "#graphPanel": {
             afterrender: 'addSprites'
         }
     }
   },

  /**
   * it is called in response to the afterrender event of the view panel
   * which is responsible for rendering the sprites.It starts the chained process
   * of dynamically adding sprites to the panel by calling loadStore function
   * @param {surface} surface object of container
   * @param {recordsLength} number of nodes
   */

     addSprites : function(me) {
      // fetching the surface object out of the reference variable to add sprites
      surface = me.items.items[1].getSurface();
      var self = this;

      this.loadStore().then(function(storeRecords){
              spriteData = self.addCircleSprites(surface,storeRecords);
              self.addLineSprites(storeRecords, spriteData, surface);
              self.addArrowSprites(storeRecords, spriteData, surface);
              self.addTextSprite(storeRecords,spriteData.nodeCoordinates, surface);
            }, function(err){
        });
     },

   /**
    * it loads the store data and returns promise, as it is a asynchronous step
    */

    loadStore: function(){
      return new Ext.Promise(function (resolve, reject) {

        	    	Ext.getStore('nodes').load({
        			    callback: function(records, operation, success) {
        			        if(success){
        			        	if(records.length > 0){
        						      //no error
        			        		resolve(records);
        			        	} else {
        			        		resolve(false);
        			        	}
        			        } else{
        					      // no content loaded
        			        	reject(operation);
        			        }
        			  }
        		});
        	});
    },

  /**
    * it creates circle sprites corresponding to each node in graph and adds
    * them to surface of container, then it returns the array of location of nodes
    * @param {surface} surface object of container
    * @param {recordsLength} number of nodes
    */

    addCircleSprites:    function (surface,records) {
        var recordsLength    = records.length,
            circleSprites    = [],
            spriteData       = {},
            nodeInfo         = {},
            nodeCoordinates  = [],
            xRightLimit      = 1050,
            xLeftLimit       = 270,
            xBase            = 120,
            yBase            = 180,
            yCondition       = yBase,
            xShift           = 200,
            yShift           = 300,
            xPoint           = 0,
            yPoint           = 0,
            i                = 0;


       // creating sprites for circles using loaded records length and setting
       // their location and orientation.

       for (i = 1; i <= recordsLength; ++i) {

           if(xPoint > xRightLimit){
             yBase   = yBase + yShift;
             diff    = xBase - xRightLimit;
             xBase   = xBase - (diff);
             xShift  = (-1)*(xShift);
           }
           else if((xPoint < xLeftLimit) && (yPoint > yCondition)){
             yBase   = yBase + yShift;
             diff    = xLeftLimit - xBase;
             xBase   = xBase + (3 * diff);
             xShift  = (-1)*(xShift);
           }

         xPoint  = xBase ;
         yPoint  = yBase;

         // storing location points of each nodes for calculating line sprintes
         nodeCoordinates[i] = {
           x : xPoint,
           y : yPoint
         };
         // adding data of node in the sprite itself for future use
         nodeInfo = {
            nodeId        : records[i-1].data.nodeId,
            nodeName      : records[i-1].data.nodeName,
            forwardEdges  : records[i-1].data.forwardEdges,
            backwardEdges : records[i-1].data.backwardEdges,
         };
         circleSprites.push({
             type         : App.Constants.NODE_SPRITE_TYPE,
             nodeInfo     : nodeInfo,
             radius       : App.Constants.CIRCLE_RADIUS,
             fillStyle    : App.Constants.CIRCLE_FILLSTYLE,
             x            : xPoint,
             y            : yPoint,
             strokeStyle  : App.Constants.CIRCLE_STROKESTYLE,
             lineWidth    : App.Constants.CIRCLE_LINE_WIDTH,
             fx: {
                  duration: 100
              }
         });

         xBase = xBase + xShift;
       }

       spriteData.circleData = circleSprites;
       spriteData.nodeCoordinates = nodeCoordinates;
      return spriteData;
    },

  /**
    * it is responsible for iterating upon each node data and to call
    * createLineSprite and then add it to the surface
    * @param {records} nodes data
    * @param {coordinates} coordinate of nodes
    * @param {surface} surface object of container
    */

    addLineSprites :   function(records, spriteData, surface){
      var sprites        = [],
          forwardEdges   = [],
          backwardEdges  = [],
          currentId,
          node,
          coordinates = spriteData.nodeCoordinates;
      // iterating over each record or node data
      Ext.each(records,function(node){
        forwardEdges  = node.data.forwardEdges ? node.data.forwardEdges : [];
        backwardEdges = node.data.backwardEdges ? node.data.backwardEdges : [];
        currentId     = node.data.nodeId ? node.data.nodeId : null;

        if(currentId){
          // now creating the forward edge line sprites
          Ext.each(forwardEdges,function(destinationId){
            sprites.push(this.createLineSprite(coordinates,currentId, destinationId));
          },this);

           // now creating the forward edge line sprites
          Ext.each(backwardEdges,function(destinationId){
            sprites.push(this.createLineSprite(coordinates,currentId, destinationId));
          },this);
        }

      },this);
      spriteData.lineSprite =  sprites;
    },

    /**
      * it is responsible for iterating upon each line sprites and to call
      * createArrowSprite function in order to add arrow sprite to the surface
      * @param {storeRecords} nodes data
      * @param {spriteData} contains sprite related data
      * @param {surface} surface object of container
      */

    addArrowSprites : function(storeRecords, spriteData, surface) {
        var lineSprites = spriteData.lineSprite,
            arrowSprite = {};

        // adding lines then circle sprites to surface
        surface.add(lineSprites);
        surface.add(spriteData.circleData);

        Ext.each(lineSprites, function(lineSprite) {

          var originX = lineSprite.fromX,
              originY = lineSprite.fromY,
              destinationX = lineSprite.toX,
              destinationY = lineSprite.toY;

              arrowSprite = this.createArrowSprite(originX,originY,destinationX,destinationY);
              surface.add(arrowSprite);
        },this);
    },

    /**
      * it is responsible for creating the arrow sprite, to determine the
      * angle of rotation of sprite it calls getTangent function
      * @param {originX} x coordinate of origin node
      * @param {originY} y coordinate of origin node
      * @param {destinationX} x coordinate of destination node
      * @param {destinationY} y coordinate of destination node
      * @return {arrow sprite}
      */

    createArrowSprite: function(originX,originY,destinationX,destinationY){
      var r             = App.Constants.CIRCLE_RADIUS,
          type          = App.Constants.ARROW_SPRITE_TYPE,
          strokeStyle   = App.Constants.ARROW_STROKESTYLE,
          lineWidth     = App.Constants.ARROW_LINE_WIDTH,
          sprite        = {},
          path          = '',
          rotation      = {},
          radian,
          xNew,
          yNew;

      if(originY === destinationY && originX < destinationX) {

        path ='M'+(destinationX-r-10)+' '+(destinationY-10)+' L'+(destinationX - r)+' '+destinationY+' L'+(destinationX - r -10)+' ' +(destinationY+10);

      } else if(originY === destinationY && originX > destinationX) {

        path = 'M'+(destinationX+r+10)+' '+(destinationY-10)+' L'+(destinationX + r)+' '+destinationY+' L'+(destinationX + r + 10)+' ' +(destinationY+10);

      } else if(originX < destinationX && originY < destinationY) {
          radian    = this.getTangent(originX, originY, destinationX, destinationY);
          xNew      = destinationX + r * Math.cos(-radian+Math.PI);
          yNew      = destinationY + r * Math.sin(-radian+Math.PI);
          path      = 'M'+(xNew-10)+' '+(yNew-10)+' L'+(xNew)+' '+yNew+' L'+(xNew -10)+' ' +(yNew+10);
          rotation  =  {
            rads    : -radian,
            centerX : xNew,
            centerY : yNew
          };

      } else if(originX > destinationX && originY > destinationY) {
          radian    = this.getTangent(originX, originY, destinationX, destinationY);
          xNew      = destinationX + r * Math.cos(-radian);
          yNew      = destinationY + r * Math.sin(-radian);
          path      = 'M'+(xNew+10)+' '+(yNew+10)+' L'+(xNew)+' '+yNew+' L'+(xNew -10)+' ' +(yNew+10);
          rotation  = {
            rads    : radian - Math.PI/4,
            centerX : xNew,
            centerY : yNew
          };

      } else if(originX < destinationX && originY > destinationY) {
          radian    = this.getTangent(originX, originY, destinationX, destinationY);
          xNew      = destinationX + r * Math.cos(-radian+Math.PI);
          yNew      = destinationY + r * Math.sin(-radian+Math.PI);
          path      = 'M'+(xNew-10)+' '+(yNew-10)+' L'+(xNew)+' '+yNew+' L'+(xNew -10)+' ' +(yNew+10);
          rotation  =  {
            rads    : -radian,
            centerX : xNew,
            centerY : yNew
          };

      } else if(originX > destinationX && originY < destinationY) {
          radian    = this.getTangent(originX, originY, destinationX, destinationY);
          xNew      = destinationX + r * Math.cos(-radian);
          yNew      = destinationY + r * Math.sin(-radian);
          path      = 'M'+(xNew+10)+' '+(yNew-10)+' L'+(xNew)+' '+yNew+' L'+(xNew -10)+' ' +(yNew-10);
          rotation  = {
            rads    : radian - Math.PI/4,
            centerX : xNew,
            centerY : yNew
          };
      }
      sprite = {
        type: type,
        path: path,
        rotation: rotation,
        strokeStyle: strokeStyle,
        lineWidth: lineWidth
      };
      return sprite;
    },

    /**
      * it is responsible for calculating and returning the angle between
      * centers of origin and destination nodes in radian
      * @param {originX} x coordinate of origin node
      * @param {originY} y coordinate of origin node
      * @param {destinationX} x coordinate of destination node
      * @param {destinationY} y coordinate of destination node
      * @return {radian}
      */

    getTangent: function(originX, originY, destinationX, destinationY) {
      var x = originX,
          y = destinationY;
          return Math.atan((originY - y) / (destinationX - x));
    },

    /**
      * it takes current node id, destination node id and creates a line sprite
      * corresponding to those co-ordinates, to display an edge
      * @param {coordinates} surface object of container
      * @param {currentId} id of current node
      * @param {destinationId} id of destination node
      */

    createLineSprite:  function(coordinates,currentId, destinationId){
      var originX          = coordinates[currentId].x,
          originY          = coordinates[currentId].y,
          destinationX     = coordinates[destinationId].x,
          destinationY     = coordinates[destinationId].y,
          strokeStyle      = App.Constants.LINE_STROKE_STYLE,
          lineWidth        = App.Constants.LINE_WIDTH,

          lineSprite       = {
              type         : 'line',
              fromX        : originX,
              fromY        : originY,
              toX          : destinationX,
              toY          : destinationY,
              strokeStyle  : strokeStyle,
              lineWidth    : lineWidth
          };
          return lineSprite;
    },

    /**
      * it is responsible for iterating upon each node record then create and
      * add text sprite to the surface object
      * @param {records} nodes data
      * @param {coordinates} coordinate of nodes
      * @param {surface} surface object of container
      */

    addTextSprite: function(records, coordinates, surface) {
      var x, y, text;
      var counter = 1;
      Ext.each(records, function(record) {
        text      = record.data.nodeName;
        x         = coordinates[counter].x - (text.length/2)*7;
        y         = coordinates[counter].y;
        sprite    = {
          type      : 'text',
          x         : x,
          y         : y,
          text      : text,
          fontSize  : 14
        };
        counter++;
        surface.add(sprite);
      });
    },

  /**
    * it decides the action to be performed on a click on a sprite
    * @param {item} item over which the click is performed
    * @param {event} the event
    */

    onSpriteClick: function(item, event) {
      var sprite = item && item.sprite;
     if (sprite) {
         if (sprite.type === 'circle') {
           var  store  = Ext.getStore('selectedNode'),
                data   = [sprite.nodeInfo];
           store.loadData(data);
         }
         sprite.getSurface().renderFrame();
     }
   },

   /**
     * it decides the action to be performed on a mouse hover event on a sprite
     * @param {item} item over which the click is performed
     * @param {event} the event
     */

   onMouseOver: function(item, event) {
     var sprite = item && item.sprite;

       if (sprite) {
           if (sprite.type === 'path') {
               sprite.setAttributes({

               });
           } else if(sprite.type === 'circle') {
               sprite.setAttributes({
                   shadowColor: '#000000',
                   shadowBlur: 10,
                  fillStyle: '#abcdef'
               });
           }
           sprite.getSurface().renderFrame();
       }
   },

   /**
     * it decides the action to be performed on a mouse out event click on a
     * sprite
     * @param {item} item over which the click is performed
     * @param {event} the event
     */

   onMouseOut: function(item, event) {
     var sprite = item && item.sprite;
         if (sprite) {
           if (sprite.type === 'path') {
               sprite.setAttributes({
                   // lineWidth: 3
               });
           } else if(sprite.type === 'circle') {
               sprite.setAttributes({
                   shadowBlur: 0,
                   fillStyle: '#abc'
               });
           }
           sprite.getSurface().renderFrame();
       }
   }
});
