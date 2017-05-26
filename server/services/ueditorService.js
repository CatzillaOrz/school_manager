var Promise = require('bluebird'),
  Config = require('../config/environment'),
  request = require('request'),
  fs = require('fs');
var UeditorService={
  uploadHandler: function (file,picName,type, callback) {
    console.log( 'UE　upload');
    console.log(Config.backend_api.io_host + '/api/v2/upload');
    var r = request.post({
      uri: Config.backend_api.io_host + '/api/v2/upload',
      //headers: {
      //  'Authorization': "Bearer " + access_token
      //}

    }, function(err, res, body){

      if(err){
        console.log(err);
        callback(err);
        return;
      }
      if(res.statusCode == 200){
        callback(null, JSON.parse(body));
      }else{

      }
    });
    var form = r.form();
    if(type=="video"){
      //视频上传
      form.append('file' ,fs.createReadStream(file));
      form.append('targetSource', 'polyv');
      console.log( 'UE　upload video:'+JSON.stringify(r));
    }else{
      //图片上传
      form.append('file' ,fs.createReadStream(file));
      form.append('targetSource', 'qiniu');
      console.log( 'UE　upload :'+JSON.stringify(r));
    }

  },

}

Promise.promisifyAll(UeditorService, {suffix: "Sync"});

module.exports = UeditorService;
