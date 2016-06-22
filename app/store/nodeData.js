
/**
 * This class defines the store for nodeModel, it contains a proxy for reading
 * data in the form of json objects
 * @class POC.store.nodeData
 * @extends Ext.data.Store
 */

Ext.define('POC.store.nodeData',{
    extend:'Ext.data.Store',

    alias: 'store.node',
    model: 'POC.model.nodeModel',

    // defining stroreId for accessing through strore manager
    config:{
      storeId: 'nodes'
    },

    // defining proxy with configuration settings
    proxy: {
         type: 'ajax',
         url: '../../fewNodes.json',
         reader: {
             type: 'json'
         },
     },
     // autoLoad enabled
     autoLoad: true,

});
