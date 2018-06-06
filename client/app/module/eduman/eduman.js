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
					label: '学生评教'
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
					label: '学生评教详情'
				}
			})
			.state('distributelist', {
				parent: 'evaquestion',
				url   : '/distributelist/:quesId/:id/:type',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'DistributeListCtrl',
						templateUrl: 'app/module/eduman/distributelist.html'
					}
				},
				ncyBreadcrumb: {
					label: '学生评教分配页面'
				}
			})
			.state('evaquestatic', {
				parent: 'evaquestion',
				url   : '/evaquestatic/:type/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQueStaticCtrl',
						templateUrl: 'app/module/eduman/evaquestatic.html'
					}
				},
				ncyBreadcrumb: {
					label: '学生评教统计'
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
					label: '新增学生评教问卷'
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
					label: '编辑学生评教问卷'
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
            .state('instructor', {
                parent: 'base',
                url   : '/instructor',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'instructorAttendCtrl',
                        templateUrl: 'app/module/eduman/instructorAttend.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '导员考勤'
                }
            })
            .state('teachingData', {
                parent: 'base',
                url   : '/teachingData',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'teachingDataCtrl',
                        templateUrl: 'app/module/eduman/teachingData.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '教学数据'
                }
            })
			.state('teachingSupervisor', {
				parent: 'base',
				url   : '/teachingsupervisor/:tab',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'teachingSupervisorCtrl',
						templateUrl: 'app/module/eduman/teachingSupervisor.html'
					}
				},
				ncyBreadcrumb: {
					label: '教学督导'
				}
			})
			.state('teachingSuperInfo', {
				parent: 'teachingSupervisor',
				url   : '/teachingsuperinfo/:id/:type',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'teachingSuperInfoCtrl',
						templateUrl: 'app/module/eduman/teachingSuperInfo.html'
					}
				},
				ncyBreadcrumb: {
					label: '反馈详情'
				}
			})
			.state('teachingSuperTemplate', {
				parent: 'teachingSupervisor',
				url   : '/teachingsupertemplate/:type',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'teachingSuperTemplateCtrl',
						templateUrl: 'app/module/eduman/teachingSuperTemplate.html'
					}
				},
				ncyBreadcrumb: {
					label: '反馈模板'
				}
			})


			.state('evaquestiontea', {
				parent: 'base',
				url   : '/evaquestiontea',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuestionTeaCtrl',
						templateUrl: 'app/module/eduman/evaquestiontea.html'
					}
				},
				ncyBreadcrumb: {
					label: '教师评学'
				}
			})
			.state('evaquesshowtea', {
				parent: 'evaquestiontea',
				url   : '/evaquesshowtea/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesShowTeaCtrl',
						templateUrl: 'app/module/eduman/evaquesshowtea.html'
					}
				},
				ncyBreadcrumb: {
					label: '教师评学详情'
				}
			})
			.state('teadistributelist', {
				parent: 'evaquestiontea',
				url   : '/teadistributelist/:quesId/:id/:type',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'TeaDistributeListCtrl',
						templateUrl: 'app/module/eduman/teadistributelist.html'
					}
				},
				ncyBreadcrumb: {
					label: '教师评学分配页面'
				}
			})
			.state('evaquestatictea', {
				parent: 'evaquestiontea',
				url   : '/evaquestatictea/:type/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQueStaticTeaCtrl',
						templateUrl: 'app/module/eduman/evaquestatictea.html'
					}
				},
				ncyBreadcrumb: {
					label: '教师评学统计'
				}
			})
			.state('evaquesaddtea', {
				parent: 'evaquestiontea',
				url   : '/evaquesaddtea',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesModTeaCtrl',
						templateUrl: 'app/module/eduman/evaquesmodtea.html'
					}
				},
				ncyBreadcrumb: {
					label: '新增教师评学问卷'
				}
			})
			.state('evaquesteaedit', {
				parent: 'evaquestiontea',
				url   : '/evaquesteaedit/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesModTeaCtrl',
						templateUrl: 'app/module/eduman/evaquesmodtea.html'
					}
				},
				ncyBreadcrumb: {
					label: '编辑教师评学问卷'
				}
			})

			.state('evaquesamepart', {
				parent: 'base',
				url   : '/evaquesamepart',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQueSamePartCtrl',
						templateUrl: 'app/module/eduman/evaquesamepart.html'
					}
				},
				ncyBreadcrumb: {
					label: '教师/督导同行评教'
				}
			})
			.state('evaquesaddsamepart', {
				parent: 'evaquesamepart',
				url   : '/evaquesaddsamepart',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesModSamePartCtrl',
						templateUrl: 'app/module/eduman/evaquesmodsamepart.html'
					}
				},
				ncyBreadcrumb: {
					label: '新增教师/督导同行问卷'
				}
			})
			.state('evaqueseditsamepart', {
				parent: 'evaquesamepart',
				url   : '/evaqueseditsamepart/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesModSamePartCtrl',
						templateUrl: 'app/module/eduman/evaquesmodsamepart.html'
					}
				},
				ncyBreadcrumb: {
					label: '编辑教师/督导同行问卷'
				}
			})
			.state('samepartdistriblist', {
				parent: 'evaquesamepart',
				url   : '/samepartdistriblist/:quesId/:id/:type',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'SamePartDistribListCtrl',
						templateUrl: 'app/module/eduman/samepartdistributelist.html'
					}
				},
				ncyBreadcrumb: {
					label: '同行评教分配页面'
				}
			})
			.state('evaquestaticsamepart', {
				parent: 'evaquesamepart',
				url   : '/evaquestaticsamepart/:type/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQueStaticSamePartCtrl',
						templateUrl: 'app/module/eduman/evaquestaticsamepart.html'
					}
				},
				ncyBreadcrumb: {
					label: '同行评教统计'
				}
			})
	});
