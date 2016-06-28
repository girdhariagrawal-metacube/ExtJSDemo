/**
 * This singleton class represents the state of graph
 * @class App.GaphState
 */

Ext.define("App.GraphState", {
            singleton  : true,

            // variables holding the state of the graph.
            xBase           : App.Constants.X_BASE,
            yBase           : App.Constants.Y_BASE,
            xShift          : App.Constants.X_SHIFT,
            xPoint          : 0,
            yPoint          : 0,
            totalNodes      : 1,
            nodeCoordinates : [],
            ref             : null,
  });
