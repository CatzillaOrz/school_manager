'use strict';

var _ = require('lodash'),
    DdService = require('../../../services/userCenter/ddService');

module.exports = {
    //获取学生考勤信息
    getAttendanceStu: function(req, res){
        DdService.getAttendanceStuSync(req.query, req.user.access_token)
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

    //获取教师考勤信息
    getAttendanceTea: function(req, res){
        DdService.getAttendanceTeaSync(req.query, req.user.access_token)
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


