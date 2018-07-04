angular.module('dleduWebApp')
	.controller('PracticeGroupManCtrl', function ($scope, $state, AuthService, EduManService, messageService, CommonService,
												  PracticeManService) {
		$scope.practiceGroupMan = {
			//问卷列表
			records: [],
			//当前操作的class
			currentRecord: {},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//查询条件
			queryOption: {
				name: '',
				status: 'all'
			},

			// 实践计划列表
			getPracticeGroupList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.queryOption.name,
					status: that.queryOption.status
				};
				CommonService.delEmptyProperty(params);
				PracticeManService.getPracticeGroupList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			//删除小组
			delPracticeGroup: function () {
				var that = $scope.practiceGroupMan;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: that.currentRecord.id
				};
				PracticeManService.delPracticeGroupByGId(params).$promise
					.then(function (data) {
						messageService.openMsg("删除成功！");
						that.getPracticeGroupList();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"删除失败！"));
					})
			},

			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要删除此条记录吗？", that.delPracticeGroup)
			},

			init: function () {
				this.getPracticeGroupList();
			}
		};
		$scope.practiceGroupMan.init();
	});