'use strict';

var _ = require('lodash'),
    RoleManService = require('../../services/roleManService');

module.exports = {
    getDistedRoleList: function (req, res) {
        RoleManService.getDistedRoleListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    distRole: function (req, res) {
        RoleManService.distRoleSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    cancleRole: function (req, res) {
        RoleManService.cancleRoleSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


