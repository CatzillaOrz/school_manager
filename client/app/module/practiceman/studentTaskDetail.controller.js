/**
 * Created by Administrator on 2017/6/22.
 * 实践小组管理
 */
angular.module('dleduWebApp')
	.controller('StudentTaskDetailCtrl', function ($scope, $state, AuthService, EduManService, messageService, CommonService,
		PracticeManService) {
		$scope.stdFn = {
			stDetail: null,
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			mId: $state.params.mId,

			// 获取详情
			getStd: function () {
				var that = this;
				var params = {
					id: $state.params.id
				};
				PracticeManService.getStudentTaskDetail(params).$promise
					.then(function (data) {
						that.stDetail = data;
					})
					.catch(function (error) {

					})
			},


			init: function () {
				this.getStd();
			}
		};
		$scope.stdFn.init();
	});