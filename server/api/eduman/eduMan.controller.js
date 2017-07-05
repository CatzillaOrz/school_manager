'use strict';

var _ = require('lodash'),
    EduManService = require('../../services/eduManService');

module.exports = {
    getEvaQuesList: function (req, res) {
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

    getEvaQuesInfo: function (req, res) {
        var data = {
            "name": '17年春季学期期末评教',
            'totalScore': 80,
            'endTime': '2017-5-27',
            "questions": [
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

    getEvaQuesDist: function (req, res) {
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

    getEvaQuesUnDist: function (req, res) {
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

    getEvaQuesUnNormalStatic: function (req, res) {
        var data = {
            "data": [
                {
                    "id": 212,
                    "content": '适当放松放松放松放松发顺丰舒服撒的方式水电费,sdfsf是对方身份',
                    'static': [
                        {"score": 10, count: 20, percent: 90.90},
                        {"score": 8, count: 20, percent: 90.90}
                    ]
                },

                {
                    "id": 212,
                    "content": '适当放松放松放松放松发顺丰舒服撒的方式水电费,sdfsf是对方身份',
                    'static': [
                        {"score": 10, count: 20, percent: 90.90},
                        {"score": 8, count: 20, percent: 90.90}
                    ]
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
        EduManService.getEvaQuesNormalStaticSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesNormalStatic: function (req, res) {
        var data = {
            "data": [
                {
                    "id": 212,
                    "className": "物联网一班",
                    "name": "王亮",
                    "score": 80,
                    "submitTime": '2017-05-10',
                },

                {
                    "id": 212,
                    "className": "物联网一班",
                    "name": "王亮",
                    "score": 80,
                    "submitTime": '2017-05-10',
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
        EduManService.getEvaQuesUnNormalStaticSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesStaticInfo: function (req, res) {
        var data = {
            'college': '计算机',
            'courseName': 'java程序设计',
            'code': '1000155',
            'teacherName': '张三',
            'allNumber': 50,
            'complete': 45,
            'avgScore': 96
        }
        res.json(data);
        return;
        EduManService.getEvaQuesStaticInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesResult: function (req, res) {
        var data = {
            "totalActualScore": 90,
            "questions": [
                {
                    "id": 212,
                    "content": '适当放松放松放松放松发顺丰舒服撒的方式水电费,sdfsf是对方身份',
                    'score': 10,
                    'actualScore': 8
                },

                {
                    "id": 212,
                    "content": '适当放松放松放松放松发顺丰舒服撒的方式水电费,sdfsf是对方身份',
                    'score': 10,
                    'actualScore': 8
                },
            ],
        }
        res.json(data);
        return;
        EduManService.getEvaQuesResultSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeachClassAttendList: function (req, res) {
        EduManService.getTeachClassAttendListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassAttendList: function (req, res) {
        EduManService.getClassAttendListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getStudentAttendByTeachClassId: function (req, res) {
        EduManService.getStudentAttendByTeachClassIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getStudentAttendByClassId: function (req, res) {
        EduManService.getStudentAttendByClassIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    teachClassAttendExport: function (req, res) {
        EduManService.teachClassAttendExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    classAttendExport: function (req, res) {
        EduManService.classAttendExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    teachClassAttendInfoExport: function (req, res) {
        EduManService.teachClassAttendInfoExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    classAttendInfoExport: function (req, res) {
        EduManService.classAttendInfoExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addEvaQues: function (req, res) {
        EduManService.addEvaQuesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteEvaQues: function (req, res) {
        EduManService.deleteEvaQuesSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateEvaQues: function (req, res) {
        EduManService.updateEvaQuesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    distQuestionaire:function (req,res) {
        EduManService.distQuestionaireSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

};


