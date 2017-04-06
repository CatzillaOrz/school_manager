'use strict';

var express = require('express');
var controller = require('./dd.controller');
var auth = require('../../../middleware/auth');

var router = express.Router();

 router.get('/getAttendanceStu', auth.isSignedIn, controller.getAttendanceStu);
 router.get('/getAttendanceTea', auth.isSignedIn, controller.getAttendanceTea);
module.exports = router;
