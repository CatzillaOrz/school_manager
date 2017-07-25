/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';
var http = require('http'),
  inspect = require('util').inspect;
var Busboy = require('busboy'),
  path = require('path'),
  os = require('os'),
  fs = require('fs');
var _ = require('lodash'),
  UploadService = require('../../services/uploadService.js');
module.exports = {
  uploadFile: function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var file = file;
      var fileName = filename;
      var srcFile = path.join(os.tmpDir(), path.basename(filename));
      file.pipe(fs.createWriteStream(srcFile));
      req.uploadfile = {};
      req.uploadfile.path = srcFile;
      req.uploadfile.filename = filename;
      console.log('upload ....')

    });
    busboy.on('finish', function() {
      console.log( req.uploadfile.filename);

      UploadService.uploadFileSync(req.uploadfile.path, req.uploadfile.filename,req.query,req.user.access_token)
        .then(function (tab) {
          console.log(tab);
          res.json({
            'url': tab.url,
            'swfUrl' : tab.swfUrl,
            'title':tab.originalName,
            'originalName': tab.originalName,
            'fileSize' : tab.fileSize,
            'state': 'SUCCESS'
          });
          //res.json(tab);
        })
        .catch(function (e) {
          res.status(500).send(e.message);
        });
    });
    req.pipe(busboy);
  },
  getQiNiuToken: function (req, res) {

    UploadService.getQiNiuTokenSync()
      .then(function (result) {
        res.json(result);
      })
      .catch(function (e) {
        res.status(500).send(e.message);
      });

  },
  getPolyvToken: function (req, res) {

    UploadService.getPolyvTokenSync()
      .then(function (result) {
        res.json(result);
      })
      .catch(function (e) {
        res.status(500).send(e.message);
      });

  },

  impBatch: function (req, res) {
    var filePath = req.file.path + path.extname(req.file.originalname);
    fs.rename(req.file.path, filePath, function (err) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      UploadService.impBatchSync(filePath, req.user.access_token, { orgId: req.body.orgId, userId: req.body.userId})
          .then(function (json) {
            res.json(json);
          })
          .catch(function (e) {
            res.status(500).json(e);
          })
    });

  },

  downLoad: function(req,res){
    UploadService.downLoadSync(req.query, req.user.access_token)
          .then(function (data) {
            //res.json(json);
            res.send();
          })
          .catch(function (e) {
            res.status(500).json(e);
          })
  },

}
