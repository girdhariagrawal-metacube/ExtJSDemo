/**
 * This singleton class represents the constants of application
 * @class App.Constants
 */

Ext.define("App.Constants", {
            singleton  : true,

            // sprites related constants
            CIRCLE_RADIUS       : 60,
            CIRCLE_FILLSTYLE    : "#abc",
            CIRCLE_LINE_WIDTH   : 3,
            CIRCLE_STROKESTYLE  : 'black',
            NODE_SPRITE_TYPE    : 'circle',
            ARROW_SPRITE_TYPE   : 'path',
            ARROW_STROKESTYLE   : '#000000',
            ARROW_LINE_WIDTH    : 2,
            LINE_STROKE_STYLE   : '#000000',
            LINE_WIDTH          : 2,
            CIRCLE_Z_INDEX      : 1,
            TEXT_Z_INDEX        : 2,
            FX_DURATION         : 100,

            // location calculation related constants
            X_RIGHT_LIMIT : 1050,
            X_LEFT_LIMIT  : 270,
            X_BASE        : 120,
            Y_BASE        : 180,
            // Y_CONDITION must be same as initial Y_BASE always
            Y_CONDITION   : 180,
            X_SHIFT       : 200,
            Y_SHIFT       : 300
  });
