'use strict';
var http = require('http'),
  inspect = require('util').inspect;
var Busboy = require('busboy'),
  path = require('path'),
  os = require('os'),
  fs = require('fs');
var _ = require('lodash'),
  UeditorService = require('../../services/ueditorService');
module.exports = {

  headler:function(req, res){
    if(req.query.action === 'uploadimage'){
//图片
      uploadDataDto(req, res,"image");

    }else if(req.query.action === 'listimage'){

    }else if(req.query.action === 'uploadfile'){
      //附件
      uploadDataDto(req, res,"file");
    }else if(req.query.action === 'uploadvideo'){
      //视频
      uploadDataDto(req, res,"video");
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.json(require('../../config/ueditorConfig.json'));
      console.log(res);
    }
  },
 getConfig:function(req, res){
     console.log("UE")
   res.setHeader('Content-Type', 'application/json');
   res.json(require('../../config/ueditorConfig.json'));
 }

};
function uploadDataDto(req, res,type){
  var busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    var file = file;
    var picName = filename;
    var saveTo = path.join(os.tmpDir(), path.basename(filename));
    file.pipe(fs.createWriteStream(saveTo));
    req.ueditor = {};
    req.ueditor.fileSaveTo = saveTo;
    req.ueditor.filename = filename;
  });
  busboy.on('finish', function() {
    console.log(""+req.ueditor.fileSaveTo);
    console.log( req.ueditor.filename);
    UeditorService.uploadHandlerSync(req.ueditor.fileSaveTo, req.ueditor.filename,type)
      .then(function (tab) {
        console.log(tab);
        res.json({
          'url': tab.url,
          'title':tab.originalName,
          'original': tab.originalName,
          'state': 'SUCCESS'
        });
        //res.json(tab);
      })
      .catch(function (e) {
        res.status(500).send(e.message);
      });
  });
  req.pipe(busboy);
};
