/**
 * Created by Administrator on 2017/6/21.
 * 教学督导查看详情
 */
angular.module('dleduWebApp')
	.controller('teachingSuperInfoCtrl', function ($scope, $state, AuthService, EduManService, RoleAuthService) {
		$scope.teachingSuperInfoFn = {
			id: 0,
			type: '',
			record: null,

			//控制按钮权限
			isUseAuth: function(type){
				return RoleAuthService.isUseAuthority(type);
			},

			// 获取详情
			getTeachingSupervisorInfo: function () {
				var that = this;
				var params = {
					id: that.id,
					type: this.type
				};
				EduManService.getTeachingSupervisorInfo(params).$promise
					.then(function (data) {
						that.record = data;
					})
					.catch(function (error) {

					})
			},

			init: function () {
				this.id = $state.params.id;
				this.type = $state.params.type;
				this.getTeachingSupervisorInfo();
			}
		};

		$scope.teachingSuperInfoFn.init();
	});