/**
 * This singleton class represents the constants of application
 * @class App.Constants
 */

Ext.define("POC.Constants", {
    singleton  : true,

    // sprites related constants
    CIRCLE_RADIUS       : 60,
    CIRCLE_FILLSTYLE    : "#abc",
    CIRCLE_LINE_WIDTH   : 3,
    CIRCLE_STROKESTYLE  : 'black',
    DEFAULT_SHADOW_BLUR : 0,
    NODE_SPRITE_TYPE    : 'circle',
    ARROW_SPRITE_TYPE   : 'path',
    ARROW_STROKESTYLE   : '#000000',
    ARROW_LINE_WIDTH    : 2,
    LINE_STROKE_STYLE   : '#000000',
    LINE_WIDTH          : 2,
    CIRCLE              : 'circle',
    CIRCLE_Z_INDEX      : 1,
    TEXT_Z_INDEX        : 2,
    FX_DURATION         : 100,

    GHOST_CIRCLE_Z_INDEX    : 0,

    // rectangle sprite related constants
    STATE_SPRITE_TYPE       : 'rect',
    RECTANGLE               : 'rectangle',
    RECTANGLE_WIDTH         : 100,
    RECTANGLE_HEIGHT        : 100,
    RECTANGLE_LINE_WIDTH    : 3,
    RECTANGLE_STROKESTYLE   : '#000000',
    RECTANGLE_FILLSTYLE     : '#abc',
    RECTANGLE_Z_INDEX       : 1,

    // edges
    EDGE : 'edge',
    // line
    LINE : 'line',

    // flow animation related
    FLOW_PROPOGATION_DELAY  : 2000,
    NODE_FOCUS_SHADOW_COLOR : '#000000',
    NODE_SHADOW_BLUR        : 10,
    NODE_FOCUS_FILLSTYLE    : '#74A7F7',
    EDGE_STROKESTYLE        : '#74A7F7',

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
