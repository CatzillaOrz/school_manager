/**
 * Created by Administrator on 2017/6/22.
 * 宿舍学生明细
 */
angular.module('dleduWebApp')
	.controller('DormStuInfoCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService) {
		$scope.dormStuInfo = {
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//获取宿舍学生明细
			getDormStus: function () {
				var that = this;
				var params = {};
				params.pageNumber = this.page.pageNumber;
				params.pageSize = this.page.pageSize;
				params.roomId  = $state.params.id;
				DormManService.getDormStus(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {
						messageService.openMsg("查询异常！");
					})
			},

			init: function () {
				this.getDormStus($state.params.id);
			}
		};
		$scope.dormStuInfo.init();
	});