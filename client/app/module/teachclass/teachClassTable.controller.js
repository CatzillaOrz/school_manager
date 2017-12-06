'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassTableCtrl', function ($scope, $state, TeachClassService, AuthService, messageService, CommonService,
		Upload, UploadService, ImpBatchService, ngDialog,SchoolYearService, RoleAuthService) {
		var tId = $state.params.tId;
		var sId = $state.params.sId;
		$scope.teachClassTableFn = {
			teachingTable: [],
			weekDropList : [],
			params : {
				tParams : {
					teacherId: tId,
					weekId: 0
				},
				wParams : {
					semesterId: sId,
                    pageSize:40,
				}
			},
			getWeekList : function () {
				var that = this;
                SchoolYearService.getTeachWeekList(that.params.wParams).$promise
                    .then(function (data) {
						that.weekDropList = data.data;
						that.params.tParams.weekId = data.data[0].id
						that.getTeachingTable();

                    })
                    .catch(function (error) {
						console.log(error)
				})
			},
			getTeachingTable: function () {
				var that = this;
				TeachClassService.getCourseSchedulesByTeacher(that.params.tParams).$promise
					.then(function (data) {
						that.teachingTable = that.scanData(data.data);
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
						if(entity[j]){
							(entity[j].courseList).forEach(function (cl) {
								if ((parseInt(cl.dayOfWeek)) === j + 1 && cl.lessonOrderNum === i + 1) {
									td.courseList[j] = cl;
								}
							})
						}
					}
					tr.push(td);
				}
				return tr;
			},
			init: function () {
				this.getWeekList();
			}
		};
		$scope.teachClassTableFn.init();
		$scope.$watch('teachClassTableFn.params.tParams.weekId', function(valOld, valNew){
			if(valNew){
				$scope.teachClassTableFn.getTeachingTable();
			}
		})
	});