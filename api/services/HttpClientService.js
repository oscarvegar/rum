var http = require("http"),
  zlib = require("zlib");

// EmailService.js - in api/services
module.exports = {
    get : function(url,callback) {
        http.get(url,function(resp){
            var cdata = "";
            resp.on("data", function(chunk) {
            cdata += chunk.toString(); 
          });
          resp.on("end", function() { 
            return callback(cdata); 
          });
            
        });

    }   

};