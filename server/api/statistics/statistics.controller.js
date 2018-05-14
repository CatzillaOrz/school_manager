'use strict';

var _ = require('lodash'),
StatisticsService = require('../../services/StatisticsService');

module.exports = {
    getStuProcess: function (req, res) {
        StatisticsService.getStuProcessSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    }
};


