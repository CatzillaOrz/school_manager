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
					pageSize: that.page.pageSize
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
				if(_this.distType == 'school'){
					params.roleName = 'ROLE_ORG_MANAGER';
				}else{
					params.roleName = 'ROLE_COLLEGE_ADMIN';
				}
				RoleManagerService.distRole(params).$promise
					.then(function (data) {
						messageService.openMsg("分配权限成功！");
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error, "分配权限失败！"));
					})
			},

			//分配提示
			distPrompt: function (type) {
				if(!this.currentRecord){
					messageService.openMsg("请先选择分配人！");
					return;
				}
				this.distType = type;
				var that = this;
				var distType =  type == 'school' ? '校级管理员' : '院级管理员';
				messageService.getMsg("您确定将"+ that.currentRecord.name +"分配为"+ distType +"吗？", that.distRole)
			},

			//分配院级管理员
			distColMan: function(){
				this.distPrompt('col');
			},

			//分配校级管理员
			distSchoolMan: function(){
				this.distPrompt('school');
			},

			//选择分配
			selDist: function(record){
				this.currentRecord = record;
			},

			init: function () {
				this.getTeacherList();
			}
		};
		$scope.roleDist.init();
	});
