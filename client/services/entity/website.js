'use strict';

angular.module('dleduWebService')
    .factory('WebsiteService', function($http, localStorageService) {
        return {
            get: function() {
                return $http({
                    method: 'GET',
                    url: '/api/website/find'

                });
            }
        };
    });
