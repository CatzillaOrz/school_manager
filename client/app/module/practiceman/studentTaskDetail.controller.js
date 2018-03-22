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

			// 获取详情
			getStd: function () {
				var that = this;
				var params = {
					id: $state.params.id
				};
				PracticeManService.getStudentTaskDetail(params).$promise
					.then(function (data) {
						that.stDetail = data;
						var temp = {
							"stuTaskId": "129ccb33-6092-40b3-b7a9-ed6a884c8977",
							"taskId": "61ef4c37-37a8-49dc-841d-a53f2fd14335",
							"reviewTaskId": null,
							"weekTaskName": "自由范课程",
							"taskName": "范任务N02",
							"description": "范银河系",
							"deadLine": "2018-03-29",
							"beginDate": "2018-03-22",
							"stuTaskStatus": "uncommit",
							"taskScore": null,
							"taskAdvice": null,
							"classHour": 12,
							"taskFileList": [],
							"stuFileList": [],
							"reviewFileList": []
						}
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