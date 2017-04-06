'use strict';

var express = require('express');
var controller = require('./main.controller');
var auth = require('../../middleware/auth');

var router = express.Router();

router.get('/getCategory',  controller.getCategory);
router.get('/getCompetitiveCourse',  controller.getCompetitiveCourse);
router.get('/getCompetitiveCourseByIDs',  controller.getCompetitiveCourseByIDs);
router.get('/getNewCourse',  controller.getNewCourse);
router.get('/getCourseByCategoryId',  controller.getCourseByCategoryId);

module.exports = router;
