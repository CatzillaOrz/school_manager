/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./notice.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getNoticeList', controller.getNoticeList);
router.get('/getNoticeById', controller.getNoticeById);


module.exports = router;
