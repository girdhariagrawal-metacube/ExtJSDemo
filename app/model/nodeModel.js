
/**
 * This class defines the model for node entity, it defines the fields for
 * the model class
 * @class POC.model.nodeModel
 * @extends Ext.data.Model
 * @author pulkit
 * @version 1.0.1
 */

Ext.define('POC.model.nodeModel',{
    extend:'Ext.data.Model',
    xtype:'node-model',

    config : {
      fields: [
          {name: 'nodeId',           type: 'int'},
          {name: 'nodeName',         type: 'string'},
          {name: 'forwardEdges',     type: 'auto'},
          {name: 'backwardEdges',    type: 'auto'}
      ]
    }
});
