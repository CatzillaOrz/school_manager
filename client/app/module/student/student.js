'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('studentlist', {
                parent: 'base',
                url   : '/student/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'StudentListCtrl',
                        templateUrl: 'app/module/student/studentList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学生管理'
                }
            })
            .state('studentEdit', {
                parent: 'base',
                url   : '/studentedit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'StudentHandleCtrl',
                        templateUrl: 'app/module/student/studentHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以修改学生',
                    completeMSG:'恭喜你，编辑学生成功！'
                },
                ncyBreadcrumb: {
                    label: '编辑学生信息'
                }
            })
            .state('studentCreat', {
                parent: 'base',
                url   : '/collegcreat',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'StudentHandleCtrl',
                        templateUrl: 'app/module/student/studentHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以建立新的学生',
                    completeMSG:'恭喜你，新建学生成功！'
                },
                ncyBreadcrumb: {
                    label: '新建学生信息'
                }
            })
            .state('studentfinish', {
                parent: 'base',
                url   : '/student/finish/:handle',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'StudentFinishCtrl',
                        templateUrl: 'app/module/student/studentHandleFinish.html'
                    }
                }
            })
    });
