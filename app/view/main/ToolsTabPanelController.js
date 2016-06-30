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
        if(tabPanel.getActiveTab().title === "Save Graph"){
          Ext.ux.Mediator.fireEvent('saveFile');
        }
    }

});
