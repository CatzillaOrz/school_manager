/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('EvaQuestionCtrl', function ($scope, AuthService, EduManService) {
		$scope.evqQuesListFn={
			//班级列表
			records: [],
			//当前操作的class
			currentRecord: {},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			params: {
				name:"",
			},

			// 获取评教问卷列表
			getEvaQuesList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.name = that.params.name;
				EduManService.getEvaQuesList(params).$promise
					.then(function (data) {
						that.Records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},


			//根据名称查询
			findClassByPage: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.name = that.params.name;
				EduManService.getEvaQuesList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page.totalElements = data.page.totalElements;
						that.page.totalPages = data.page.totalPages;
					})
					.catch(function (error) {

					})
			},
			init: function () {
				this.getEvaQuesList();
			}
		};
		$scope.evqQuesListFn.init();
	});