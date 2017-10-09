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
            host: 'gateway-org',
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
            host: 'gateway-org',
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
            host: 'gateway-org',
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
        params.accessToken = access_token;
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/mentorstraining/delete',
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

    //编辑企业导师
    updateEntTutor: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
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
            host: 'gateway-org',
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
            host: 'gateway-org',
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
            host: 'gateway-org',
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
            host: 'gateway-org',
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

    //根据学生或教师id判断是否已经加入其他小组
    isExistInGroup: function (params, access_token, callback) {
        var type = params.type;
        var path = type == 'student' ? '/v1/trainingmanage/checkStudent' : '/v1/trainingmanage/checkteacher';
        RestClient.get({
            host: 'gateway-org',
            path: path,
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
        params.accessToken = access_token;
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/mentorstraining/delete',
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

    //获取实践人数统计
    getPeopleStats: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/peoplecountlist',
            entity: params,
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

    //获取实践任务统计
    getTaskStats: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/stutasklist',
            entity: params,
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

    //获取实践任务统计
    getCompanyName: function (params, access_token, callback) {
        RestClient.get({
            host: 'stu-practice',
            path: '/v1/taskstatistics/enterprisenamelist',
            entity: params,
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

    //获取实践人员详情
    getPeopleDetail: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/peopledetaillist',
            entity: params,
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
