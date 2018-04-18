/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('EvaQuesShowTeaCtrl', function ($scope, $state, AuthService, EduManService) {
		$scope.evaQuesInfoFn={
			//问卷信息
			record: null,
			id: $state.params.id,

			// 获取评教问卷信息
			getEvaQuesInfo: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: that.id
				};
				EduManService.getEvaQuesInfo(params).$promise
					.then(function (data) {
						that.record = data;
					})
					.catch(function (error) {

					})
			},


			init: function () {
				this.getEvaQuesInfo();
			}
		};
		$scope.evaQuesInfoFn.init();
	});