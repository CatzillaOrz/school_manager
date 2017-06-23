
'use strict';

var _ = require('lodash'),
    EduManService = require('../../services/eduManService');

module.exports = {
    getEvaQuesList : function (req, res) {
        var data = {
            "data": [
                {
                    "id": 212,
                    "name": "17年春季期末评教",
                    "startTime": "2017-04-27",
                    "endTime": "2017-05-27",
                    "status": "已截止",
                    "count": 10,
                    "allScore": 100,
                    "classNumber": 6
                },
                {
                    "id": 211,
                    "name": "17年春季期末评教",
                    "startTime": "2017-04-27",
                    "endTime": "2017-05-27",
                    "status": "已截止",
                    "count": 10,
                    "allScore": 100,
                    "classNumber": 6
                },
                {
                    "id": 210,
                    "name": "17年春季期末评教",
                    "startTime": "2017-04-27",
                    "endTime": "2017-05-27",
                    "status": "已截止",
                    "count": 10,
                    "allScore": 100,
                    "classNumber": 6
                },
                {
                    "id": 209,
                    "name": "17年春季期末评教",
                    "startTime": "2017-04-27",
                    "endTime": "2017-05-27",
                    "status": "已截止",
                    "count": 10,
                    "allScore": 100,
                    "classNumber": 6
                }
            ],
            "page": {
                "totalElements": 4,
                "totalPages": 1,
                "pageNumber": 1,
                "pageSize": 10
            }
        }
        res.json(data);
        return;
        EduManService.getEvaQuesListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesInfo : function (req, res) {
        var data = {
            "name": '17年春季学期期末评教',
            'allScore': 80,
            'endTime': '2017-5-27',
            "data": [
                {
                    "id": 1,
                    "name": "讲课通俗易懂",
                    "score": 20,
                },
                {
                    "id": 2,
                    "name": "课堂气氛",
                    "score": 20,
                },
                {
                    "id": 3,
                    "name": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "score": 20,
                },
                {
                    "id": 4,
                    "name": "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
                    "score": 20,
                }
            ]
        }
        res.json(data);
        return;
        EduManService.getEvaQuesInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesDist : function (req, res) {
        var data = {
            "data": [
                {
                    "id": 212,
                    "code": "12433333",
                    "college": "计算机",
                    "coursename": "语文",
                    "uncomplete": 40,
                    "complete": 60,
                    "allScore": 100,
                    "teachername": '张三',
                    "startTime": '2017-04-23'
                },

                {
                    "id": 211,
                    "code": "12433333",
                    "college": "体育",
                    "coursename": "语文",
                    "teachername": '张三',
                    "uncomplete": 40,
                    "complete": 60,
                    "allScore": 100,
                    "startTime": '2017-04-23'
                },
            ],
            "page": {
                "totalElements": 2,
                "totalPages": 1,
                "pageNumber": 1,
                "pageSize": 10
            }
        }
        res.json(data);
        return;
        EduManService.getEvaQuesDistSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesUnDist : function (req, res) {
        var data = {
            "data": [
                {
                    "id": 212,
                    "code": "12433333",
                    "college": "计算机",
                    "coursename": "语文",
                    "teachername": '张三',
                },

                {
                    "id": 211,
                    "code": "12433333",
                    "college": "体育",
                    "coursename": "语文",
                    "teachername": '张三',
                },
            ],
            "page": {
                "totalElements": 2,
                "totalPages": 1,
                "pageNumber": 1,
                "pageSize": 10
            }
        }
        res.json(data);
        return;
        EduManService.getEvaQuesDistSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    addEvaQues:function (req,res) {
        EduManService.addEvaQuesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteEvaQues:function (req,res) {
        EduManService.deleteEvaQuesSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateEvaQues:function (req,res) {
        EduManService.updateEvaQuesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    }
};


