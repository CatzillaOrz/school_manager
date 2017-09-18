'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rolemanager', {
                abstract: true,
                parent: 'base'
            })
            .state('distlist', {
                parent: 'base',
                url   : '/distlist',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'DistListCtrl',
                        templateUrl: 'app/module/rolemanager/distList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '角色分配'
                }
            })
            .state('distedlist', {
                parent: 'base',
                url   : '/distedlist',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'DistedListCtrl',
                        templateUrl: 'app/module/rolemanager/distedList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '已分配列表'
                }
            })

    });
