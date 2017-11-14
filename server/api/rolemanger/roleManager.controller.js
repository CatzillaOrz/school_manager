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
        var roles = ['ROLE_ORG_MANAGER', 'ROLE_ORG_EDUCATIONALMANAGER', 'ROLE_ORG_DATAVIEW',
            'ROLE_COLLEGE_ADMIN', 'ROLE_COLLEG_EDUCATIONALMANAGER', 'ROLE_COLLEG_DATAVIEW'];
        var query = req.body;
        query.roleName = roles[query.roleName];
        RoleManService.distRoleSync(query, req.user.access_token)
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


