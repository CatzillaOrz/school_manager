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
            }).state('paymentDetail', {
            parent: 'payment',
            url   : '/detail',
            access: {requiredLogin: false},
            params: {
                payment: null
            },
            views : {
                'content@base': {
                    controller : 'PaymentDetailCtrl',
                    templateUrl: 'app/payment/paymentDetail.html'
                }
            },
            ncyBreadcrumb: {
                label: '缴费科目详情'
            }
        })
    });