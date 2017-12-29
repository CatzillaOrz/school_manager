'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('payment', {
                parent: 'base',
                url   : '/payment',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'PaymentCtrl',
                        templateUrl: 'app/payment/payment.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '在线缴费'
                }
            })
    });