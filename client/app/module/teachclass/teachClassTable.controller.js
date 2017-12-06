'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassTableCtrl', function ($scope, $state, TeachClassService, AuthService, messageService, CommonService,
		Upload, UploadService, ImpBatchService, ngDialog, RoleAuthService) {
		$scope.teachClassTableFn = {
			teachingTable: [],
			// cacheAllWeekTableSchedule : [],
			getTeachingTable: function () {
				var that = this;
				var params = {
					teacherId: 161361,
					weekId: 710
				};
				TeachClassService.getCourseSchedulesByTeacher(params).$promise
					.then(function (data) {
						// that.teachingTable = data.data;
						that.teachingTable = that.scanData(data.data);
						console.log(that.teachingTable);
					})
					.catch(function (error) {
						console.log(error)
					})
			},
			scanData: function (entity) {
				var tr = [];
				for (var i = 0; i < 13; i++) {
					var td = {
						courseList: new Array(7)
					};
					for (var j = 0; j < 7; j++) {
						(entity[j].courseList).forEach(function (cl) {
							if ((parseInt(cl.dayOfWeek)) === j + 1 && cl.lessonOrderNum === i + 1) {
								td.courseList[j] = cl;
							}
						})
					}
					tr.push(td);
				}
				return tr;
			},
			init: function () {
				this.getTeachingTable();
			}
		};
		$scope.teachClassTableFn.init();
	});