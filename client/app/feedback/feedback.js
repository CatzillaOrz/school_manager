'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('feedback', {
                abstract: true,
                parent: 'base'
            })
            .state('feedbackhome', {
                parent: 'feedback',
                url   : '/feedback/home',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'feedbackCtl',
                        templateUrl: 'app/feedback/feedback.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '问题反馈列表'
                }
            })
            .state('feedbackdetail', {
                parent: 'feedback',
                url   : '/feedback/detail/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'feedbackDetailCtl',
                        templateUrl: 'app/feedback/feedbackDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '问题反馈详情'
                }
            })
        });
