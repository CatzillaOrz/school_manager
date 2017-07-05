'use strict';

var _ = require('lodash'),
    EduManService = require('../../services/eduManService');

module.exports = {
    getEvaQuesList: function (req, res) {
        EduManService.getEvaQuesListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesInfo: function (req, res) {
        EduManService.getEvaQuesInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesDist: function (req, res) {
        EduManService.getEvaQuesDistSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesUnDist: function (req, res) {
        EduManService.getEvaQuesUnDistSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesUnNormalStatic: function (req, res) {
        EduManService.getEvaQuesUnNormalStaticSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesNormalStatic: function (req, res) {
        EduManService.getEvaQuesNormalStaticSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesStaticInfo: function (req, res) {
        EduManService.getEvaQuesStaticInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesResult: function (req, res) {
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

    getElecFenceList: function (req, res) {
        var data = {
            "data": [
                {
                    "id": 14,
                    "studentNo": "20170908114",
                    "name": "abc",
                    "stuId": '21332121',
                    "college":"计算机",
                    "major": '物理系',
                    "className": '101班',
                    "checkedAcount": 6,
                    "isLeave": "离校",
                    "currentLocation": "离校",
                    "isOnline": "离线",
                    "comment": "未激活",
                },
                {
                    "id": 14,
                    "studentNo": "20170908114",
                    "name": "abc",
                    "stuId": '21332121',
                    "college":"计算机",
                    "major": '物理系',
                    "className": '101班',
                    "checkedAcount": 6,
                    "isLeave": "离校",
                    "currentLocation": "离校",
                    "isOnline": "离线",
                    "comment": "未激活",
                },
            ],
            "page": {
                "totalElements": 2,
                "totalPages": 1,
                "pageNumber": 0,
                "pageSize": 10
            }
        }
        res.json(data);
        return;
        EduManService.getElecFenceListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getElecFenceHistory: function (req, res) {
        var data = {
            "data": [
                {
                    "id": 14,
                    "studentNo": "20170908114",
                    "name": "abc",
                    "stuId": '21332121',
                    "college":"计算机",
                    "major": '物理系',
                    "className": '101班',
                    "date": '2017-05-27',
                    "checkedAcount": 6,
                    "isLeave": "是",
                    "currentLocation": "离校",
                    "isOnline": "离线",
                    "comment": "未激活",
                },
                {
                    "id": 14,
                    "studentNo": "20170908114",
                    "name": "abc",
                    "stuId": '21332121',
                    "college":"计算机",
                    "major": '物理系',
                    "className": '101班',
                    "date": '2017-05-27',
                    "checkedAcount": 6,
                    "isLeave": "否",
                    "comment": "当天未登录",
                },
            ],
            "page": {
                "totalElements": 2,
                "totalPages": 1,
                "pageNumber": 0,
                "pageSize": 10
            }
        }
        res.json(data);
        return;
        EduManService.getElecFenceHistorySync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getElecFenceCurrent: function (req, res) {
        var data = {
            "id": 14,
            "studentNo": "20170908114",
            "name": "张三",
            "stuId": '21332121',
            "college":"计算机",
            "major": '物理系',
            "className": '101班',
            "data": [
                {
                    "id": 14,
                    "studentNo": "20170908114",
                    "name": "abc",
                    "stuId": '21332121',
                    "college":"计算机",
                    "major": '物理系',
                    "className": '101班',
                    "date": '2017-05-27',
                    "checkedAcount": 6,
                    "isLeave": "是",
                    "currentLocation": "离校",
                    "isOnline": "离线",
                    "comment": "未激活",
                },
                {
                    "id": 14,
                    "studentNo": "20170908114",
                    "name": "abc",
                    "stuId": '21332121',
                    "college":"计算机",
                    "major": '物理系',
                    "className": '101班',
                    "date": '2017-05-27',
                    "checkedAcount": 6,
                    "isLeave": "否",
                    "comment": "当天未登录",
                },
            ],
        }
        res.json(data);
        return;
        EduManService.getElecFenceCurrentSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


