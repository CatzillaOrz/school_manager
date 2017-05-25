'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('indexnav', {
               // url   : '/',
                abstract: true,
                access: {requiredLogin: false},
                views : {
                    root: {
                        controller : 'IndexCtrl',
                        templateUrl: 'app/index/indexNav.html'
                    }
                },

            })
            .state('index', {
                url   : '/',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'IndexCtrl',
                        templateUrl: 'app/index/index.html'
                    }
                },

            })
            .state('boutique', {
                url   : '/boutique',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'BoutiqueCourseCtrl',
                        templateUrl: 'app/index/boutiqueCourse.html'
                    }
                },

            })
            .state('overview', {
                url   : '/overview',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'overViewCtrl',
                        templateUrl: 'app/index/overView.html'
                    }
                },

            })

    });
