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
       'POC.view.main.GraphController'
   ],
   // defining id of panel to attach it with controller's functions
   config: {
        id: 'graphPanel'
    },
   layout: 'fit',
   items: [
       {
           xtype      : 'draw',
           width      : '1400',
           height     : 1000,
           plugins: ['spriteevents'],
           draggable      : 'true',
           listeners  : {
               // attaching controller function with event listener
               spriteclick: 'onSpriteClick',
               spritemouseover: 'onMouseOver',
               spritemouseout: 'onMouseOut',
           },
   }],
  renderTo:Ext.getBody()
});
