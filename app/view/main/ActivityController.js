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
    'POC.GraphState'
  ],

  /**
    * it is responsible for adding new activity to the existing graph
    * @param {me} reference variable
    */

  addActivity: function(me) {
    var form              = me.up('formpanel');
    var values            = form.getValues();
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
      'nodeId'        : POC.GraphState.totalNodes,
      'nodeName'      : nodeName,
      'forwardEdges'  : forwardEdges,
      'backwardEdges' : backwardEdges
    });

    // creating record array with latest requested node data, in order to
    // add the new node in existing graph
    record[0]  = {
      data: {
        'nodeId'        : POC.GraphState.totalNodes,
        'nodeName'      : nodeName,
        'forwardEdges'  : forwardEdges,
        'backwardEdges' : backwardEdges
      }
    };
    // checking for the reference to the graph controller in graphState file,
    // INFO: we have to store reference because there is a bug in Extjs,doesn't
    // allow us to create reference mre than once
    if(!POC.GraphState.ref){
        ref = POC.app.getController('POC.view.main.GraphController');
        POC.GraphState.ref = ref;
    }
    ref =  POC.GraphState.ref;
    // initiating the graph creation process
    spriteData = ref.addNodeSprites(surface,record);
    ref.addLineSprites(record, spriteData, surface);
    // ref.addArrowSprites(record, spriteData, surface);
    // ref.addTextSprite(record,spriteData.nodeCoordinates, surface);
  },

  /**
    * it converts the string array elements to corresponding integer elements
    * @param {inputArray} inputArray to be converted
    * @param {outputArray}
    */

  parseToInteger: function(inputArray) {
    var outputArray = [],
        totalNodes  = POC.GraphState.totalNodes,
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
    me.up('formpanel').reset();
  }
});
