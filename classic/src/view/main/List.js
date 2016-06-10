/**
 * This view is an example list of people.
 */
Ext.define('POC.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'POC.store.nodeData',
        'POC.model.nodeModel'
    ],

    title: 'Nodes',

    store: {
        type: 'node'
    },

    columns: [
        { text: 'Node Id',        dataIndex: 'nodeId' },
        { text: 'Node Name',      dataIndex: 'nodeName',       flex: 1 },
        { text: 'Forward Edges',  dataIndex: 'forwardEdges',   flex: 1 },
        { text: 'Backward Edges', dataIndex: 'backwardEdges',  flex: 1 }
    ],

    dockedItems: [{
        xtype: 'pagingtoolbar',
        store:  'nodes', // same store GridPanel is using
        dock: 'top',
        displayInfo: true
    }],
    listeners: {
        select: 'onItemSelected'
    },
    renderTo: Ext.getBody()
});
