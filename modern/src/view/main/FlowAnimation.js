/* This file will add new activity
* @class POC.view.main.AddActivity
* @extends Ext.form.Panel
*/

Ext.define('POC.view.main.FlowAnimation', {
 extend: 'Ext.form.Panel',
 xtype: 'flow-animation',

 require: ['POC.view.main.FlowAnimationController'],

 controller: 'flowAnimate',
 frame: true,
 preventHeader: true,
 bodyPadding: '10',
 height: '100%',
 width: '100%',
 layout: 'default',
 defaults: {
          listeners: {
              check: 'selectFlow'
          }
     },
 //items represents various form containers
     items: [{
            xtype: 'checkboxfield',
            itemId: 'flow',
            name : 'flow',
            label: 'Flow (Click first origin and then target sprite to create edge)',
            value: 'flow',

        },{
          xtype: 'button',
              renderTo: Ext.getBody(),
              text: 'Start animation',
              handler: 'animateFlow'
        }],
  renderTo: Ext.getBody()
});
