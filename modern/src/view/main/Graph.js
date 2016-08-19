/**
 * This class represents the panel to render the graph of nodes loaded from the
 * nodeData store.
 * @class POC.view.main.Graph
 * @extends Ext.panel.Panel
 */

Ext.define('POC.view.main.Graph', {
   extend       : 'Ext.Panel',
   xtype        : 'graph',
   controller   : 'graph',

   requires: [
       'Ext.draw.Component',
       'Ext.draw.plugin.SpriteEvents',
       'POC.view.main.GraphController',
       'POC.view.main.ToolsTabPanel',
       'POC.view.main.CustomDrawComponent',
       'Ext.draw.PathUtil'
   ],
   // defining id of panel to attach it with controller's functions
   config: {
        id    : 'graphPanel',
        height:  2000,
        width : '100%'
    },

    scrollable : true,
   items: [{
         xtype      : 'toolTabpanel',
         height     :  200,
       },
      {
         xtype      : 'custom-draw-component',
         height     :  2000,
         width      :  '100%',
         plugins    : ['spriteevents'],

         listeners  : {
             // attaching controller function with event listener
             spriteclick        : 'onSpriteClick',
             spritemouseover    : 'onMouseOver',
             spritemouseout     : 'onMouseOut',
         }
      }
   ],
   renderTo:Ext.getBody()
});
