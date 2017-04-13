'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('collegelist', {
                parent: 'base',
                url   : '/college/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CollegeListCtrl',
                        templateUrl: 'app/module/college/collegeList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '院系管理'
                }
            })
            .state('collegeEdit', {
                parent: 'base',
                url   : '/collegedit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CollegeHandleCtrl',
                        templateUrl: 'app/module/college/collegeHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以修改院系',
                    completeMSG:'恭喜你，编辑院系成功！'
                },
                ncyBreadcrumb: {
                    label: '编辑院系信息'
                }
            })
            .state('collegeCreat', {
                parent: 'base',
                url   : '/collegecreate',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CollegeHandleCtrl',
                        templateUrl: 'app/module/college/collegeHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以建立新的院系',
                    completeMSG:'恭喜你，新建院系成功！'
                },
                ncyBreadcrumb: {
                    label: '新建院系信息'
                }
            })
            .state('collegefinish', {
                parent: 'base',
                url   : '/college/finish/:handle',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CollegeFinishCtrl',
                        templateUrl: 'app/module/college/collegeHandleFinish.html'
                    }
                }
            })
    });
