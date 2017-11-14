/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var SchoolYearService = {
    addSchoolYear: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/year/add',
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
    getSchoolYearList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/year/list',
            params,
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
    deleteSchoolYear: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/year/delete/'+params.id,
            params:{userId:params.userId}
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
    getSchoolYearById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/year/get/'+params.id,
            params,
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
    addSemesterWeek: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/week/addsemesterweek',
             params
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
    addPeriod: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/period/add',
            entity:params
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
    getPeriodList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/period/list',
            params,
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
    updatePeriod: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/period/update',
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
    updateSchoolYear: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/year/update',
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
    deletePeriod: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/period/delete/'+params.id,
            params:{userId:params.userId}
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
    deleteTerm: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/semester/delete/' + params.id,
            params:{userId:params.userId}
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
    getPeriodById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/period/get/'+params.id,
            params,
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
    getSchoolYearDropList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/year/droplist',
            params,
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
    getTeachWeekList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/week/list',
            params:params,
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
    getSemesterList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/semester/list',
            params:params,
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
    getSemesterById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/semester/get/'+params.id,
            params:params,
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


Promise.promisifyAll(SchoolYearService, {suffix: "Sync"});

module.exports = SchoolYearService;
