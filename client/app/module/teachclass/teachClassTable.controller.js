/**
 * 教学班管理列表
 */
'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassTableCtrl', function ($scope, $state, TeachClassService, AuthService, messageService, CommonService,
		Upload, UploadService, ImpBatchService, ngDialog, RoleAuthService) {
		$scope.teachClassTableFn = {
			// 获取教学班列表
			teachingTable: [],
			getTeachingTable: function () {
				var that = this;
				var params = {
					teacherId: 161361,
					weekId: 710
				};
				TeachClassService.getCourseSchedulesByTeacher(params).$promise
					.then(function (data) {
						that.teachingTable = data;
						console.log(data)
					})
					.catch(function (error) {
						console.log(error)
					})
			},
			init: function () {
				this.getTeachingTable();
			}
		};
		$scope.teachClassTableFn.init();
	});