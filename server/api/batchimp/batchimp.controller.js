
'use strict';

var _ = require('lodash'),
     BatchImpService = require('../../services/batchImpService');

module.exports = {
    getNormalImpResult:function (req, res) {
        BatchImpService.getNormalImpResultSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getTimetableImpResult:function (req, res) {
        BatchImpService.getTimetableImpResultSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


