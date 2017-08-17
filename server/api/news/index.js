/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./news.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getNewsList',auth.isSignedIn, controller.getNewsList);
router.post('/addNews',auth.isSignedIn, controller.addNews);
router.delete('/deleteNews',auth.isSignedIn, controller.deleteNews);
router.put('/updateNews',auth.isSignedIn, controller.updateNews);
router.get('/getNewsById',auth.isSignedIn, controller.getNewsById);
router.put('/publishNews',auth.isSignedIn, controller.publishNews);
module.exports = router;
