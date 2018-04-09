/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('practiceman', {
				abstract: true,
				parent: 'base'
			})
			.state('enttutorman', {
				parent: 'base',
				url   : '/entTutorMan',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EntTutorManCtrl',
						templateUrl: 'app/module/practiceman/entTutorMan.html'
					}
				},
				ncyBreadcrumb: {
					label: '企业导师管理'
				}
			})
			.state('editenttutor', {
				parent: 'base',
				url   : '/editEntTutor/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EidtEntTutorCtrl',
						templateUrl: 'app/module/practiceman/editEntTutor.html'
					}
				},
				ncyBreadcrumb: {
					label: '编辑企业导师'
				}
			})
			.state('practicegroupman', {
				parent: 'base',
				url   : '/practiceGroupMan',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'PracticeGroupManCtrl',
						templateUrl: 'app/module/practiceman/practiceGroupMan.html'
					}
				},
				ncyBreadcrumb: {
					label: '实践小组管理'
				}
			})
			.state('createpracticegroup', {
				parent: 'base',
				url   : '/createPracticeGroup/:id/:tutorId',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'CreatePracticeGroupCtrl',
						templateUrl: 'app/module/practiceman/createPracticeGroup.html'
					}
				},
				data:{
					prompt:'填写以下信息以修改院系',
					completeMSG:'恭喜你，编辑院系成功！'
				},
				ncyBreadcrumb: {
					label: '创建实践小组'
				}
			})
			.state('practicemanstats', {
				parent: 'base',
				url   : '/practiceManStats',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'PracticeManStatsCtrl',
						templateUrl: 'app/module/practiceman/practiceManStats.html'
					}
				},
				ncyBreadcrumb: {
					label: '实践统计'
				}
			})
			.state('practicepeople', {
				parent: 'practicemanstats',
				url   : '/practicePeople/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'PracticePeopleCtrl',
						templateUrl: 'app/module/practiceman/practicePeople.html'
					}
				},
				ncyBreadcrumb: {
					label: '班级实践详情'
				}
			})
            .state('practicetasklist', {
                parent: 'base',
                url   : '/practiceTasklist/:wid',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'PracticeTasklistCtrl',
                        templateUrl: 'app/module/practiceman/practiceTasklist.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践任务'
                }
            })
            .state('createpracticetask', {
                parent: 'base',
                url   : '/createPracticeTask/:id/:wid',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CreatePracticeTaskCtrl',
                        templateUrl: 'app/module/practiceman/createPracticeTask.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以编辑院系',
                    completeMSG:'恭喜你，编辑成功！'
                },
                ncyBreadcrumb: {
                    label: '编辑实践任务'
                }
            })
            .state('trainClassList', {
                parent: 'base',
                url   : '/trainClassList',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TrainClassListCtrl',
                        templateUrl: 'app/module/practiceman/trainClassList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践课程任务列表'
                }
            })
            .state('trainClassEdit', {
                parent: 'base',
                url   : '/trainClassEdit',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TrainClassEditCtrl',
                        templateUrl: 'app/module/practiceman/trainClassEdit.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践课程编辑'
                }
            })
            .state('missionManagement', {
                parent: 'base',
                url   : '/missionManagement/:status/:wid',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MissionManagementCtrl',
                        templateUrl: 'app/module/practiceman/missionManagement.html'
                    }
				},
				data:{
					prompt:'请按以下步骤完成任务分配',
					completeMSG:'恭喜你，分配任务成功！'
				},
                ncyBreadcrumb: {
                    label: '任务分配'
                }
            })
            .state('missionList', {
                parent: 'base',
                url   : '/missionList',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MissionListCtrl',
                        templateUrl: 'app/module/practiceman/missionList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践任务详情'
                }
            })
            .state('enterpriseList', {
                parent: 'base',
                url   : '/enterpriseList',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'enterpriseListCtrl',
                        templateUrl: 'app/module/practiceman/enterpriseList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践企业管理'
                }
            })
            .state('missionDetail', {
                parent: 'base',
                url   : '/missionDetail/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MissionDetailCtrl',
                        templateUrl: 'app/module/practiceman/missionDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践任务详情'
                }
            })
            .state('studentTaskDetail', {
                parent: 'base',
                url   : '/studentTaskDetail/:id/:mId',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'StudentTaskDetailCtrl',
                        templateUrl: 'app/module/practiceman/studentTaskDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践任务详情'
                }
            })
            .state('enterpriseEdit', {
                parent: 'base',
                url   : '/enterpriseEdit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'enterpriseEditCtrl',
                        templateUrl: 'app/module/practiceman/enterpriseEdit.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践企业管理'
                }
            })
	});
