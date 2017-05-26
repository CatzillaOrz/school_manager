'use strict';

var express = require('express');
var controller = require('./ueditor.controller');

var router = express.Router();

router.get('/ue', controller.getConfig);
router.all('/ue', controller.headler);
module.exports = router;
