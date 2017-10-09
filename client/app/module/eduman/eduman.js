/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('eduman', {
				abstract: true,
				parent: 'base'
			})
			.state('attendlist', {
				parent: 'base',
				url   : '/attendlist',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'AttendListCtrl',
						templateUrl: 'app/module/eduman/attendlist.html'
					}
				},
				ncyBreadcrumb: {
					label: '考勤记录'
				}
			})
            .state('attenddetail', {
                parent: 'attendlist',
                url   : '/attenddetail/:id/:classes',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'AttendDetailCtrl',
                        templateUrl: 'app/module/eduman/attendDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '考勤详情'
                },
				data:{
                	teacherName:""
				}
            })
			.state('coursescore', {
				parent: 'base',
				url   : '/coursescore',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'CourseScoreCtrl',
						templateUrl: 'app/module/eduman/coursescore.html'
					}
				},
				ncyBreadcrumb: {
					label: '课程评分'
				}
			})
            .state('coursescoredetail', {
                parent: 'coursescore',
                url   : '/coursescoredetail?teachingClassId&averageScore',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CourseScoreDetailCtrl',
                        templateUrl: 'app/module/eduman/courseCoreDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '课程评分详情'
                }
            })
            .state('coursesingle', {
                parent: 'coursescoredetail',
                url   : '/coursesingle?scheduleId',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CourseSingleDetailCtrl',
                        templateUrl: 'app/module/eduman/courseSingle.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '单节课程评分详情'
                }
            })


			.state('evaquestion', {
				parent: 'base',
				url   : '/evaquestion',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuestionCtrl',
						templateUrl: 'app/module/eduman/evaquestion.html'
					}
				},
				ncyBreadcrumb: {
					label: '评教问卷'
				}
			})
			.state('evaquesshow', {
				parent: 'evaquestion',
				url   : '/evaquesshow/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesShowCtrl',
						templateUrl: 'app/module/eduman/evaquesshow.html'
					}
				},
				ncyBreadcrumb: {
					label: '评教问卷详情'
				}
			})
			.state('distributelist', {
				parent: 'evaquestion',
				url   : '/distributelist/:quesId/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'DistributeListCtrl',
						templateUrl: 'app/module/eduman/distributelist.html'
					}
				},
				ncyBreadcrumb: {
					label: '评教问卷分配页面'
				}
			})
			.state('evaquestatic', {
				parent: 'distributelist',
				url   : '/evaquestatic/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQueStaticCtrl',
						templateUrl: 'app/module/eduman/evaquestatic.html'
					}
				},
				ncyBreadcrumb: {
					label: '评教统计'
				}
			})
			.state('evaquesadd', {
				parent: 'evaquestion',
				url   : '/evaquesadd',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesModCtrl',
						templateUrl: 'app/module/eduman/evaquesmod.html'
					}
				},
				ncyBreadcrumb: {
					label: '新增评教问卷'
				}
			})
			.state('evaquesedit', {
				parent: 'evaquestion',
				url   : '/evaquesedit/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesModCtrl',
						templateUrl: 'app/module/eduman/evaquesmod.html'
					}
				},
				ncyBreadcrumb: {
					label: '编辑评教问卷'
				}
			})
			.state('elecfence', {
				parent: 'base',
				url   : '/elecfence',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'ElecFenceCtrl',
						templateUrl: 'app/module/eduman/elecfence.html'
					}
				},
				ncyBreadcrumb: {
					label: '电子围栏'
				}
			})
            .state('teachClassTrend', {
                parent: 'attendlist',
                url   : '/teachclasstrend/:id/:semesterId',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachClassTrendCtr',
                        templateUrl: 'app/module/eduman/teachClassTrend.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '考勤趋势详情'
                },
                data:{
                    teacherName:""
                }
            })
            .state('elecfencecurrent', {
				parent: 'elecfence',
				url   : '/elecfencecurrent/:id/:date',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'ElecFenceCurrentCtrl',
						templateUrl: 'app/module/eduman/elecfenceCurrent.html'
					}
				},
				ncyBreadcrumb: {
					label: '当天轨迹'
				}
			})
			.state('elecfencehistory', {
				parent: 'elecfence',
				url   : '/elecfencehistory/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'ElecFenceHistroyCtrl',
						templateUrl: 'app/module/eduman/elecfenceHistory.html'
					}
				},
				ncyBreadcrumb: {
					label: '学生历史记录'
				}
			})
			.state('elecfencecurrentinfo', {
				parent: 'elecfencehistory',
				url   : '/elecfencecurrent/:id/:date',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'ElecFenceCurrentCtrl',
						templateUrl: 'app/module/eduman/elecfenceCurrent.html'
					}
				},
				ncyBreadcrumb: {
					label: '当天轨迹'
				}
			})
			.state('elecfencecreate', {
				parent: 'elecfence',
				url   : '/elecfencecreate',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'ElecFenceCreateCtrl',
						templateUrl: 'app/module/eduman/elecfenceCreate.html'
					}
				},
				ncyBreadcrumb: {
					label: '电子围栏设置'
				}
			})
			.state('elecfencemapset', {
				parent: 'elecfence',
				url   : '/elecfencemapset',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'ElecFenceMapEditCtrl',
						templateUrl: 'app/module/eduman/elecfenceMapEdit.html'
					}
				},
				ncyBreadcrumb: {
					label: '电子围栏设置'
				}
			})
            .state('classTrend', {
                parent: 'attendlist',
                url   : '/classTrend',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassTrendCtr',
                        templateUrl: 'app/module/eduman/classTrend.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '考勤趋势详情'
                },
                data:{
                    teacherName:""
                }
            })
            .state('attendStudent', {
                parent: 'attendlist',
                url   : '/attendstudent/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'AttendStudentCtr',
                        templateUrl: 'app/module/eduman/attendStudent.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '考勤趋势详情'
                },
                data:{
                    teacherName:""
                }
            })

		//
	});
