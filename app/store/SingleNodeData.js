
/**
 * This class defines the store for nodeModel, it contains a proxy for reading
 * data in the form of json objects provided at load time. It uses the memory
 * type proxy. This is attached with the NodeInfo grid to display info of
 * currently selected node.
 * @class POC.store.SingleNodeData
 * @extends Ext.data.Store
 */

Ext.define('POC.store.SingleNodeData',{
    extend:'Ext.data.Store',

    alias: 'store.currentNode',
    model: 'POC.model.nodeModel',

    // defining stroreId for accessing through strore manager
    config:{
      storeId: 'selectedNode'
    },

    // defining proxy with configuration settings
    // autoLoad  : 'true',
    proxy: {
         type: 'memory',
         reader: {
             type: 'json'
         }
     }
});
