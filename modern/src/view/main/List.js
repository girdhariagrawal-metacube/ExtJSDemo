
/**
 * This class represents list panel to display details of each node in the
 * given graph model.
 * @class POC.view.main.List
 * @extends Ext.grid.Grid
 */

Ext.define('POC.view.main.List', {
    extend: 'Ext.grid.Grid',
    xtype: 'mainlist',

    requires: [
        'POC.store.nodeData',
        'POC.model.nodeModel'
    ],


    title: 'Nodes',

    store: {
        type: 'nodeStore'
    },

    columns: [
        { text: 'Node Id',        dataIndex: 'nodeId',        width: 60 },
        { text: 'Node Name',      dataIndex: 'nodeName',      width: 120 },
        { text: 'Forward Edges',  dataIndex: 'forwardEdges',  width: 100 },
        { text: 'Backward Edges', dataIndex: 'backwardEdges', width: 100 }
    ],
    listeners: {
        select: 'onItemSelected'
    }
});
