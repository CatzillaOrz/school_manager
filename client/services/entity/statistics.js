'use strict';

angular.module('dleduWebService')
    .factory('StatisticsService', function ($http, $q, $resource) {

        return {
            stuReport: function (params) {
                var statistics = $resource('api/statistics/stuReport');
                return statistics.save(params);
            },
            studentAttending: function (params) {
                var statistics = $resource('api/statistics/studentAttending');
                return statistics.save(params);
            },
            getAchievementList: function (params) {
                var statistics = $resource('api/statistics/getAchievementList');
                return statistics.save(params);
            },
            getImpartProcess: function (params) {
                var statistics = $resource('api/statistics/getImpartProcess');
                return statistics.save(params);
            },
            teachingSummary: function (params) {
                var statistics = $resource('api/statistics/teachingSummary');
                return statistics.save(params);
            },
            stuRoutineCount: function (params) {
                var statistics = $resource('api/statistics/stuRoutineCount');
                return statistics.save(params);
            },
            stuRoutineDetail: function (params) {
                var statistics = $resource('api/statistics/stuRoutineDetail');
                return statistics.save(params);
            },
            getStudentActive: function (params) {
                var statistics = $resource('api/statistics/getStudentActive');
                return statistics.save(params);
            },
            getStuProcess: function (params) {
                var statistics = $resource('api/statistics/getStuProcess');
                return statistics.save(params);
            },
            getStuJournal: function (params) {
                var statistics = $resource('api/statistics/getStuJournal');
                return statistics.save(params);
            },
            getEnterpriseDetail: function (params) {
                var statistics = $resource('api/statistics/getEnterpriseDetail');
                return statistics.save(params);
            },
            exportStuJournal: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuJournal",
					params: params
				});
            },
            exportEnterpriseDetail: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportEnterpriseDetail",
					params: params
				});
            },
            exportStuProcess: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuProcess",
					params: params
				});
            },
            exportStudentActive: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStudentActive",
					params: params
				});
            },
            exportStudentAttending: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStudentAttending",
					params: params
				});
            },
            exportStuReport: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuReport",
					params: params
				});
            },
            exportStuRoutineCount: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuRoutineCount",
					params: params
				});
            },
            exportStuRoutineDetail: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuRoutineDetail",
					params: params
				});
            },
            exportStuScore: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuScore",
					params: params
				});
            },
            exportImpartProcess: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportImpartProcess",
					params: params
				});
            },
            exportTeachingSummary: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportTeachingSummary",
					params: params
				});
            }
        }

    });