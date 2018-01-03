'use strict';

var _ = require('lodash'),
    SchoolService = require('../../services/schoolService'),
    Config = require('../../config/environment');

module.exports = {
    getLogoList: function (req, res) {
        SchoolService.getLogoListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addLogo: function (req, res) {
        SchoolService.addLogoSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getShuffImageList: function (req, res) {
        SchoolService.getShuffImageListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addShuffImage: function (req, res) {
        SchoolService.addShuffImageSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateShuffImage: function (req, res) {
        SchoolService.updateShuffImageSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addSchoolInfo: function (req, res) {
        SchoolService.addSchoolInfoSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteShuffImage: function (req, res) {
        SchoolService.deleteShuffImageSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getSchoolInfo: function (req, res) {
        SchoolService.getSchoolInfoSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addHotMajor: function (req, res) {
        SchoolService.addHotMajorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getHotMajor: function (req, res) {
        SchoolService.getHotMajorSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateHotMajor: function (req, res) {
        SchoolService.updateHotMajorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteHotMajor: function (req, res) {
        SchoolService.deleteHotMajorSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    addExcellentTeacher: function (req, res) {
        SchoolService.addExcellentTeacherSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getExcellentTeacherList: function (req, res) {
        SchoolService.getExcellentTeacherListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateExcellentTeacher: function (req, res) {
        SchoolService.updateExcellentTeacherSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteExcellentTeacher: function (req, res) {
        SchoolService.deleteExcellentTeacherSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },


    addBoutiqueCourse: function (req, res) {
        SchoolService.addBoutiqueCourseSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getBoutiqueCourseList: function (req, res) {
        SchoolService.getBoutiqueCourseListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateBoutiqueCourse: function (req, res) {
        SchoolService.updateBoutiqueCourseSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteBoutiqueCourse: function (req, res) {
        SchoolService.deleteBoutiqueCourseSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getSchoolByDomain: function (req, res) {
        SchoolService.getSchoolByDomainSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getBoutiqueCourseDropList: function (req, res) {
        SchoolService.getBoutiqueCourseDropListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getHotMajorById: function (req, res) {
        SchoolService.getHotMajorByIdSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getExcellentTeacherById: function (req, res) {
        SchoolService.getExcellentTeacherByIdSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getSchoolOra: function (req, res) {
        var callback = req.query.callback;
        var resultData={
            logos:{},
            data:{}
        };

        SchoolService.getSchoolByDomainSync(req.query)
            .then(function (data) {
                var params = {
                    orgId: data.id
                };
                return SchoolService.getLogoListSync(params)
            }).then(function (entity) {
            resultData.logos=entity.data;
            return SchoolService.getSchoolByDomainSync(req.query);
        }).then(function (schoolData) {
            resultData.data=schoolData;
            var entityStr = JSON.stringify(resultData);//"var GLOB_SCHOOL="+
            var result = callback + '(' + entityStr + ')';
            res.send(result);
        }).catch(function (e) {
            console.log(e);
            res.status(e.code).send(e.message);
        });
    },

    getApiUrl: function(req, res){
        var url;
        if(req.query.type == 'pay'){
            url = Config.backend_api.api_gateway + "zuul/paycallback" ;
        }
        var data = {
            url : url
        };
        res.json(data);
    }

};


