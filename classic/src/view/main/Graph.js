/**
 * This class represents the panel to render the graph of nodes loaded from the
 * nodeData store.
 * @class POC.view.main.Graph
 * @extends Ext.panel.Panel
 */

Ext.define('POC.view.main.Graph', {
   extend       : 'Ext.panel.Panel',
   xtype        : 'graph',
   controller   : 'graph',

   requires: [
       'Ext.draw.Component',
       'Ext.draw.plugin.SpriteEvents',
       'POC.view.main.GraphController',
       'POC.view.main.ToolsTabPanel'
   ],
   // defining id of panel to attach it with controller's functions
   config: {
        id    : 'graphPanel',
        height:  2000
    },
   scrollable: true,
   items: [
       {
         xtype      : 'toolTabpanel'
       },
      {
         xtype      : 'draw',
         height     :  2500,
         plugins    : ['spriteevents'],
         cls        : 'x-dd-drop-ok',
         listeners  : {
             // attaching controller function with event listener
             spriteclick      : 'onSpriteClick',
             spritemouseover  : 'onMouseOver',
             spritemouseout   : 'onMouseOut',
             afterrender      : 'makePanelTarget'
         }
      }
   ],
   renderTo:Ext.getBody()
});
