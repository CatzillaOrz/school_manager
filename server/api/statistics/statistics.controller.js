'use strict';

var _ = require('lodash'),
StatisticsService = require('../../services/statisticsService');

module.exports = {
    getStuProcess: function (req, res) {
        StatisticsService.getStuProcessSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getStuJournal: function (req, res) {
        StatisticsService.getStuJournalSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    }
};


