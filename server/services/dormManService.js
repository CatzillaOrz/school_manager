/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var DormManService = {

    //获取宿舍楼列表
    getDormBuildings: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/floor/getPage',
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

    //根据id查询宿舍楼信息
    getDormBuildingInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/floor/get',
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

    //新增宿舍楼
    addDormBuilding: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/floor/save',
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

    //删除宿舍楼
    delDormBuilding: function (params, access_token, callback) {
        params.accessToken = access_token;
        RestClient.delete({
            host: 'dd',
            path: '/api/web/v1/floor/delete',
            params: params,
            access_token: access_token,
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

    //编辑宿舍楼
    updateDormBuilding: function (params, access_token, callback) {
        RestClient.put({
            host: 'dd',
            path: '/api/web/v1/floor/put',
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

    //获取宿舍列表
    getDorms: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/room/get/list',
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

    //根据id查询宿舍信息
    getDormInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/room/get',
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

    //新增宿舍
    addDorm: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/room/save',
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

    //删除宿舍
    delDorm: function (params, access_token, callback) {
        params.accessToken = access_token;
        RestClient.delete({
            host: 'dd',
            path: '/api/web/v1/room/del',
            params: params,
            access_token: access_token,
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

    //编辑宿舍
    updateDorm: function (params, access_token, callback) {
        RestClient.put({
            host: 'dd',
            path: '/api/web/v1/room/put',
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

    //获取已经分配的专业
    getDistedMajors: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/roomAssgin/getProfInfo',
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

    //获取宿舍学生信息
    getDormStus: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/room/getRoomStuInfo',
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

    //校验宿舍是否重复
    validationDorm: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/room/get/validation',
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

    //批量关闭宿舍
    closeDorms: function (params, access_token, callback) {
        RestClient.put({
            host: 'dd',
            path: '/api/web/v1/roomAssgin/put',
            access_token: access_token,
            entity: params.roomIds
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

    //批量分配宿舍
    assignDorms: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/roomAssgin/save',
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

    //获取已分配宿舍信息
    getDormDistedInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/roomAssgin/getRoomInfo',
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

    //编辑
    updateDistedInfo: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/roomAssgin/saveAndUpdate',
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

    //批量开放宿舍
    openDorms: function (params, access_token, callback) {
        RestClient.put({
            host: 'dd',
            path: '/api/web/v1/roomAssgin/putOpen',
            access_token: access_token,
            entity: params.roomIds
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

    //分配床位
    distedBed: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/room/assginStuId',
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

    //获取分配专业学生列表
    getStusByMajor: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/room/getNewStuIdInfo',
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

    //删除床位学生信息
    delBedStu: function (params, access_token, callback) {
        params.accessToken = access_token;
        RestClient.delete({
            host: 'dd',
            path: '/api/web/v1/room/deleteStuIdInfo',
            params: params,
            access_token: access_token,
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

    //获取已经选择宿舍的学生名单
    getStusSelected: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/dorms/stats/getStuList',
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

    //统计选宿舍的占比
    statisticsSelDorm: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/dorms/stats/getProfStats',
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
    }

};


Promise.promisifyAll(DormManService, {suffix: "Sync"});

module.exports = DormManService;
