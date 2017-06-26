/**
 * Created by Administrator on 2017/6/23.
 * 评教问卷新增，修改页面
 */
angular.module('dleduWebApp')
	.controller('EvaQuesModCtrl', function ($scope, $state, AuthService, EduManService) {
		$scope.evaQuesModFn={
			//问卷信息
			record: null,
			id: $state.params.id,
			params: {
				name: '',
				allScore: '',
				quesLists: []
			},
			question:{
				content: '',
				score: 0,
			},

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

			//保存题目
			saveQues: function(){

			},

			//保存文件
			submit: function(){

			},

			init: function () {
				if($state.params.id){
					this.getEvaQuesInfo($state.params.id);
				}
			}
		};
		$scope.evaQuesInfoFn.init();
	});