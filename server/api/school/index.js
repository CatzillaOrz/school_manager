/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./school.controller');
var auth = require('../../middleware/auth');

var router = express.Router();

router.get('/getLogoList', controller.getLogoList);
router.post('/addLogo',auth.isSignedIn, controller.addLogo);
router.get('/getShuffImageList', controller.getShuffImageList);
router.post('/addShuffImage',auth.isSignedIn, controller.addShuffImage);
router.put('/updateShuffImage',auth.isSignedIn, controller.updateShuffImage);
router.post('/addSchoolInfo',auth.isSignedIn, controller.addSchoolInfo);
router.delete('/deleteShuffImage',auth.isSignedIn, controller.deleteShuffImage);
router.get('/getSchoolInfo', controller.getSchoolInfo);
router.post('/addHotMajor',auth.isSignedIn, controller.addHotMajor);
router.get('/getHotMajor', controller.getHotMajor);
router.put('/updateHotMajor',auth.isSignedIn, controller.updateHotMajor);
router.delete('/deleteHotMajor',auth.isSignedIn, controller.deleteHotMajor);
//
router.post('/addExcellentTeacher',auth.isSignedIn, controller.addExcellentTeacher);
router.get('/getExcellentTeacherList', controller.getExcellentTeacherList);
router.put('/updateExcellentTeacher',auth.isSignedIn, controller.updateExcellentTeacher);
router.delete('/deleteExcellentTeacher',auth.isSignedIn, controller.deleteExcellentTeacher);

//
router.post('/addBoutiqueCourse',auth.isSignedIn, controller.addBoutiqueCourse);
//从平台课程中获取
router.get('/getBoutiqueCourseList', controller.getBoutiqueCourseList);
router.put('/updateBoutiqueCourse',auth.isSignedIn, controller.updateBoutiqueCourse);
router.delete('/deleteBoutiqueCourse',auth.isSignedIn, controller.deleteBoutiqueCourse);

router.get('/getSchoolByDomain', controller.getSchoolByDomain);
router.get('/getHotMajorById', controller.getHotMajorById);
router.get('/getExcellentTeacherById', controller.getExcellentTeacherById);


//从开卷课程中获取
router.get('/getBoutiqueCourseDropList', controller.getBoutiqueCourseDropList);

router.get('/getSchoolOra', controller.getSchoolOra);
router.get('/getApiUrl', controller.getApiUrl);
router.get('/getApplyList', controller.getApplyList);
router.put('/handleApply', controller.handleApply);
router.get('/getSchoolStatistics', controller.getSchoolStatistics);

router.get('/getSchoolNewList', auth.isSignedIn, controller.getSchoolNewList);
router.get('/getDetailById', auth.isSignedIn, controller.getDetailById);
router.post('/addNews',auth.isSignedIn, controller.addNews);
router.post('/updateNews',auth.isSignedIn, controller.updateNews);
router.delete('/delNews',auth.isSignedIn, controller.delNews);
router.put('/publishNews',auth.isSignedIn, controller.publishNews);
router.put('/canclePublish',auth.isSignedIn, controller.canclePublish);
router.put('/batchDelNews',auth.isSignedIn, controller.batchDelNews);
router.put('/batchPublishNews',auth.isSignedIn, controller.batchPublishNews);

//app发布通知
router.get('/getAppNoticeList', auth.isSignedIn, controller.getAppNoticeList);
router.get('/getAppNoticeDetail', auth.isSignedIn, controller.getAppNoticeDetail);
router.get('/getAllSchool', auth.isSignedIn, controller.getAllSchool);
router.post('/addAppNotice',auth.isSignedIn, controller.addAppNotice);
router.delete('/deleteAppNotice',auth.isSignedIn, controller.deleteAppNotice);
router.post('/updateAppNotice',auth.isSignedIn, controller.updateAppNotice);

router.get('/getDefMenu', auth.isSignedIn, controller.getDefMenu);
router.post('/saveDefMenu',auth.isSignedIn, controller.saveDefMenu);
module.exports = router;
