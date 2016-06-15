/**
 * This class represents the panel to render the graph of nodes loaded from the
 * nodeData store.
 * @class POC.view.main.Graph
 * @extends Ext.panel.Panel
 * @author pulkit
 * @version 1.0.1
 */

Ext.define('POC.view.main.Graph', {
   extend: 'Ext.panel.Panel',
   xtype: 'graph',
   controller: 'graph',

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
           xtype: 'draw',
           width: '1400',
           height: 700,

           plugins: ['spriteevents'],

           listeners: {
               // attaching controller function with event listener
               spriteclick: 'onSpriteClick',
           },
   }],
  renderTo:Ext.getBody()
});
