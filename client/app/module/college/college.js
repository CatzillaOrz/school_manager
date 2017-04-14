'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('college', {
                abstract: true,
                parent: 'base'
            })
            .state('college.list', {
                parent: 'college',
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
            .state('college.edit', {
                parent: 'college',
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
            .state('college.creat', {
                parent: 'college',
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
    });
