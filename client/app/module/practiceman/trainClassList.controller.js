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

			//查询条件
			queryOption: {
				name: '',
			},

			// 获取评教问卷已分配列表
			getPracticeGroupList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.queryOption.name
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

			deleteWeekTask: function (entity) {
				var that = $scope.practiceGroupMan;
				var params = {
					id: entity.id
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
				messageService.getMsg("您确定要删除此条记录吗？", that.deleteWeekTask(entity))
			},

			init: function () {
				this.getPracticeGroupList();
			}
		};
		$scope.practiceGroupMan.init();
	});