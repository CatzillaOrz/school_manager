'use strict';

var express = require('express');
var controller = require('./pt.controller');
var auth = require('../../../middleware/auth');

var router = express.Router();

router.get('/getTeams', auth.isSignedIn,  controller.getTeams);

module.exports = router;
