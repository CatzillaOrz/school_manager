'use strict';

angular.module('dleduWebService')
    .factory('DdService', function($http) {
        return {
            getAttendanceStu: function (params) {
                return $http({
                    method: 'GET',
                    url: '/api/userCenter/dd/getAttendanceStu',
                    params: params
                });
            },
            getAttendanceTea: function (params) {
                return $http({
                    method: 'GET',
                    url: '/api/userCenter/dd/getAttendanceTea',
                    params: params
                });
            }
        };
    });
