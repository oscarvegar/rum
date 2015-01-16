// UtilService.js - in api/services
module.exports = {
    arrayToCoords : function(coords) {
      var coordsSec = "";
      for(var i in coords){
        if(i==0){}
        var currcor = coords[i];
        if(i>0)
          coordsSec+=","+currcor[0]+" "+currcor[1];
        else
          coordsSec+=currcor[0]+" "+currcor[1];
      }
      return coordsSec;
    }   
    

};