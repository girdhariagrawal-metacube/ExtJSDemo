/**
* This class represents the save graph controller to save graph to client system
* @class POC.view.main.SaveGraphController
* @extends Ext.app.ViewController
*/

Ext.define('POC.view.main.UploadGraphController', {
 extend: 'Ext.app.ViewController',
 alias: 'controller.upload',

 /**
  * it is responsible for taking the saved graph from the client's side and
  * uploading it on server.
  * @param {me} the object of button
  */

 upload: function(me){
     var form     = me.up('formpanel');
      //  var fileName = form.getValues().fileToUpload.split('\\')[2];
      //  if(form.isValid()){
      // submitting form
       form.submit({
           url: 'http://52.42.171.136/phpfileupload/file.php',
           waitMsg: 'Uploading Graph',
           success: function(fp, action) {
           }.bind(this),
           failure: function(fp, action) {
             this.readFileData(fileName);
          }.bind(this)
       });
    //  }
 },

 /**
  * it sends a JsonP request to the server for reading the just uploaded file,
  * inside it's callback function it calls another function to createLoadedGraph
  * function with the response data
  * @param {filename} the filename to read
  */

 readFileData: function(fileName){
   Ext.data.JsonP.request({
     url : 'http://52.42.171.136/phpfileupload/response.php',
     callbackName: 'responseCallback',
     params : {
       filename : fileName
     },
     callback: function(p,data) {
      this.createLoadedGraph(data);
    }.bind(this)
   });
 },

 /**
  * it removes the old graph, changes the current graph state, and starts the
  * whole process of creating the graph corresponding to the just loaded graph
  * @param {data} data of graph to be  re-created
  */

 createLoadedGraph: function(data){
   console.log(data);
   var jsonData    = JSON.parse(data),
       nodesRecord = jsonData.nodes,
       oldState  = jsonData.state;

   // removing the current graph
   surface.removeAll();
   surface.renderFrame();


   // restoring the state of the graph
   App.GraphState.xBase       = oldState.xBase;
   App.GraphState.yBase       = oldState.yBase;
   App.GraphState.xShift      = oldState.xShift;
   App.GraphState.xPoint      = oldState.xPoint;
   App.GraphState.yPoint      = oldState.yPoint;
   App.GraphState.totalNodes  = 1;
   this.refreshStore(nodesRecord);

   // generating the reference to graph controller
   if(!App.GraphState.ref){
       ref                = POC.app.getController('POC.view.main.GraphController');
       App.GraphState.ref = ref;
   }

   // creating graph sprites and re creating the just loaded graph
   ref        =  App.GraphState.ref;
   spriteData = ref.addCircleSprites(surface,nodesRecord,true);
   ref.addLineSprites(nodesRecord, spriteData, surface);
   ref.addArrowSprites(nodesRecord, spriteData, surface);
   ref.addTextSprite(nodesRecord,spriteData.nodeCoordinates, surface);
 },

refreshStore:  function(nodes){
  var storeObj  =   Ext.getStore('nodes');
  storeObj.removeAll();
  Ext.each(nodes,function(node){
    storeObj.add({
      'nodeId'        : node.data.nodeId,
      'nodeName'      : node.data.nodeName,
      'forwardEdges'  : node.data.forwardEdges,
      'backwardEdges' : node.data.backwardEdges
    });
  });
},
  /**
   * it is responsible for reading the nodes store and calling createGraphJson
   * function to create a JSON representing graph, ready to be downloaded
   * @param {me} object representing the
   */

  reset: function(me) {
      me.up('form').getForm().reset();
  }
});
