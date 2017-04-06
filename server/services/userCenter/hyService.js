'use strict';

var Promise = require('bluebird'),
    RestClient = require('../helper/RestClient'),
    Config = require('../../config/environment'),
    ErrorCode = require('../../common/errorCode');

var HyService = {

};

Promise.promisifyAll(HyService, {suffix: "Sync"});

module.exports = HyService;

