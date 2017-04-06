'use strict';
angular.module('dleduWebAppDianDian')
      .config(function ($stateProvider, $urlRouterProvider) {
          $stateProvider
                .state('diandian', {
                    parent: 'base',
                    url: '/diandian',
                    views: {
                        'content@':{
                            templateUrl: 'app/dd/dd.html',
                            controller: 'DianDianCtrl'
                        }
                    }
                })
          $urlRouterProvider.when('/diandian', '/diandian/')
      });
