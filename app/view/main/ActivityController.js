/**
 * This class represents the view controller for activity add view, it
 * contains all the functions for events
 * @class POC.view.main.ActivityController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.ActivityController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.ActivityController',

  requires: [
    'App.GraphState'
  ],

  /**
    * it is responsible for adding new activity to the existing graph
    * @param {me} reference variable
    */

  addActivity: function(me) {
    var form              = me.up('form').getForm ();
    var values            = form.getFieldValues ();
        nodeName          = values.name,
        forwardEdges      = values.forwardEdges ?  values.forwardEdges.split(',')  : [],
        backwardEdges     = values.backwardEdges ? values.backwardEdges.split(',') : [],
        record            = [],
        ref               = null,
        spriteData        = {};

    forwardEdges  = this.parseToInteger(forwardEdges);
    backwardEdges = this.parseToInteger(backwardEdges);

    // adding new node to the node store
    Ext.getStore('nodes').add({
      'nodeId'        : App.GraphState.totalNodes,
      'nodeName'      : nodeName,
      'forwardEdges'  : forwardEdges,
      'backwardEdges' : backwardEdges
    });

    record[0]  = {
      data: {
        'nodeId'        : App.GraphState.totalNodes,
        'nodeName'      : nodeName,
        'forwardEdges'  : forwardEdges,
        'backwardEdges' : backwardEdges
      }
    };

  if(!App.GraphState.ref){
      ref = POC.app.getController('POC.view.main.GraphController');
      App.GraphState.ref = ref;
  }
  ref        =  App.GraphState.ref;
  spriteData = ref.addCircleSprites(surface,record);
  ref.addLineSprites(record, spriteData, surface);
  ref.addArrowSprites(record, spriteData, surface);
  ref.addTextSprite(record,spriteData.nodeCoordinates, surface);

  },

  /**
    * it converts the string array elements to corresponding integer elements
    * @param {inputArray} inputArray to be converted
    * @param {outputArray}
    */

  parseToInteger: function(inputArray) {
    var outputArray = [],
        totalNodes  = App.GraphState.totalNodes,
        value;

    Ext.each(inputArray,function(element){
      value = parseInt(element);
      // validating the input edges
      if(value > 0 && value < totalNodes){
        outputArray.push(parseInt(value));
      }
    });
    return outputArray;
  },

  /**
    * it decides the action to be performed on a mouse click on the reset
    * button
    * @param {item} item over which the click is performed
    */

  resetForm: function(me) {
    me.up('form').getForm().reset();
  }
});
