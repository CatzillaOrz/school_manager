/**
 * Created by Administrator on 2017/7/26.
 * 批量imp
 */
'use strict';

angular.module('dleduWebService')
	.factory('ImpBatchService', function ($http, $q, $resource, ngDialog, Upload, messageService, CommonService, SchoolService, AuthService) {
		return {
			/**
			 * 弹出批量导入弹出框
			 */
			openImpBatch: function(params){
				var result = ngDialog.open(params);
			},

			/**
			 * 弹出批量导入弹出框
			 */
			importantBatch: function(params, scopeObj, openParams, callback){
				if(!this.selected([params.file])){
					return;
				}
				CommonService.addLoading(true, 'all');
				if (params.file) {
					Upload.upload({
						url: '/api/upload/impBatch',
						method: 'POST',
						data: params
					}).then(function(res){
						CommonService.addLoading(false, 'all');
						if(res.status === 200){
							if((res.data && res.data.success) || res.data.result == 'success'){//学生教师、排课处理
								messageService.openMsg("上传文件成功！请稍候查看处理结果");
							}else{
								if(res.data && res.data.errorInfo){//处理企业管理不一致的导入接口
									scopeObj.errorInfos = res.data.errorInfo;
								}else{
									scopeObj.errorInfos = res.data;
								}
								if(scopeObj.errorInfos[0].id){
									ngDialog.close();
									messageService.openMsg("导入成功！");
									if(callback){
										callback.call(scopeObj);
									}
								}else{
									ngDialog.close();
									ngDialog.open(openParams);
								}
							}
						}
					},function(res){
						CommonService.addLoading(false, 'all');
						if(res.data && res.data.message){
							messageService.openMsg(res.data.message);
						}else{
							messageService.openMsg("导入失败!");
						}
					})
				}else {
					messageService.openMsg("请选择excel文件！");
					return;
				}
			},

			//选择文件事件
			selected: function($newFiles){
				if($newFiles == null){
					return;
				}
				if($newFiles && $newFiles[0]) {
					var name = $newFiles[0].name, fileSize = $newFiles[0].size;
					var suff = name.substring(name.lastIndexOf("."), name.length).toLowerCase();
					if(suff != '.xls' && suff != '.xlsx'){
						var result = messageService.openDialog("请选择excel文件！");
						messageService.closeDialog(result.id);
						return false;
					}
					if(fileSize / 1024 / 1024 > 1){
						var result = messageService.openDialog("文件太大,请选择小于1M的文件！");
						messageService.closeDialog(result.id);
						return false;
					}
					return true;
				}else{
					var result = messageService.openDialog("请选择excel文件！");
					messageService.closeDialog(result.id);
					return false;
				}
			},

			/**
			 * 下载模板
			 */
			downLoad: function(type){
				//var host = this.getEnvHost();
				SchoolService.getApiUrl({type:"org"}).$promise
					.then(function (data) {
						var host = data.url;
						var paths = {'college' : host + '/v1/college/template',
							'major' : host + '/v1/professionnal/template',
							'classes':host + '/v1/classes/template',
							'student': host + '/v1/students/template',
							'teacher': host + '/v1/teacher/template',
							'compulsory': host + '/v1/teachingclass/template?templateType=must',
							'optional': host + '/v1/teachingclass/template?templateType=option',
							'course': host + '/v1/course/template',
							'entTutor': host + '/v1/mentorstraining/template',
							'newStudent': host + '/v1/students/newstudenttemplate',
							'normal': host + '/v1/import/basetemplate',
							'timetable': host + '/v1/import/coursetemplate'};
						window.location.href = paths[type];
					})
					.catch(function (error) {
					})
			},

			//获取环境
			getEnvHost: function(){
				var env = AuthService.getCurrentEvn();
				var host = 'http://gateway.aizhixin.com/zuul/org-manager';
				if(env == "DEV"){
					host = 'http://gateway.aizhixindev.com/zuul/org-manager';
				}else if(env == "TEST"){
					host = 'http://gateway.aizhixintest.com/zuul/org-manager';
				}else if(env == "PDE"){
					host = 'http://gateway.dlztc.com/zuul/org-manager';
				}else if(env == "SDE"){
					host = 'http://gateway.aizhixin.com/zuul/org-manager';
				}
				return host;
			}
		}

	});