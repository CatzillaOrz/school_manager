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
router.get('/getBoutiqueCourseList', controller.getBoutiqueCourseList);
router.put('/updateBoutiqueCourse',auth.isSignedIn, controller.updateBoutiqueCourse);
router.delete('/deleteBoutiqueCourse',auth.isSignedIn, controller.deleteBoutiqueCourse);

router.get('/getSchoolByDomain', controller.getSchoolByDomain);


module.exports = router;
