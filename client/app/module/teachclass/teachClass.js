'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('teachclass', {
				abstract: true,
				parent: 'base'
			})
			.state('teachclasslist', {
				parent: 'teachclass',
				url: '/teachclass/list',
				access: {requiredLogin: true},
				views: {
					'content@base': {
						controller: 'TeachClassListCtrl',
						templateUrl: 'app/module/teachclass/teachClassList.html'
					}
				},
				ncyBreadcrumb: {
					label: '教学班管理'
				}
			})
			.state('teachClassCreat', {
				parent: 'teachclass',
				url: '/teachclasscreate',
				access: {requiredLogin: true},
				views: {
					'content@base': {
						controller: 'TeachClassAddCtrl',
						templateUrl: 'app/module/teachclass/teachClassAdd.html'
					}
				},
				data: {
					prompt: '选择学期与课程',
					completeMSG: '恭喜你，新建教学班成功！'
				},
				ncyBreadcrumb: {
					label: '新建教学班'
				}
			})
            .state('teachClassDetail', {
                parent: 'teachclass',
                url: '/teachclass/detail/:id',
                access: {requiredLogin: true},
                views: {
                    'content@base': {
                        controller: 'TeachClassDetailCtrl',
                        templateUrl: 'app/module/teachclass/teachClassDetail.html'
                    }
                },
                data: {
                    prompt: '选择学期与课程',
                    completeMSG: '恭喜你，新建教学班成功！'
                },
                ncyBreadcrumb: {
                    label: '教学班详情'
                }
            })
            .state('teachClassUpdate', {
                parent: 'teachclass',
                url: '/teachclass/update/:id',
                access: {requiredLogin: true},
                views: {
                    'content@base': {
                        controller: 'TeachClassUpdateCtrl',
                        templateUrl: 'app/module/teachclass/teachClassUpdate.html'
                    }
                },
                data: {
                    prompt: '选择学期与课程',
                    completeMSG: '恭喜你，新建教学班成功！'
                },
                ncyBreadcrumb: {
                    label: '教学班详情'
                }
            })
            .state('teachClassTeacherUpdate', {
                parent: 'teachclass',
                url: '/teachclass/updateteacher/:id',
                access: {requiredLogin: true},
                views: {
                    'content@base': {
                        controller: 'TeachClassTeacherUpdateCtrl',
                        templateUrl: 'app/module/teachclass/teachClassUpdateTeacher.html'
                    }
                },
                data: {
                    prompt: '选择学期与课程',
                    completeMSG: '恭喜你，新建教学班成功！'
                },
                ncyBreadcrumb: {
                    label: '教学班详情'
                }
            })
            .state('teachClassStudentUpdate', {
                parent: 'teachclass',
                url: '/teachclass/updatestudent/:id',
                access: {requiredLogin: true},
                views: {
                    'content@base': {
                        controller: 'TeachClassStudentUpdateCtrl',
                        templateUrl: 'app/module/teachclass/teachClassUpdateStudent.html'
                    }
                },
                data: {
                    prompt: '选择学期与课程',
                    completeMSG: '恭喜你，新建教学班成功！'
                },
                ncyBreadcrumb: {
                    label: '教学班详情'
                }
            })
            .state('teachClassClassesUpdate', {
                parent: 'teachclass',
                url: '/teachclass/updateclasses/:id',
                access: {requiredLogin: true},
                views: {
                    'content@base': {
                        controller: 'TeachClassClassesUpdateCtrl',
                        templateUrl: 'app/module/teachclass/teachClassUpdateClasses.html'
                    }
                },
                data: {
                    prompt: '选择学期与课程',
                    completeMSG: '恭喜你，新建教学班成功！'
                },
                ncyBreadcrumb: {
                    label: '教学班详情'
                }
            })
			/*.state('courseEdit', {
				parent: 'course',
				url: '/courseedit/:id',
				access: {requiredLogin: true},
				views: {
					'content@base': {
						controller: 'courseHandleCtrl',
						templateUrl: 'app/module/course/courseHandle.html'
					}
				},
				data: {
					prompt: '填写以下信息以修改课程',
					completeMSG: '恭喜你，编辑课程成功！'
				},
				ncyBreadcrumb: {
					label: '编辑课程信息'
				}
			})*/

	});