
/**
 * This class represents the container to render the graph of nodes loaded from the
 * nodeData store. It contains all the functions for dynamically adding the sprites
 * @class POC.view.main.graph
 * @extends Ext.draw.Container
 */

 Ext.define('POC.view.main.graph',{
   extend: 'Ext.draw.Container',
   xtype: 'maingraph',

   height             : 800,
   width              : 1400,
   autoShow           : true,
   autoRender         : true,

   requires: [
       'POC.store.nodeData',
       'POC.model.nodeModel'
   ],

   // adding afterrender listener to dynamically add all the sprites for each
   // node in graph

   listeners: {

     /**
       * @event afterrender
       * fires after first render
       * @param {me} this
       */

       afterrender: function(me){
          var surface       = me.getSurface();
          // chaining the process of store loading and sprites creation
          me.loadStore().then(function(storeRecords){
              circleCoordinates = me.addCircleSprites(surface,storeRecords.length);
              me.addLineSprites(storeRecords, circleCoordinates, surface);
          }, function(err){

          });
       }
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
           radius           = 40,
           fillStyle        = '#abc',
           xRightLimit      = 1050,
           xLeftLimit       = 270,
           xBase            = 100,
           yBase            = 80,
           yCondition       = yBase,
           xShift           = 200,
           yShift           = 200,
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
            x         :  xPoint,
            y         :  yPoint
        });
        xBase = xBase + xShift;
      }
     surface.add(circleSprites);
     return nodeCoordinates;
   },

 /**
   * it is responsible for iterating upon each node data and to call
   * createLineSprite and then add it to the surface
   * @param {records} nodes data
   * @param {coordinates} coordinate of nodes
   * @param {surface} surface object of container
   */

   addLineSprites :   function(records, coordinates, surface){
     var sprites        = [],
         forwardEdges   = [],
         backwardEdges  = [],
         currentId,
         node;

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
             lineWidth    : 3
         }
         return lineSprite;
   },
    renderTo:Ext.getBody()
});
