'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassTableCtrl', function ($scope, $state, TeachClassService, AuthService, messageService, CommonService,
		Upload, UploadService, ImpBatchService, ngDialog,SchoolYearService, EduManService, RoleAuthService) {
		var tId = $state.params.tId;
		$scope.teachClassTableFn = {
			teachingTable: [],
			weekDropList : [],
			schoolYearDropList : [],			
			params : {
				tParams : {
					teacherId: tId,
					weekId: 0
				},
				wParams : {
					semesterId: 0,
                    pageSize:40
				}
			},
			select2SemesterOptions: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '按学期筛选'
                    },
                    allowClear: true,
                    ajax: {
                        url: "api/schoolyear/getSchoolYearDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                            }
                            params.name = query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            _this.schoolYearDropList = _this.select2GroupFormat(data.data);
                            return {
                                results: _this.schoolYearDropList,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: false
                    },

                }
			},
			//学期下拉列表分组数据格式化
            select2GroupFormat: function (dataList) {
                var result = []
                angular.forEach(dataList, function (data) {
                    var obj = {
                        text: data.name,
                        children: []
                    };
                    angular.forEach(data.semesterIdNameList, function (semester) {
                        var objChild = {
                            id: semester.id,
                            text: semester.name
                        };
                        obj.children.push(objChild);
                    })
                    result.push(obj);
                })
                return result;
            },
			getCurrentSemester: function () {
                var that = this;
                var _params = {
                    orgId: AuthService.getUser().orgId
                };
                EduManService.getCurrentSemester(_params).$promise
                    .then(function (data) {
                        var obj = {
                            text: data.yearName,
                            children: [
                                {
                                    id:data.id,
                                    text:data.name
                                }
                            ]
                        };
						that.params.wParams.semesterId = data.id;
						that.schoolYearDropList = [obj];
						that.getWeekList();


                    })
                    .catch(function (error) {

                    })
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
				this.getCurrentSemester();
			}
		};
		$scope.teachClassTableFn.init();
		$scope.$watch('teachClassTableFn.params.tParams.weekId', function(valOld, valNew){
			if(valNew!==valOld){
				$scope.teachClassTableFn.getTeachingTable();
			}
		})
		$scope.$watch('teachClassTableFn.params.wParams.semesterId', function(valOld, valNew){
			if(valNew!==valOld){
				$scope.teachClassTableFn.getWeekList();
			}
		})
	});