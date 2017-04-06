'use strict';

var _ = require('lodash'),
    PtService = require('../../../services/userCenter/ptService');

module.exports = {
    getTeams: function(req, res){
        PtService.getTeamsSync(req.query, req.user.access_token)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(500).json({
                    message: err.message,
                    code: err.code
                })
            });
    }
};


