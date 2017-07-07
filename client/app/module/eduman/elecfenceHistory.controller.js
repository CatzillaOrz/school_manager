/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('ElecFenceHistroyCtrl', function ($scope, AuthService, EduManService) {
		$scope.evaFenceFn={
			//问卷信息
			records: [],

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
					orgId: AuthService.getUser().orgId
				};
				EduManService.getElecFenceHistory(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},


			init: function () {
				this.getElecFenceHistory();
			}
		};
		$scope.evaFenceFn.init();
	});