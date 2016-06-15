/**
 * This class represents the view controller for graph rendering view, it
 * contains all the functions for events
 * @class POC.view.main.GraphController
 * @extends Ext.app.ViewController
 * @author pulkit
 * @version 1.0.1
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
      var surface = me.items.items[0].getSurface();
      var self = this;

      this.loadStore().then(function(storeRecords){
              spriteData = self.addCircleSprites(surface,storeRecords.length);
              self.addLineSprites(storeRecords, spriteData, surface);
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

    addCircleSprites:    function (surface,recordsLength) {
        var circleSprites    = [],
            nodeCoordinates  = [];
            type             = 'circle',
            radius           = 60,
            fillStyle        = '#abc',
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

         if(i > 0){
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
         }
         xPoint  = xBase ;
         yPoint  = yBase;

         // storing location points of each nodes for calculating line sprintes
         nodeCoordinates[i] = {
           x : xPoint,
           y : yPoint,
         };

         circleSprites.push({
             type      : type,
             radius    : radius,
             fillStyle : fillStyle,
             x         : xPoint,
             y         : yPoint,
             strokeStyle: 'black',
             lineWidth: 3,
             fx: {
                  duration: 100
              }
         });

         xBase = xBase + xShift;
       }
       var spriteData = {};
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
      surface.add(sprites);
      surface.add(spriteData.circleData);
    },
    /**
      * it takes current node and destination id and creates a line sprite
      * corresponding to those co-ordinates, to display a edge
      * @param {coordinates} surface object of container
      * @param {currentId} id of current node
      * @param {destinationId} id of destination node
      */

    createLineSprite:  function(coordinates,currentId, destinationId){
      var originX          = coordinates[currentId].x,
          originY          = coordinates[currentId].y,
          destinationX     = coordinates[destinationId].x,
          destinationY     = coordinates[destinationId].y,

          lineSprite       = {
              type         : 'line',
              fromX        : originX,
              fromY        : originY,
              toX          : destinationX,
              toY          : destinationY,
              strokeStyle  : '#1F6D91',
              lineWidth    : 2
          };
          return lineSprite;
    },

  /**
    * it decides the action to be performed on a click on a sprite
    * @param {item} item over which the click is performed
    * @param {event} the event
    */

    onSpriteClick: function (item, event) {
      var sprite = item && item.sprite;

     if (sprite) {
         if (sprite.type === 'path') {
             sprite.setAttributes({
                 // rotationRads: sprite.attr.rotationRads + Math.PI / 4
             });
         } else {

         }

         sprite.getSurface().renderFrame();
     }
 },
 onMouseOver: function (item, event) {
   var sprite = item && item.sprite;

     if (sprite) {
         if (sprite.type === 'path') {
             sprite.setAttributes({
                 // lineWidth: 100
             });
         } else {
             sprite.setAttributes({
                 r: 100
             });
         }

         sprite.getSurface().renderFrame();
     }
 },
 onMouseOut: function (item, event) {
   var sprite = item && item.sprite;
       if (sprite) {
         if (sprite.type === 'path') {
             sprite.setAttributes({
                 // lineWidth: 3
             });
         } else {
             sprite.setAttributes({
                 r: 60
             });
         }

         sprite.getSurface().renderFrame();
     }
 }
});
