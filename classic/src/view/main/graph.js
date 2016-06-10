
/**
 * This class represents the container to render the graph of nodes loaded from the
 * nodeData store. It contains all the functions for dynamically adding the sprites
 * @class POC.view.main.graph
 * @extends Ext.draw.Container
 * @author pulkit
 * @version 1.0.1
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

          me.loadStore().then(function(storeRecords){
              me.getGridSprites(surface,storeRecords);
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
   * it takes surface and records objects as parameters and calls circle and
   * line sprite creators for dynamically adding the sprites to the surface
   * @param {surface} surface of object of container
   * @param {storeRecords} records of store
   */

   getGridSprites:    function (surface,storeRecords) {
       var length = storeRecords.length,
           surf           = surface,
           sprites        = [],
           type           = 'circle',
           radius         = 60,
           fillStyle      = '#abc',
           xRightLimit    = 1050,
           xLeftLimit     = 270,
           xBase          = 100,
           yBase          = 80,
           yCondition     = yBase,
           xShift         = 200,
           yShift         = 200,
           xPoint         = 0,
           yPoint         = 0,
           i              = 0;

      // creating sprites for circles using loaded records length and setting
      // their location and orientation.

      for (i = 0; i < length; ++i) {

        if(i > 0){
          if(xPoint > xRightLimit){
            yBase   = yBase + yShift;
            diff    = xBase - 1000;
            xBase   = xBase - (diff);
            xShift  = (-1)*(xShift);
          }
          else if((xPoint < xLeftLimit) && (yPoint > yCondition)){
            yBase   = yBase + yShift;
            diff    = 100 - xBase;
            xBase   = xBase + (3 * diff);
            xShift  = (-1)*(xShift);
          }
        }

        xPoint  = xBase ;
        yPoint  = yBase;
        sprites.push({
            type      : type,
            radius    : radius,
            fillStyle : fillStyle,
            x         :  xPoint,
            y         :  yPoint
        });
        xBase = xBase + xShift;
      }
     surf.add(sprites);
   },

    renderTo:Ext.getBody()
});
