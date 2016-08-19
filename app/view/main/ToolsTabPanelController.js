/**
 * This class represents the view controller for ToolsTabPanel view, it
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
    * it is responsible for firing the 'saveFile' event to notify the saveController
    * to update or create the downlodable JSON file corresponding to the current graph
    * @param {tabPanel} reference of tabPanel
    * @param {tab} tab
    */
    updateJsonFile : function(tabPanel, tab) {
        // if(tabPanel.getActiveTab().title === "Save Graph"){
        //   Ext.ux.Mediator.fireEvent('saveFile');
        // }
    },

    onCheckBoxTick: function(checkbox,opts) {
      var cmp1 = Ext.ComponentQuery.query('#circle')[0],
          cmp2 = Ext.ComponentQuery.query('#rectangle')[0],
          cmp3 = Ext.ComponentQuery.query('#edge')[0];

          switch(checkbox._itemId) {
          case POC.Constants.CIRCLE:
              POC.GraphState.drawTypeOnClick = 'circle';
              cmp2.uncheck();
              cmp3.uncheck();
              break;
          case POC.Constants.RECTANGLE:
              POC.GraphState.drawTypeOnClick = 'rectangle';
              cmp1.uncheck();
              cmp3.uncheck();
              break;
          case POC.Constants.EDGE:
              POC.GraphState.drawTypeOnClick = 'edge';
              cmp1.uncheck();
              cmp2.uncheck();
              break;
          }
    },


    stopSpriteOnClick: function() {
          var cmp1 = Ext.ComponentQuery.query('#circle')[0],
              cmp2 = Ext.ComponentQuery.query('#rectangle')[0],
              cmp3 = Ext.ComponentQuery.query('#edge')[0];

          POC.GraphState.drawTypeOnClick = null;
          cmp1.uncheck();
          cmp2.uncheck();
          cmp3.uncheck();
    }

});
