/**
 * This singleton class represents the state of graph
 * @class App.GaphState
 */

Ext.define("POC.GraphState", {
    singleton  : true,

    // variables holding the state of the graph.
    xBase                     : POC.Constants.X_BASE,
    yBase                     : POC.Constants.Y_BASE,
    xShift                    : POC.Constants.X_SHIFT,
    xPoint                    : 0,
    yPoint                    : 0,
    totalNodes                : 1,
    nodeCoordinates           : [],
    drawTypeOnClick           : null,
    isTarget1Set              : false,
    flowSlectionOn            : false,
    isFlowStartNodeSelected   : false,
    flowStartNode             : null,
    flowEndNode               : null,
    target1                   : null,
    ref                       : null,
});
