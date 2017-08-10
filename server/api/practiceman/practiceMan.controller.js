'use strict';

var _ = require('lodash'),
    PracticeManService = require('../../services/practiceManService');

module.exports = {
    getEntTutorList: function (req, res) {
        PracticeManService.getEntTutorListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEntTutorInfo: function (req, res) {
        PracticeManService.getEntTutorInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },


    addEntTutor: function (req, res) {
        PracticeManService.addEntTutorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    delEntTutor: function (req, res) {
        PracticeManService.delEntTutorSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateEvaQues: function (req, res) {
        PracticeManService.updateEvaQuesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateEntTutor:function (req,res) {
        PracticeManService.updateEntTutorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getPracticeGroupList: function (req, res) {
        var data = {
            "data": [
                {
                    "id": 110,
                    "name": "实践小组1",
                    "count": 10,
                    "teacherName": '张三',
                },
                {
                    "id": 110,
                    "name": "实践小组2",
                    "count": 5,
                    "teacherName": '张三、李四',
                }
            ],
            "page": {
                "totalElements": 23,
                "totalPages": 3,
                "pageNumber": 0,
                "pageSize": 10
            }
        };
        return res.json(data);
        PracticeManService.getPracticeGroupListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


