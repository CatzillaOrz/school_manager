'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('majorlist', {
                parent: 'base',
                url   : '/major/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MajorListCtrl',
                        templateUrl: 'app/module/major/majorList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '专业管理'
                }
            })
            .state('majorEdit', {
                parent: 'base',
                url   : '/majoredit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MajorHandleCtrl',
                        templateUrl: 'app/module/major/majorHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以修改专业',
                    completeMSG:'恭喜你，编辑专业成功！'
                },
                ncyBreadcrumb: {
                    label: '编辑专业信息'
                }
            })
            .state('majorCreat', {
                parent: 'base',
                url   : '/collegcreat',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MajorHandleCtrl',
                        templateUrl: 'app/module/major/majorHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以建立新的专业',
                    completeMSG:'恭喜你，新建专业成功！'
                },
                ncyBreadcrumb: {
                    label: '新建专业信息'
                }
            })
            .state('majorfinish', {
                parent: 'base',
                url   : '/major/finish/:handle',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MajorFinishCtrl',
                        templateUrl: 'app/module/major/majorHandleFinish.html'
                    }
                }
            })
    });
