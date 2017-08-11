/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var PracticeManService = {

    //查询企业导师列表
    getEntTutorList: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd_local',
            path: '/v1/mentorstraining/querycorporatementors',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                 callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
                callback(e);
            });
    },

    //根据id查询企业导师信息
    getEntTutorInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd_local',
            path: '/v1/mentorstraining/query/'+params.id,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

    //新增企业导师
    addEntTutor: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd_local',
            path: '/v1/mentorstraining/corporatementorscreat',
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

    //删除企业导师
    delEntTutor: function (params, access_token, callback) {
        RestClient.delete({
            host: 'dd_local',
            path: '/v1/mentorstraining/delete/'+params.id,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                 callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

    //编辑企业导师
    updateEntTutor: function (params, access_token, callback) {
        RestClient.put({
            host: 'dd_local',
            path: '/v1/mentorstraining/update',
            access_token: access_token,
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

    //查询实践小组
    getPracticeGroupList: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd_local',
            path: '/v1/trainingmanage/querygrouplist',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

    //创建实践小组
    addPracticeGroup: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd_local',
            path: '/v1/trainingmanage/creatgroup',
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

    //编辑实践小组
    updatePracticeGroup: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd_local',
            path: '/v1/trainingmanage/updategroup',
            access_token: access_token,
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },


    //查询实训小组信息
    getPracticeGroupInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd_local',
            path: '/v1/mentorstraining/queryinfo/'+ params.id,
            access_token: access_token,
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

    //删除实践小组
    delPracticeGroup: function (params, access_token, callback) {
        RestClient.delete({
            host: 'dd_local',
            path: '/v1/mentorstraining/delete/'+params.id,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },
};


Promise.promisifyAll(PracticeManService, {suffix: "Sync"});

module.exports = PracticeManService;
