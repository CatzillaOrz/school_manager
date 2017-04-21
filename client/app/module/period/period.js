'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('period', {
                abstract: true,
                parent: 'base'
            })
            .state('periodlist', {
                parent: 'period',
                url   : '/period/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'PeriodListCtrl',
                        templateUrl: 'app/module/period/periodList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学时管理'
                }
            })
            .state('periodCreate', {
                parent: 'period',
                url   : '/period/create',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'PeriodHandlerCtrl',
                        templateUrl: 'app/module/period/periodHandler.html'
                    }
                },
                data:{
                    prompt:'新建学期',
                    completeMSG:'恭喜你，新建学期成功！'
                },
                ncyBreadcrumb: {
                    label: '学时管理'
                }
            })

    });
