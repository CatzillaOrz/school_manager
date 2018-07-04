/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./class.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getClassList',auth.isSignedIn, controller.getClassList);
router.post('/addClass',auth.isSignedIn, controller.addClass);
router.delete('/deleteClass',auth.isSignedIn, controller.deleteClass);
router.put('/updateClass',auth.isSignedIn, controller.updateClass);
router.get('/getClassById',auth.isSignedIn, controller.getClassById);
router.get('/geClassDropList',auth.isSignedIn, controller.geClassDropList);
router.post('/saveClassTeacher',auth.isSignedIn, controller.saveClassTeacher);
router.get('/getClassTeacherList',auth.isSignedIn, controller.getClassTeacherList);
router.get('/getInstructorList',auth.isSignedIn, controller.getInstructorList);
router.delete('/deleteClassTeacher',auth.isSignedIn, controller.deleteClassTeacher);
router.get('/getClassDropListOrg',auth.isSignedIn, controller.getClassDropListOrg);
router.get('/exportClass',auth.isSignedIn, controller.exportClass);

module.exports = router;
