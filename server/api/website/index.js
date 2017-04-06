'use strict';

var express = require('express');
var controller = require('./website.controller');

var router = express.Router();

router.get('/find', controller.find);

module.exports = router;