'use strict';

var express = require('express');
var controller = require('./em.controller');
var auth = require('../../../middleware/auth');

var router = express.Router();

router.get('/getCourseT', auth.isSignedIn, controller.getCourseT);
router.get('/getCourseS', auth.isSignedIn, controller.getCourseS);

module.exports = router;
