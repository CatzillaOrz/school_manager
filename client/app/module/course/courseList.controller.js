/**
 * 基础课程列表
 */
'use strict';

angular.module('dleduWebApp')
	.controller('CourseListCtrl', function ($scope, CourseService, AuthService, messageService,CommonService,
											ImpBatchService, ngDialog, RoleAuthService) {
		$scope.courseListFn = {
			//课程列表
			courseList: [],
			//当前操作的course
			currentCourse: {},
			myFile: null, //选择的文件对象
			errorInfos: null, //返回的错误信息
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			params: {
				name: "",
			},

			//控制按钮权限
			isUseAuth: function(type){
				return RoleAuthService.isUseAuthority(type);
			},

			// 获取课程列表
			getCourseList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.name = that.params.name;
				CourseService.getCourseList(params).$promise
					.then(function (data) {
						that.courseList = data.data;
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},
			//根据名称查询
			findCourseByPage: function () {
				this.getCourseList();
			},
			//删除
			deleteCourse: function () {
				var _this = $scope.courseListFn;
				var params = {
					id: _this.currentCourse.id,
					userId: AuthService.getUser().id,
				}
				CourseService.deleteCourse(params).$promise
					.then(function (data) {
						messageService.openMsg("课程删除成功！");
						_this.getCourseList();
					})
					.catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"课程删除失败！"));
					})
			},
			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentCourse = entity;
				messageService.getMsg("您确定要删除此课程吗？", that.deleteCourse)
			},

			/**
			 * 弹出批量导入弹出框
			 */
			openImpBatch: function(type){
				var that = this;
				var params = {
					template: 'importDialog',
					width: 600,
					scope: $scope,
				};
				if(type == 'reset'){
					ngDialog.close();
					ImpBatchService.openImpBatch(params);
					return;
				}
				CommonService.addLoading(true, 'all');
				CourseService.getImpResult({orgId: AuthService.getUser().orgId, userId: AuthService.getUser().id}).$promise
					.then(function (data) {
						CommonService.addLoading(false, 'all');
						if(typeof data.state == 'undefined'){
							ImpBatchService.openImpBatch(params);
						}else{
							if(data.state == 10){//数据正在处理请稍候查看
								messageService.openMsg("数据正在处理，请稍候导入数据！");
							}else if(data.state == 20){
								ImpBatchService.openImpBatch(params);
							}else if(data.state == 30){
								that.errorInfos = data
								ngDialog.close();
								var dialogParams = {
									template: 'importResultDialog',
									width: 600,
									scope: $scope
								};
								ngDialog.open(dialogParams);
							}
						}
					})
					.catch(function (error) {

					})
			},

			/**
			 * 弹出批量导入弹出框
			 */
			importantBatch: function(file){
				var params = {
					file: file,
					orgId: AuthService.getUser().orgId,
					userId: AuthService.getUser().id,
					uploadType: 'course'
				};
				var dialogParams = {
					template: 'importResultDialog',
					width: 600,
					scope: $scope
				};
				ImpBatchService.importantBatch(params, this, dialogParams);
			},

			//选择文件事件
			selected: function($newFiles){
				ImpBatchService.selected($newFiles);
			},

			/**
			 * 下载模板
			 */
			downLoad: function(){
				ImpBatchService.downLoad('course');
			},

			/**
			 * 导出
			 */
			exportData: function(){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.name = that.params.name;
				params.pageNumber = 1;
				params.pageSize = 9999999;

				CourseService.exportCourse(params).success(function(data) {
					CommonService.saveAs(data, '课程信息');
				}).catch(function (e) {

				});
			},

			init: function () {
				this.getCourseList();
			}
		};
		$scope.courseListFn.init();
	});
