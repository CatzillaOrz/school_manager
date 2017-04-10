
'use strict';

var _ = require('lodash'),
     ClassService = require('../../services/classService');

module.exports = {
    getClassList : function (req, res) {
        ClassService.getClassListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    }

};


