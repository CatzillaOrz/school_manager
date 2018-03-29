'use strict';

angular.module('dleduWebApp')
	.controller('BackStudentCtrl', function ($scope, AuthService, StudentService, ngDialog, messageService) {
		$scope.backStudentFn = {
			records: [],
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			params: {
				name: ""
			},

			//学籍异动操作对象
			changeObj: {
				userIdList: [],
				cause: '',
				userId: 0,
			},

			// 获取学生列表
			getRemoveStudents: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.params.name
				};
				StudentService.getRemoveStudents(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},
			//根据名称查询
			findStudentByPage: function () {
				this.page.pageNumber = 1;
				this.getRemoveStudents();
			},

			//恢复学生
			resumeStudent: function (stu) {
				this.currentStudent = stu;
				ngDialog.open({
					template: 'changeStuDialog',
					width: 700,
					scope: $scope
				})

			},

			submit: function(){
				var that = this;
				var params = this.changeObj;
				params.userIdList = [this.currentStudent.id];
				params.userId = AuthService.getUser().id;

				StudentService.resumeStudent(params).$promise
					.then(function (data) {
						if(data.message == 'SUCCESS'){
							messageService.openMsg("恢复学生成功！");
							that.findStudentByPage();
						}else{
							messageService.openMsg("恢复学生失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error, "恢复学生失败！"));
					})
			},


			init: function () {
				this.getRemoveStudents();
			}
		};
		$scope.backStudentFn.init();
	});
