/**
 * Created by lxy on 16/9/2.
 */
'use strict';

angular.module('dleduWebAppDianDian', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'dleduWebAppComponents',
    'dlDirectives',
    'dleduWebService',
    'pascalprecht.translate',
    'LocalStorageModule',
    'ngDialog'
])
      .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {
          $urlRouterProvider
                .otherwise('/diandian');
          $stateProvider
                .state('base', {
                    abstract: true,
                    data:{
                        roles: []
                    },
                    views:{
                        'navbar@':{
                            templateUrl: 'components/navbar/navbar.html',
                            controller: 'NavbarCtrl'
                        },
                        'siginin@':{
                            templateUrl: 'components/signin/signinmodel.html',
                            controller: 'signinmodelCtrl'
                        },
                        'footer@':{
                            templateUrl: 'components/footer/footer_terse.html',
                            controller: 'FooterCtrl'
                        }
                    }
                });
          $locationProvider.html5Mode(true);
          $translateProvider.useCookieStorage();
      });
