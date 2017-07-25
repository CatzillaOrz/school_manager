/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./upload.controller');
var auth = require('../../middleware/auth');
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });

var router = express.Router();

router.post('/uploadFile',auth.isSignedIn, controller.uploadFile);
router.get('/getQiNiuToken', controller.getQiNiuToken);
router.get('/getPolyvToken', controller.getPolyvToken);
router.post('/impBatch',auth.isSignedIn, upload.single('file'), controller.impBatch);
router.get('/downLoad',auth.isSignedIn, controller.downLoad);

module.exports = router;
