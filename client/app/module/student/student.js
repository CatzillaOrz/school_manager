'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('student', {
                abstract: true,
                parent: 'base'
            })
            .state('studentlist', {
                parent: 'student',
                url   : '/student/list/:collegeId/:professionalId',
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
                parent: 'student',
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
                parent: 'student',
                url   : '/studentcreate',
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
            .state('newstudent', {
                parent: 'studentlist',
                url   : '/newstudent',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'NewStudentCtrl',
                        templateUrl: 'app/module/student/newStudentList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '新生导入'
                }
            })

    });
