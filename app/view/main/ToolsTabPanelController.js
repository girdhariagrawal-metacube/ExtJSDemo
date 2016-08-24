/**
 * This class represents the view controller for ToolsTabPanel, it
 * contains all the functions for its events
 * @class POC.view.main.ToolsTabPanelController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.ToolsTabPanelController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.ToolsTabController',

  requires: [
    'Ext.ux.Mediator'
  ],

  /**
    * it is responsible for unchecking all the checkboxs except the one for which
    * the function is called, to make sure that nly one is tick at any time
    * @param {object} checkbox
    * @param {json obj} opts
    */

    onCheckBoxTick: function(checkbox,opts) {
      var cmp1 = Ext.ComponentQuery.query('#circle')[0],
          cmp2 = Ext.ComponentQuery.query('#rectangle')[0],
          cmp3 = Ext.ComponentQuery.query('#edge')[0];

          switch(checkbox._itemId) {
          case POC.Constants.CIRCLE:
              POC.GraphState.drawTypeOnClick = 'circle';
              break;
          case POC.Constants.RECTANGLE:
              POC.GraphState.drawTypeOnClick = 'rectangle';
              break;
          case POC.Constants.EDGE:
              POC.GraphState.drawTypeOnClick = 'edge';
              break;
          }
    },

});
