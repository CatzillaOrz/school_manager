'use strict';

/*
 * 公共上传服务
 **/

var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  request = require('request'),
  fs = require('fs'),
  ErrorCode = require('../common/errorCode');

var CommonService = {
  /**
   * 上传图片并裁剪
   * */
  uploadImageAndCrop: function(access_token, cropParams, fileInfo, action, callback){
    var r = request.post({
      uri: Config.backend_api.host + '/api/web/v1/public/resUpload',
      headers: {
        'Authorization': "Bearer " + access_token
      }
    }, function(err, res, body){
      if(err){
        console.log(err);
        callback(err);
        return;
      }
      console.log('[CommonService] response status code:' + res.statusCode);
      console.log('[CommonService] response body:' + JSON.stringify(body));
      if(res.statusCode == 200){
        callback(null, JSON.parse(body));
      }else{
        ErrorCode.getErrorSync(body)
          .then(function(err){
            callback(err);
          });
      }
    });
    var form = r.form();
    form.append('file' ,fs.createReadStream(fileInfo.filePath));
    form.append('actionParams', JSON.stringify(cropParams));
    form.append('action', action);
  }
};

Promise.promisifyAll(CommonService, {suffix: "Sync"});

module.exports = CommonService;
