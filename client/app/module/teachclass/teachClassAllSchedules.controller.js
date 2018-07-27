'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassAllSchedulesCtrl', function ($scope, $state, TeachClassService, AuthService, EduManService, messageService, CommonService,
	                                                    ngDialog, SchoolYearService) {
		var tId = $state.params.id;
		$scope.collegeId = $state.params.collegeId;
		$scope.name = $state.params.name;
		$scope.teachClassTableFn = {
			teachingTable: [],
			schoolYearDropList: [],
			types: ['总课表', '单周课表'],
			params: {
				semesterId: 0,
				teacherId: tId,
				weekId: 0
			},
			type: '总课表',
			isSingleOrAll: true, //true总课表

			switchType: function(){
				if(this.type == '总课表'){
					this.isSingleOrAll = true;
					this.getTeachingTable();
				}else{
					this.isSingleOrAll = false;
					this.getWeekList();
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

			getWeekList: function () {
				var that = this;
				var params = {semesterId: that.params.semesterId, pageSize: 40};
				SchoolYearService.getTeachWeekList(params).$promise
					.then(function (data) {
						that.weekDropList = data.data;
						that.params.weekId !== 0 && (that.getTeachingTableSingle());

					})
					.catch(function (error) {
						console.log(error)
					})
			},

			getCurrentSemesterWeek : function () {
				var that = this;
				SchoolYearService.getCurrentWeek().$promise
					.then(function (data) {
						that.params.weekId = data.id;
						that.getTeachingTableSingle();

					})
					.catch(function (error) {
						console.log(error)
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

			/**
			 * 按周查询
			 */
			getTeachingTableSingle: function () {
				var that = this;
				var params = {teacherId: that.params.teacherId, weekId: that.params.weekId};
				TeachClassService.getCourseSchedulesByTeacher(params).$promise
					.then(function (data) {
						that.teachingTableSingle = that.scanDataSingle(data.data);
					})
					.catch(function (error) {
						console.log(error)
					})
			},

			/**
			 * 按周查询
			 */
			scanDataSingle: function (entity) {
				var tr = [];
				entity = _.sortBy(entity, 'dayOfWeek');
				var count = 0;
				for (var i = 0; i < 13; i++) {
					var td = {
						courseList: new Array(7)
					};
					for (var j = 0; j < 7; j++) {
						angular.forEach(entity, function (list) {
							(list.courseList).forEach(function (cl) {
								if ((parseInt(list.dayOfWeek)) === j + 1 && cl.lessonOrderNum === i + 1) {
									td.courseList[j] = cl;
									count++;
								}
							})
						})
					}
					tr.push(td);
				}
				return tr;
			},

			//规整划数据变成可以循环的格式
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

			//计算数据的最大连续节
			calcPeriod:function(coursePlan){
				for(var i = 0, len = coursePlan.length; i < len; i++){
					var weekPlan = coursePlan[i].courseList;//每节课的一周的课表
					for(var j = 0, subLen = weekPlan.length; j < subLen; j++){
						var itemWeekPlan = weekPlan[j];
						var period = itemWeekPlan.details;//每节课对应的星期几的课表
						if(period){//当前时间必须有课
							var maxNum = 1, item;
							for(var m = 0, periodLen = period.length; m < periodLen; m++) {
								item = period[m]; //具体的课节课程
								if (item.periodNum > maxNum) {
									maxNum = item.periodNum;
								}
							}
							if (item && item.periodNum > 1) {
								//记录当前星期几
								var currentIndex = i, number = item.lastNum ? item.lastNum : item.periodNum;
								//修改连续值对应的后面课节
								for (var k = 0; k < number - 1; k++) {
									currentIndex++;
									//判断连续的课程节里面的课程是否有排课。如果有排课并且是单节的课程
									var coursePlanNext = angular.copy(coursePlan[currentIndex].courseList[j]);
									if(coursePlanNext != 1 || coursePlanNext != 0){//当前存在课程
										var periodObj = this.getMaxPeriod(coursePlanNext);
										var periodNumber = item.lastNum ? item.lastNum : item.periodNum;
										//循环判断当前课程的下一节课程连续节拼接后是否大于第一个连续节拼接后的连续值
										if((itemWeekPlan.periodNo + periodNumber) < (periodObj.periodNo + periodObj.periodNum)){
											item.lastNum = periodObj.periodNo + periodObj.periodNum - itemWeekPlan.periodNo;
											this.calcPeriod(coursePlan);//寻改值后，重寻计算
										}
									}
								}
							}
						}
					}
				}
			},

			//获取课程列表中连续课程节最多的课程
			getMaxPeriod: function(coursePlanNext){
				var period = {periodNum: 1, periodNo: 1}, details = coursePlanNext.details;
				if(details){
					for(var m = 0, len = details.length; m < len; m++) {
						var item = details[m];
						if (item.periodNum > period.periodNum) {
							period.periodNum = item.periodNum;
						}
					}
				}
				period.periodNo = coursePlanNext.periodNo;
				return period;
			},

			//处理连续节后的课节
			excPeriod: function(coursePlan){
				this.calcPeriod(coursePlan);//提前处理课程节出现交叉的课程节，将它们拼接后扩大连续节范围
				for(var i = 0, len = coursePlan.length; i < len; i++){
					var weekPlan = coursePlan[i].courseList;
					for(var j = 0, subLen = weekPlan.length; j < subLen; j++){
						var period = weekPlan[j].details;//从当前节开始的课程列表
						if(period){
							var maxNum = 1;
							for(var m = 0, periodLen = period.length; m < periodLen; m++) {
								var item = period[m];
								item.periodNo = weekPlan[j].periodNo;
								var periodNumItem = item.lastNum ? item.lastNum : item.periodNum;
								if(periodNumItem > maxNum){
									maxNum = periodNumItem;
								}
							}

							if (maxNum > 1) {
								//修改后面连续的值
								var currentIndex = i;
								for (var k = 0; k < maxNum - 1; k++) {
									currentIndex++;

									//判断连续的课程节里面的课程是否有排课。如果有排课并且是单节的课程
									var coursePlanNext = angular.copy(coursePlan[currentIndex].courseList[j]);
									if(coursePlanNext == 1){
										coursePlan[currentIndex].courseList[j] = 0;
									}else{//将包含的课程拼接到连续节的对象里面
										//循环将下面包含的连续节里面的课程全部添加到第一节里面
										if(coursePlanNext){//非0课节
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
			},

			//获取课程列表中连续课程节最多的课程
			getMaxPeriodNum: function(details){
				var periodNum = 1;
				if(details){
					for(var m = 0, len = details.length; m < len; m++) {
						var item = details[m];
						var periodNumber = item.lastNum ? item.lastNum : item.periodNum;
						if (periodNumber > periodNum) {
							periodNum = periodNumber;
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
					singleOrDouble = course.singleOrDouble  == 10 ? "每周上课": course.singleOrDouble  == 20 ? "单周上课" :"双周上课";
				return course.startWeekNo ? (weekStartEnd + periodStartEnd +singleOrDouble) : "";
			},

			init: function () {
				this.getCurrentSemesterWeek();
				this.getCurrentSemester();
			}
		};
		$scope.teachClassTableFn.init();
		$scope.$watch('teachClassTableFn.params.weekId', function (valOld, valNew) {
			if (valNew !== valOld) {
				$scope.teachClassTableFn.getTeachingTableSingle();
			}
		})
		$scope.$watch('teachClassTableFn.params.semesterId', function (valOld, valNew) {
			if (valNew != valOld) {
				if($scope.teachClassTableFn.type == '总课表'){
					$scope.teachClassTableFn.getTeachingTable();
				}else{
					$scope.teachClassTableFn.getWeekList();
				}
			}
		})
	});