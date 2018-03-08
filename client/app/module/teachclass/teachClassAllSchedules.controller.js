'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassAllSchedulesCtrl', function ($scope, $state, TeachClassService, AuthService, EduManService, messageService, CommonService,
	                                                    ngDialog, SchoolYearService) {
		var tId = $state.params.id;

		$scope.teachClassTableFn = {
			teachingTable: [],
			schoolYearDropList: [],
			params: {
				semesterId: 0,
				teacherId: tId,
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
						url: "api/schoolyear/getSemesterList",
						dataType: 'json',
						//delay: 250,
						data: function (query) {
							var params = {
								orgId: AuthService.getUser().orgId,
								pageNumber: 1,
								pageSize: 10000,
							}
							params.name = query.term;
							return params;
						},
						processResults: function (data, params) {
							params.page = params.page || 1;
							return {
								results: data.data,
								pagination: {
									more: (params.page * 30) < data.total_count
								}
							};
						},
						cache: false
					},
					templateResult: function (data) {
						if (data.id === '') { // adjust for custom placeholder values
							return 'Custom styled placeholder text';
						}
						_this.schoolYearDropList.push(data);
						return data.name;
					}

				}
			},

			getCurrentSemester: function () {
				var that = this;
				var _params = {
					orgId: AuthService.getUser().orgId
				};
				EduManService.getCurrentSemester(_params).$promise
					.then(function (data) {
						that.params.semesterId = data.id;
						that.schoolYearDropList = [data];
					})
					.catch(function (error) {

					})
			},

			/**
			 * 获取教师排课信息
			 */
			getTeachingTable: function () {
				var that = this;
				TeachClassService.getAllCourseSchedulesByTea(that.params).$promise
					.then(function (data) {
						that.teachingTable = that.scanData(data.data);
					})
					.catch(function (error) {
						console.log(error)
					})
			},

			scanData: function (entity) {
				var tr = [];
				entity = _.sortBy(entity, 'dayOfWeek');
				var count = 0;
				for (var i = 0; i < 13; i++) {
					var td = {
						courseList: [1,1,1,1,1,1,1]
					};
					for (var j = 0; j < 7; j++) {
						angular.forEach(entity, function (list) {
							(list.peroidList).forEach(function (cl) {
								if ((parseInt(list.dayOfWeek)) === j + 1 && cl.periodNo === i + 1) {
									td.courseList[j] = cl;
									count++;
								}
							})
						})
					}
					tr.push(td);
				}
				this.excPeriod(tr);
				return tr;
			},

			//处理连续节后的课节
			excPeriod: function(coursePlan){
				for(var i = 0, len = coursePlan.length; i < len; i++){
					var weekPlan = coursePlan[i].courseList;
					for(var j = 0, subLen = weekPlan.length; j < subLen; j++){
						var period = weekPlan[j].details;//从当前节开始的课程列表
						if(period){
							for(var m = 0, periodLen = period.length; m < periodLen; m++) {
								var item = period[m];
								item.periodNo =  weekPlan[j].periodNo;
								if (item.periodNum > 1) {
									//item.periodNum = 3;
									//修改后面连续的值
									var currentIndex = i;
									for (var k = 0; k < item.periodNum - 1; k++) {
										currentIndex++;
										//判断连续的课程节里面的课程是否有排课。如果有排课并且是单节的课程
										var coursePlanNext = angular.copy(coursePlan[currentIndex].courseList[j]);

										if(coursePlanNext == 1){
											coursePlan[currentIndex].courseList[j] = 0;
										}else{//将包含的课程拼接到连续节的对象里面
											//循环处理课表里面包含的数据
											if(coursePlanNext){//下一个值为单节课时直接添加
												for(var n = 0, planLen = coursePlanNext.details.length; n < planLen; n++){
													var detail = coursePlanNext.details[n];
													detail.periodNo = coursePlanNext.periodNo;
													//循环处理
													period.push(detail);

												}
												coursePlan[currentIndex].courseList[j] = 0;
											}
										}
									}
								}
							}
						}
					}
				}
			},

			//获取课程列表中连续课程节最多的课程
			getMaxPeriodNum: function(details){
				var periodNum = 0;
				if(details){
					for(var m = 0, len = details.length; m < len; m++) {
						var item = details[m];
						if (item.periodNum > periodNum) {
							periodNum = item.periodNum;
						}
					}
				}
				return periodNum;
			},

			//上课信息
			formatCourseInfo: function(list, course){
				var weekStartEnd = course.startWeekNo+"到"+course.endWeekNo+"周、",
					periodStartEnd = course.periodNum > 1 ? ("第" + course.periodNo + "节到" + "" + (course.periodNo + course.periodNum - 1) + "节、")
						:  "第" + course.periodNo + "节、",
					singleOrDouble = course.singleOrDouble  ==10 ? "单周上课":"双周上课";
				return course.startWeekNo ? (weekStartEnd + periodStartEnd +singleOrDouble) : "";
			},

			init: function () {
				this.getCurrentSemester();
			}
		};
		$scope.teachClassTableFn.init();
		$scope.$watch('teachClassTableFn.params.semesterId', function (valOld, valNew) {
			if (valNew != valOld) {
				$scope.teachClassTableFn.getTeachingTable();
			}
		})
	});