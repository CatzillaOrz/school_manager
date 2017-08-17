/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./course.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getCourseList', auth.isSignedIn, controller.getCourseList);
router.get('/getCourseListIn', auth.isSignedIn, controller.getCourseListIn);
router.get('/getDetailInfo', auth.isSignedIn, controller.getDetailInfo);
router.get('/getCsdInfo', auth.isSignedIn, controller.getCsdInfo);
router.post('/addCourse', auth.isSignedIn, controller.addCourse);
router.delete('/deleteCourse', auth.isSignedIn, controller.deleteCourse);
router.put('/updateCourse', auth.isSignedIn, controller.updateCourse);
router.get('/getCourseById', auth.isSignedIn, controller.getCourseById);
router.get('/getCourseDropListOrg', auth.isSignedIn, controller.getCourseDropListOrg);
router.get('/getImpResult', auth.isSignedIn, controller.getImpResult);


module.exports = router;
