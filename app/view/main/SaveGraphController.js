/**
 * This class represents the save graph controller to save graph to client system

 * @class POC.view.main.SaveGraphController
 * @extends Ext.app.ViewController
 */
Ext.define('POC.view.main.SaveGraphController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'POC.GraphState'
    ],
    alias: 'controller.saveGraph',
    // init function to register a function for saveFile event
    init: function() {
      // Ext.ux.Mediator.on('saveFile', this.saveGraph, this);
    },

    /**
     * it is responsible for reading the nodes store and calling createGraphJson
     * function to create a JSON representing graph, ready to be downloaded
     * @param {me} object representing the
     */

    saveGraph: function(me) {
        //will allow to download a file which contains all the node data
        var nodes   = Ext.getStore('nodes').getRange(),
            jsonObj = this.createGraphJson(nodes),
            data,
            actionComponent;

        // now adding the graph state
        data    = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObj));
        // actionComponent = Ext.ComponentQuery.query('#downloadAction')[0];
        // if(actionComponent){
        //   actionComponent.getEl().dom.download = "Graph.json"; //values.filename+ need to add
        //   actionComponent.href = "data:" + data;
        // }
        return data;
    },

    /**
     * it creates a JSON object representing the whole graph including the data
     * and it's state, to be downloaded for later use
     * @param {nodes} nodes in graph
     */

    createGraphJson: function(nodes) {
        var obj = {
                nodes: [],
                state: {}
            },
            x, y,type;

        Ext.each(nodes, function(node) {
            Ext.each(surface._items, function(item) {
                if (item.nodeInfo && (item.nodeInfo.nodeId === node.data.nodeId)) {
                    x     = item.x;
                    y     = item.y;
                    type  = item.nodeInfo.nodeType;
                }
            });
            //adding store data into obj object
            obj.nodes.push({
                data: {
                    "nodeId"        : node.data.nodeId,
                    "nodeType"      : type,
                    "nodeName"      : node.data.nodeName,
                    "forwardEdges"  : node.data.forwardEdges,
                    "backwardEdges" : node.data.backwardEdges,
                    "x"             : x,
                    "y"             : y
                }
            });
        });
        // adding graph state
        obj.state = {
            xBase     : POC.GraphState.xBase,
            yBase     : POC.GraphState.yBase,
            xShift    : POC.GraphState.xShift,
            xPoint    : POC.GraphState.xPoint,
            yPoint    : POC.GraphState.yPoint,
            totalNodes: POC.GraphState.totalNodes
        };
        return obj;
    },

    /**
     * it creates and open the actionSheet containing the button to start
     * dowloading of graph json
     */

    openDownloadPanel:  function() {
                    // creating downloadable json file corresponding to the
                    // latest state of graph.
                    var data = this.saveGraph();
                    var items = [
                        {
                            xtype: 'button',
                            itemId: 'downloadAction',
                            renderTo: Ext.getBody(),
                            text: 'Download file',
                            ui: 'action',
                            scope: this,
                            href: "data:" + data,
                            autoEl: {
                              tag: 'a',
                              download: 'graph.json'
                            },
                            handler: function() {
                              var link,
                                  holder;

                                link = document.createElement('a');
                                link.id = 'anchor',
                                link.href = 'data:' + data;
                                link.download = 'data.json';

                                holder = document.getElementById('ext-button-6');
                                holder.appendChild(link);
                                link.click();
                                this.actions.hide();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Cancel',
                            scope: this,
                            handler: function() {
                                this.actions.hide();
                            }
                        }
                    ];
                    // creating actionsheet for above actions
                    if (!this.actions) {
                        this.actions = Ext.create('Ext.ActionSheet', {
                            items: items
                        });
                    }
                    // adding the action sheet to viewport
                    Ext.Viewport.add(this.actions);
                    this.actions.show();

                }
});
