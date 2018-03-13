'use strict';
/**
 * Created by wangjun on 2016/11/23.
 */

var Promise = require('bluebird'),
	RestClient = require('./helper/RestClient'),
	Config = require('../config/environment'),
	request = require('request'),
	fs = require('fs'),
	ErrorCode = require('../common/errorCode');

var UploadService = {
	/**
	 * 七牛token获取
	 * @param callback
	 */
	getQiNiuToken: function (callback) {
		RestClient.get({
			path: '/api/v2/service/qiniu',
			host: 'io'
		}).then(function (res) {
			console.log(res.entity);
			res.entity.uptoken = res.entity.token;
			console.log(res.entity);
			callback(null, res.entity);
		}).catch(function (e) {
			//  callback(e);
		});
	},
	/**
	 * polyv writeToken 获取
	 * @param callback
	 */
	getPolyvToken: function (callback) {
		RestClient.get({
			path: '/api/v2/service/polyv',
			host: 'io'
		}).then(function (res) {
			console.log(res.entity);
			res.entity.uptoken = res.entity.token;
			console.log(res.entity);
			callback(null, res.entity);
		}).catch(function (e) {
			//  callback(e);
		});
	},

	upload: function (options, callback) {
		var uri = Config.backend_api.api_gateway;
		if(options.host = 'gateway-org-io'){
			uri = Config.backend_api.api_gateway + "zuul/org-manager" + options.path;
		}
		var r = request.post({
			uri: uri,
			headers: {
				'Authorization': "Bearer" + options.access_token
			}
		}, function (err, res, body) {
			if (err) {
				console.log(err);
				callback(err);
				return;
			}
			callback(err, res);
		});
		var form = r.form();
		form.append(options.fileKey, fs.createReadStream(options.filePath));
	},

	/**
	 * 批量导入
	 * @param filePath
	 * @param access_token
	 * @param callback
	 */
	impBatch: function (filePath, access_token, params, callback) {
		var that = this;
		var paths = {'college' : '/v1/college/import', 'major' : '/v1/professionnal/import', 'classes':'/v1/classes/import',
			'student': '/v1/students/import', 'teacher': '/v1/teacher/import', 'compulsory': '/v1/teachingclass/importmust',
			'optional': '/v1/teachingclass/importoption', 'course': '/v1/course/import', 'entTutor': '/v1/mentorstraining/import',
			'newStudent': '/v1/students/importnew', 'normal': '/v1/import/basedata', 'timetable': '/v1/import/coursedata',};
		this.upload({
			host: 'gateway-org-io',
			path: paths[params.uploadType] + '?userId=' + params.userId + '&orgId=' + params.orgId,
			access_token: access_token,
			filePath: filePath,
			fileKey: 'file'
		}, function (err, res) {
			that.deleteTempFile('./uploads/');
			if (err) {
				callback(err);
				return;
			}
			if (res.statusCode === 200 || res.statusCode === 426) {
				if(res.body == ''){
					callback(null, JSON.parse('{"success":true}'));
				}else{
					callback(null, JSON.parse(res.body));
				}
			} else {
				callback(function(){
					return {
						code: JSON.parse(res.body).code,
						message: JSON.parse(res.body).cause
					};
				}());
			}
		})
	},

	/**
	 * 删除文件里面上传的临时文件
	 * @param fileUrl
	 */
	deleteTempFile: function(fileUrl){
		var that = this;
		var files = fs.readdirSync(fileUrl);//读取该文件夹
		files.forEach(function(file){
			var stats = fs.statSync(fileUrl+'/' + file);
			if(stats.isDirectory()){
				that.deleteTempFile(fileUrl+'/'+file);
			}else{
				fs.unlinkSync(fileUrl+'/'+file);
				console.log("删除文件"+fileUrl+'/'+file+"成功");

			}

		});
	},

	/**
	 * 下载文件模板
	 * @param params
	 * @param access_token
	 * @param callback
	 */
	downLoad: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/college/template',
			params: params,
			access_token: access_token
		}).then(function (res) {
			if (res.status.code == 200) {
				callback(null, res);
			} else {
				callback(ErrorCode.errorHandle(res));
			}
		}).catch(function (e) {
			callback(e);
		});
	}

};

Promise.promisifyAll(UploadService, {suffix: "Sync"});

module.exports = UploadService;
