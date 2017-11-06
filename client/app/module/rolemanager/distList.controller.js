'use strict';
/**
 * 分配角色页面
 */
angular.module('dleduWebApp')
	.controller('DistListCtrl', function ($scope, TeacherService, AuthService, messageService, CommonService, ngDialog,
										  RoleManagerService, RoleAuthService) {
		$scope.roleDist = {
			//老师列表
			records: [],
			//当前操作的teacher
			currentRecord: null,
			//distType 分配类型
			distType: 'school',
			//当前登录用户id
			currentId: AuthService.getUser().id,
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

			// 获取老师列表
			getTeacherList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					managerId: AuthService.getUser().id
				};
				params.name = that.params.name;
				TeacherService.getTeacherList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},
			//根据名称查询
			findTeacherByPage: function () {
				this.getTeacherList();
			},
			//分配角色
			distRole: function () {
				var _this = $scope.roleDist;
				var params = {
					id: _this.currentRecord.id,
					managerId: AuthService.getUser().id,
				}
				params.userId = _this.currentRecord.id;
				params.roleName = _this.distType;
				RoleManagerService.distRole(params).$promise
					.then(function (data) {
						ngDialog.close();
						if(data.success){
							messageService.openMsg("分配权限成功！");
						}else{
							messageService.openMsg(data.message);
						}
					})
					.catch(function (error) {
						ngDialog.close();
						messageService.openMsg(CommonService.exceptionPrompt(error, "分配权限失败！"));
					})
			},


			//分配权限
			distManAuth: function(){
				if(!this.currentRecord){
					messageService.openMsg("请先选择分配人！");
					return;
				}
				ngDialog.open({
					template: 'distDialog',
					scope: $scope
				});
			},

			//选择分配
			selDist: function(record){
				this.currentRecord = record;
			},

			init: function () {
				//this.getTeacherList();
			}
		};
		$scope.roleDist.init();
	});
