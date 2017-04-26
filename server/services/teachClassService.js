/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
	RestClient = require('./helper/RestClient'),
	Config = require('../config/environment'),
	ErrorCode = require('../common/errorCode');

var TeachClassService = {

	getTeachClassList: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway',
			path: '/v1/teachingclass/list',
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
	addTeachClass: function (params, access_token, callback) {
		RestClient.post({
			host: 'gateway',
			path: '/v1/teachingclass/add',
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
	deleteTeachClass: function (params, access_token, callback) {
		RestClient.delete({
			host: 'gateway',
			path: '/v1/teachingclass/delete/' + params.id,
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
	updateTeachClass: function (params, access_token, callback) {
		RestClient.put({
			host: 'gateway',
			path: '/v1/teachingclass/update',
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
	getTeachClassById: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway',
			path: '/v1/teachingclass/get/' + params.id,
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
	getTeachClassDropListOrg: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway',
			path: '/v1/teachingclass/droplist',
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
	}

};


Promise.promisifyAll(TeachClassService, {suffix: "Sync"});

module.exports = TeachClassService;
