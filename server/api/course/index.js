/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./course.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getCourseList', auth.isSignedIn, controller.getCourseList);
router.post('/addCourse', auth.isSignedIn, controller.addCourse);
router.delete('/deleteCourse', auth.isSignedIn, controller.deleteCourse);
router.put('/updateCourse', auth.isSignedIn, controller.updateCourse);
router.get('/getCourseById', auth.isSignedIn, controller.getCourseById);
router.get('/getCourseDropListOrg', auth.isSignedIn, controller.getCourseDropListOrg);


module.exports = router;
