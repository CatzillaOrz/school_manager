/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('ElecFenceHistroyCtrl', function ($scope, $stateParams, AuthService, EduManService) {
		$scope.evaFenceFn={
			//当天轨迹信息
			records: [],
			//参数
			params: {
				id: $stateParams.id
			},
			//分页
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},


			// 获取电子围栏信息列表
			getElecFenceHistory: function () {
				var that = this;
				var params = {
					organId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.userId = that.params.id;
				EduManService.getElecFenceHistory(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			getTimetamp: function(date){
				return new Date(date).getTime();
			},

			init: function () {
				var that = this;
				that.getElecFenceHistory();
			}
		};
		$scope.evaFenceFn.init();
	});

