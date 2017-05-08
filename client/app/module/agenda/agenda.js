'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('class', {
                abstract: true,
                parent: 'base'
            })
            .state('classlist', {
                parent: 'class',
                url   : '/class/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassListCtrl',
                        templateUrl: 'app/module/class/classList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '班级管理'
                }
            })
            .state('classEdit', {
                parent: 'class',
                url   : '/classedit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassHandleCtrl',
                        templateUrl: 'app/module/class/classHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以修改班级',
                    completeMSG:'恭喜你，编辑班级成功！'
                },
                ncyBreadcrumb: {
                    label: '编辑班级信息'
                }
            })
            .state('classCreat', {
                parent: 'class',
                url   : '/classcreate',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassHandleCtrl',
                        templateUrl: 'app/module/class/classHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以建立新的班级',
                    completeMSG:'恭喜你，新建班级成功！'
                },
                ncyBreadcrumb: {
                    label: '新建班级信息'
                }
            })
            .state('classDetail', {
                parent: 'class',
                url   : '/classdetail/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassDetailCtrl',
                        templateUrl: 'app/module/class/classDetail.html'
                    }
                },

                ncyBreadcrumb: {
                    label: '班级详情'
                }
            })
            .state('classTeacher', {
                parent: 'class',
                url   : '/classteacher/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassTeacherCtrl',
                        templateUrl: 'app/module/class/classTeacher.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以建立新的班级',
                    completeMSG:'恭喜你，新建班级成功！'
                },
                ncyBreadcrumb: {
                    label: '班级详情'
                }
            })
            .state('importStudent', {
                parent: 'class',
                url   : '/importstudent/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ImportStudentCtrl',
                        templateUrl: 'app/module/class/importStudent.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以建立新的班级',
                    completeMSG:'恭喜你，新建班级成功！'
                },
                ncyBreadcrumb: {
                    label: '班级详情'
                }
            })
    });
