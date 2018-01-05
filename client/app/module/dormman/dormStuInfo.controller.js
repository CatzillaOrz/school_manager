/**
 * Created by Administrator on 2017/6/22.
 * 宿舍学生明细
 */
angular.module('dleduWebApp')
	.controller('DormStuInfoCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService) {
		$scope.dormStuInfo = {
			//获取宿舍学生明细
			getDormStus: function () {
				var that = this;
				var params = {};
				params.roomId  = $state.params.id;
				DormManService.getDormStus(params).$promise
					.then(function (data) {
						if(data.result){
							that.records = data.data;
						}else{
							messageService.openMsg("查询失败！");
						}
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