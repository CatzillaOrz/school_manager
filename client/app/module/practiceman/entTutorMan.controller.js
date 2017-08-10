/**
 * Created by Administrator on 2017/6/22.
 * 企业导师管理
 */
angular.module('dleduWebApp')
	.controller('EntTutorManCtrl', function ($scope, $state, AuthService, messageService, PracticeManService, CommonService) {
		$scope.entTutorMan = {
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
			},

			// 获取评教问卷已分配列表
			getEntTutorList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.queryOption.name
				};
				CommonService.delEmptyProperty(params);
				PracticeManService.getEntTutorList(params).$promise
					.then(function (data) {
						that.records = data.content;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			//删除企业导师
			delEntTutor: function () {
				var that = $scope.entTutorMan;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: that.currentRecord.id
				};
				PracticeManService.delEntTutor(params).$promise
					.then(function (data) {
						messageService.openMsg("删除成功！");
						that.getEntTutorList();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"删除失败！"));
					})
			},

			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要删除此条记录吗？", that.delEntTutor)
			},

			init: function () {
				this.getEntTutorList();
			}
		};
		$scope.entTutorMan.init();
	});