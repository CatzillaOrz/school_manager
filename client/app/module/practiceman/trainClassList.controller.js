/**
 * Created by Administrator on 2017/6/22.
 * 实践小组管理
 */
angular.module('dleduWebApp')
	.controller('TrainClassListCtrl', function ($scope, $state, AuthService, EduManService, messageService, CommonService,
		PracticeManService) {
		$scope.practiceGroupMan = {
			weekTaskList: [],
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			currentEntity: null,
			//查询条件
			queryOption: {
				name: '',
			},
			id: $state.params.id,
			// 获取课程列表
			getPracticeGroupList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					taskName: that.queryOption.name
				};
				CommonService.delEmptyProperty(params);
				PracticeManService.getWeekTaskList(params).$promise
					.then(function (data) {
						that.weekTaskList = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			deleteWeekTask: function () {
				var that = $scope.practiceGroupMan;
				var params = {
					id: that.currentEntity.id
				};
				PracticeManService.deleteWeekTask(params).$promise
					.then(function (data) {
						messageService.openMsg("删除成功！");
						that.getPracticeGroupList();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error, "删除失败！"));
					})
			},
			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentEntity = entity;
				messageService.getMsg("您确定要删除此条记录吗？", that.deleteWeekTask)
			},

			init: function () {
				this.getPracticeGroupList();
			}
		};
		$scope.practiceGroupMan.init();
	});