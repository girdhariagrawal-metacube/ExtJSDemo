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
    'POC.view.main.Graph'
  ],
  addActivity: function(me) {
    var form = me.up('form').getForm ();
    var values = form.getFieldValues ();
    var nodeName = values.nodeName;
    var forwardEdges = values.forwardEdges;
    var backwardEdges = values.backwardEdges;

    Ext.getStore('nodes').add({
      'nodeId': 9,
      'nodeName':     nodeName,
      'forwardEdges': forwardEdges,
      'backwardEdges': backwardEdges
    });
  },
  resetForm: function(me) {
    me.up('form').getForm().reset();
  }
});
