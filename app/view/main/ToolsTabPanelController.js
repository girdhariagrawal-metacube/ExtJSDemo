/**
 * This class represents the view controller for ToolsTabPanel, it
 * contains all the functions for its events
 * @class POC.view.main.ToolsTabPanelController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.ToolsTabPanelController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.ToolsTabController',

  /**
    * it is responsible changing the global ruling variables according to the
    * curently selected checkbox
    * @param {object} checkbox
    * @param {json obj} opts
    */

    onCheckBoxTick: function(checkbox,opts) {

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
