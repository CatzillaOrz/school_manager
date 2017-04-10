
'use strict';

var _ = require('lodash'),
    MajorService = require('../../services/majorService');

module.exports = {
    getMajorList : function (req, res) {
        MajorService.getMajorListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    }

};


