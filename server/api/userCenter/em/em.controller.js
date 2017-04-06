'use strict';

var _ = require('lodash'),
    EmService = require('../../../services/userCenter/emService');

module.exports = {
    getCourseT: function(req, res){
        EmService.getCourseTSync(req.query, req.user.access_token)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(500).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    getCourseS: function(req, res){
        EmService.getCourseSSync(req.query, req.user.access_token)
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


