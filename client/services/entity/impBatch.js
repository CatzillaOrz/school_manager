/**
 * Created by Administrator on 2017/7/26.
 * 批量imp
 */
'use strict';

angular.module('dleduWebService')
	.factory('ImpBatchService', function ($http, $q, $resource, ngDialog, Upload, messageService, CommonService) {
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
							scopeObj.errorInfos = res.data;
							if(scopeObj.errorInfos[0].id){
								ngDialog.close();
								messageService.openMsg("导入成功！");
								callback.call(scopeObj);
							}else{
								ngDialog.close();
								ngDialog.open(openParams);
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
				if($newFiles && $newFiles[0]) {
					var name = $newFiles[0].name;
					var suff = name.substring(name.lastIndexOf("."), name.length).toLowerCase();
					if(suff != '.xls' && suff != '.xlsx'){
						var result = messageService.openDialog("请选择excel文件！");
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
				var hostname = window.location.hostname;
				var host = 'http://gatewaydev.aizhixin.com/zuul/org-manager';
				if(hostname.indexOf('schooldev.aizhixin.com') != -1){
					host = 'http://gatewaydev.aizhixin.com/zuul/org-manager';
				}else if(hostname.indexOf('schooltest.aizhixin.com') != -1){
					host = 'http://gatewaytest.aizhixin.com/zuul/org-manager';
				}else if(hostname.indexOf('school.dlztc.com') != -1){
					host = 'http://gatewaytest.aizhixin.com/zuul/org-manager';
				}else if(hostname.indexOf('school.aizhixin.com') != -1){
					host = 'http://gatewaytest.aizhixin.com/zuul/org-manager';
				}
				var paths = {'college' : host + '/v1/college/template',
					'major' : host + '/v1/professionnal/template',
					'classes':host + '/v1/classes/template',
					'student': host + '/v1/students/template',
					'teacher': host + '/v1/teacher/template',
					'compulsory': host + '/v1/teachingclass/template?templateType=must',
					'optional': host + '/v1/teachingclass/template?templateType=option'};
				window.location.href = paths[type];
			},
		}

	});