/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
	RestClient = require('./helper/RestClient'),
	Config = require('../config/environment'),
	ErrorCode = require('../common/errorCode');

var CourseService = {

	getCourseList: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/course/list',
			params: params
		}).then(function (res) {
				if (res.status.code == 200) {
					callback(null, res.entity);
				} else {
					callback(ErrorCode.errorHandle(res));
				}
			})
			.catch(function (e) {
				callback(e);
			});
	},

	//查询课程评分
	getCourseListIn: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
			path: '/api/web/v1/courseAssess/queryCourseAssess',
			access_token: access_token,
			params: params
		}).then(function (res) {
				if (res.status.code == 200) {
					callback(null, res.entity);
				} else {
					callback(ErrorCode.errorHandle(res));
				}
			})
			.catch(function (e) {
				callback(e);
			});
	},

	//查询课程详情
	getCsdInfo: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
			path: '/api/web/v1/courseAssess/queryCourseAssessDetails',
			access_token: access_token,
			params: params
		}).then(function (res) {
				if (res.status.code == 200) {
					callback(null, res.entity);
				} else {
					callback(ErrorCode.errorHandle(res));
				}
			})
			.catch(function (e) {
				callback(e);
			});
	},

	//查询课程评教详情
	getDetailInfo: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
			path: '/api/web/v1/courseAssess/queryOneCourseAssess',
			access_token: access_token,
			params: params,		
		}).then(function (res) {
				if (res.status.code == 200) {
					callback(null, res.entity);
				} else {
					callback(ErrorCode.errorHandle(res));
				}
			})
			.catch(function (e) {
				callback(e);
			});
	},
	addCourse: function (params, access_token, callback) {
		RestClient.post({
			host: 'gateway-org',
			path: '/v1/course/add',
			entity: params
		}).then(function (res) {
			if (res.status.code == 200) {
				callback(null, res.entity);
			} else {
				callback(ErrorCode.errorHandle(res));
			}
		}).catch(function (e) {
			callback(e);
		});
	},
	deleteCourse: function (params, access_token, callback) {
		RestClient.delete({
			host: 'gateway-org',
			path: '/v1/course/delete/' + params.id,
			params: {userId: params.userId}
		}).then(function (res) {
			if (res.status.code == 200) {
				callback(null, res.entity);
			} else {
				callback(ErrorCode.errorHandle(res));
			}
		}).catch(function (e) {
			callback(e);
		});
	},
	updateCourse: function (params, access_token, callback) {
		RestClient.put({
			host: 'gateway-org',
			path: '/v1/course/update',
			entity: params
		}).then(function (res) {
			if (res.status.code == 200) {
				callback(null, res.entity);
			} else {
				callback(ErrorCode.errorHandle(res));
			}
		}).catch(function (e) {
			callback(e);
		});
	},
	getCourseById: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/course/get/' + params.id,
			access_token: access_token
		}).then(function (res) {
			if (res.status.code == 200) {
				callback(null, res.entity);
			} else {
				callback(ErrorCode.errorHandle(res));
			}
		}).catch(function (e) {
			callback(e);
		});
	},
	getCourseDropListOrg: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/course/droplist',
			access_token: access_token,
			params: params
		}).then(function (res) {
			if (res.status.code == 200) {
				callback(null, res.entity);
			} else {
				callback(ErrorCode.errorHandle(res));
			}
		}).catch(function (e) {
			callback(e);
		});
	},

	getImpResult: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/course/importmsg',
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

};


Promise.promisifyAll(CourseService, {suffix: "Sync"});

module.exports = CourseService;
