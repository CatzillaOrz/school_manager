/**
 * Created by Administrator on 2017/2/16.
 * 素质学分
 */
'use strict';


var Promise = require('bluebird'),
	RestClient = require('./helper/RestClient'),
	Config = require('../config/environment'),
	ErrorCode = require('../common/errorCode');

var QualityCreditService = {

	//报表列表
	getQualityCreditReportList: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
			path: '/api/web/v1/credit/report/getReportList',
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

	//模板列表
	getQualityCreditTemList: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
			path: '/api/phone/v1/credit/templet/getTempletListPage',
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


	//根据id查询模板
	getTemplateById: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
			path: '/api/phone/v1/credit/templet/getTemplet',
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

	//新增模板
	addTemplate: function (params, access_token, callback) {
		RestClient.post({
			host: 'dd',
			path: '/api/phone/v1/credit/templet/saveTemplet',
			access_token: access_token,
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

	//删除模板
	delTemplate: function (params, access_token, callback) {
		RestClient.delete({
			host: 'dd',
			path: '/api/phone/v1/credit/templet/deleteTemplet',
			access_token: access_token,
			params: {templetId: params.templetId}
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

	//更新模板
	updateTemplate: function (params, access_token, callback) {
		RestClient.put({
			host: 'dd',
			path: '/api/phone/v1/credit/templet/saveTemplet',
			access_token: access_token,
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

	//导出报表
	exportReport: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
			path: '/api/web/v1/credit/report/exportReportByTemplet',
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

	//通过id导出
	exportReportById: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
			path: '/api/web/v1/credit/report/exportReport',
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
};


Promise.promisifyAll(QualityCreditService, {suffix: "Sync"});

module.exports = QualityCreditService;
