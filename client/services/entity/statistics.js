'use strict';

angular.module('dleduWebService')
    .factory('StatisticsService', function ($http, $q, $resource) {

        return {
            getStuProcess: function (params) {
                var statistics = $resource('api/statistics/getStuProcess');
                return statistics.save(params);
            },
            getStuJournal: function (params) {
                var statistics = $resource('api/statistics/getStuJournal');
                return statistics.save(params);
            }
        }

    });