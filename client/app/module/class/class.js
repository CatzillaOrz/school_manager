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

    });
