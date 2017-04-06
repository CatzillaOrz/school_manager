'use strict';

var Promise = require('bluebird'),
    RestClient = require('../helper/RestClient'),
    Config = require('../../config/environment'),
    ErrorCode = require('../../common/errorCode');

var PtService = {
    getTeams: function (params, access_token, callback) {
        RestClient.get({
            path: '/api/web/v1/team/findteam',
            params: params,
            access_token: access_token,
            host: 'pt'
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function (err) {
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            })
    }

};

Promise.promisifyAll(PtService, {suffix: "Sync"});

module.exports = PtService;

