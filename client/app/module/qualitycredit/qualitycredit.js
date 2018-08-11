'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('qualitycredit', {
                abstract: true,
                parent: 'base'
            })
            .state('qualitycreditlist', {
                parent: 'qualitycredit',
                url   : '/qualitycreditlist/:type',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'qualityCreditListCtrl',
                        templateUrl: 'app/module/qualitycredit/qualityCreditList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学生素质学分报表'
                }
            })
            .state('qualitycredithandle', {
                parent: 'qualitycreditlist',
                url   : '/qualitycredithandle/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'qualityCreditHandleCtrl',
                        templateUrl: 'app/module/qualitycredit/qualityCreditHandle.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '模板编辑'
                }
            })
    });
