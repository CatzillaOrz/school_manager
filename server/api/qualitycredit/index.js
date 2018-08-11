/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./qualitycredit.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getQualityCreditReportList', auth.isSignedIn, controller.getQualityCreditReportList);
router.get('/getQualityCreditTemList', auth.isSignedIn, controller.getQualityCreditTemList);
router.get('/getTemplateById', auth.isSignedIn, controller.getTemplateById);
router.post('/addTemplate', auth.isSignedIn, controller.addTemplate);
router.delete('/delTemplate', auth.isSignedIn, controller.delTemplate);
router.put('/updateTemplate', auth.isSignedIn, controller.updateTemplate);
router.get('/getTemplateById', auth.isSignedIn, controller.getTemplateById);

module.exports = router;
