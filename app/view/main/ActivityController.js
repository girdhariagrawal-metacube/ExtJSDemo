/**
 * This class represents the view controller for activity add view, it
 * contains all the functions for events
 * @class POC.view.main.ActivityController
 * @extends Ext.app.ViewController
 */

Ext.define('POC.view.main.ActivityController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.activity',

    // connecting view event with its controlling function
    addActivity: function(me) {

      surface.add({
          type      : 'circle',
          // nodeInfo  : nodeInfo,
          radius    : 75,
          fillStyle : '#000',
          x         : 400,
          y         : 400,
          strokeStyle: 'black',
          lineWidth: 3,
          fx: {
               duration: 100
           }
      });
    },

    resetForm: function(me) {
        me.up('form').getForm().reset();
    }
});
