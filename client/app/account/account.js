'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url   : '/login',
                access: {requiredLogin: false},
                // parent: 'base',
                views : {
                    'root': {
                        templateUrl: 'app/account/signin.html',
                        controller : 'SignInCtrl'
                    }
                }
                /*
                 views : {
                    root: {
                        templateUrl: 'app/account/signin.html',
                        controller: 'SignInCtrl'
                    }
                }*/
            })
            .state('forgotpassword', {
                parent: 'base',
                url   : '/account/forgotpassword?setup&code',
                access: {requiredLogin: false},
                views : {
                    'content@base': {
                        templateUrl: 'app/account/forgotpassword.html',
                        controller : 'ForgotPasswordCtrl'
                    }
                }
            })
            .state('validemail', {
                parent: 'base',
                url   : '/account/validemail?setup&code',
                access: {requiredLogin: false},
                views : {
                    'content@base': {
                        templateUrl: 'app/account/validemail.html',
                        controller : 'VarifyEmailCtrl'
                    }
                }
            })
            .state('useraccount', {
                parent: 'base',
                url   : '/account/useraccount',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        // controller : 'UserAccountCtrl',
                        templateUrl: 'app/account/userAccount.html'
                    }
                }
            })
    });
