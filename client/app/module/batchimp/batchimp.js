'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('batch', {
                abstract: true,
                parent: 'base'
            })
            .state('batch.imp', {
                parent: 'batch',
                url   : '/batch/imp',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'BatchImpCtrl',
                        templateUrl: 'app/module/batchimp/batchimp.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '批量导入数据'
                }
            })
    });
