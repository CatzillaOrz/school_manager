/**
 * Created by Administrator on 2017/6/23.
 */
angular.module('dleduWebApp')
	.controller('EvaQueStaticCtrl', function ($scope, $state, AuthService, EduManService) {
		$scope.evaQueStaticFn = {
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

			switchType: function(type){
				if(type == 'uncomplete'){
					this.getEvaQuesUnDist();
				}else{
					this.getEvaQuesDist();
				}
			},

			// 获取评教问卷已分配列表
			getEvaQuesDist: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},


			// 获取评教问卷未分配列表
			getEvaQuesUnDist: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesUnDist(params).$promise
					.then(function (data) {
						that.records = data.data;
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
				//params.name = that.params.name;
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
				this.getEvaQuesUnDist();
			}
		};
		$scope.evaQueStaticFn.init();
	});