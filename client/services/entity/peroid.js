/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('PeriodService', function ($http, $q,$resource) {

        return {
            getPeriodList: function (params) {
                var periodList = $resource('api/period/getPeriodList');
                return periodList.get(params);
            },
            addPeriod:function (params) {
                var period=$resource('api/period/addPeriod');
                return period.save(params);
            },
            deletePeriod:function (params) {
                var period=$resource('api/period/deletePeriod');
                return period.remove(params);
            },
            addCoursePeriod:function (params) {
                var period=$resource('api/period/addCoursePeriod');
                return period.save(params);
            },
            getCoursePeriodList: function (params) {
                var periodList = $resource('api/period/getCoursePeriodList');
                return periodList.get(params);
            },
            updatePeriod: function (params) {
                var period = $resource('api/period/updatePeriod','',{
                    update: {method:'PUT'}});
                return period.update(params);
            },
            addSemesterWeek:function (params) {
                var period=$resource('api/period/addSemesterWeek');
                return period.save(params);
            },
            getPeriodById: function (params) {
                var period = $resource('api/period/getPeriodById');
                return period.get(params);
            },
            getPeriodDropList: function (params) {
                var majorList = $resource('api/period/getPeriodDropList');
                return majorList.get(params);
            },
        }

    });