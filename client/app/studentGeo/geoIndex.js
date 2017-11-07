'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('geo', {
                abstract: true,
                parent: 'base'
        })
        .state('geodetail', {
            url   : '/geo/detail',
            access: {requiredLogin: false},
            views : {
                'root': {
                    controller : 'studentGeoCtl',
                    templateUrl: 'app/studentGeo/studentGeo.html'
                }
            },
        }).state('geohome', {
            parent: 'geo',
            url   : '/geo/home',
            access: {requiredLogin: false},
            views : {
                'content@base': {
                    controller : 'geoHomeCtl',
                    templateUrl: 'app/studentGeo/geoHome.html'
                }
            },
            ncyBreadcrumb: {
                label: '实时监控展示'
            }
        })
    });
