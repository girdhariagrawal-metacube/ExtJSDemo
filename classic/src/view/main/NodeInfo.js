/**
 * This class represents list panel to display details of currently selected
 * node in the graph.
 * @class POC.view.main.NodeInfo
 * @extends Ext.grid.Panel
 */

Ext.define('POC.view.main.NodeInfo', {
    extend: 'Ext.grid.Panel',
    xtype: 'info',
    preventHeader: true,
    requires  : [
        'POC.store.SingleNodeData',
        'POC.model.nodeModel'
    ],

    store     : {
        type: 'currentNode'
    },
    collapsible  :'true',
    columns   : [
        { text: 'Node Id',        dataIndex: 'nodeId' },
        { text: 'Node Name',      dataIndex: 'nodeName',       flex: 1 },
        { text: 'Forward Edges',  dataIndex: 'forwardEdges',   flex: 1 },
        { text: 'Backward Edges', dataIndex: 'backwardEdges',  flex: 1 }
        ],
    renderTo: Ext.getBody()
});
