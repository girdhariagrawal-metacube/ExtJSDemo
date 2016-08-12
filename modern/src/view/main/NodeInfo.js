/**
 * This class represents list panel to display details of currently selected
 * node in the graph.
 * @class POC.view.main.NodeInfo
 * @extends Ext.grid.Panel
 */

Ext.define('POC.view.main.NodeInfo', {
    extend: 'Ext.grid.Grid',
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
        { text: 'Node Id',        dataIndex: 'nodeId',        width: '60'},
        { text: 'Node Name',      dataIndex: 'nodeName',      width: '120' },
        { text: 'Forward Edges',  dataIndex: 'forwardEdges',  width: '100' },
        { text: 'Backward Edges', dataIndex: 'backwardEdges', width: '100' }
        ],
    renderTo: Ext.getBody()
});
