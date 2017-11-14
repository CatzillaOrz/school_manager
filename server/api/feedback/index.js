/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./feedback.controller');
var auth = require('../../middleware/auth');
var router = express.Router();

router.get('/getFeedbackList',auth.isSignedIn, controller.getFeedbackList);
router.get('/findFeedbackById',auth.isSignedIn, controller.findFeedbackById);
router.get('/findCommentById',auth.isSignedIn, controller.findCommentById);
router.post('/saveComment',auth.isSignedIn, controller.saveComment);
router.post('/saveCComment',auth.isSignedIn, controller.saveCComment);
router.delete('/delCommentById',auth.isSignedIn, controller.delCommentById);
router.delete('/delCCommentById',auth.isSignedIn, controller.delCCommentById);
module.exports = router;
