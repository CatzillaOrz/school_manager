/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./upload.controller');
var auth = require('../../middleware/auth');

var router = express.Router();

router.post('/uploadFile',auth.isSignedIn, controller.uploadFile);
router.get('/getQiNiuToken', controller.getQiNiuToken);
router.get('/getPolyvToken', controller.getPolyvToken);

module.exports = router;
