/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('SchoolYearService', function ($http, $q,$resource) {

        return {
            getSchoolYearList: function (params) {
                var schoolyearList = $resource('api/schoolyear/getSchoolYearList');
                return schoolyearList.get(params);
            },
            addSchoolYear:function (params) {
                var schoolyear=$resource('api/schoolyear/addSchoolYear');
                return schoolyear.save(params);
            },
            deleteSchoolYear:function (params) {
                var schoolyear=$resource('api/schoolyear/deleteSchoolYear');
                return schoolyear.remove(params);
            },
            addPeriod:function (params) {
                var schoolyear=$resource('api/schoolyear/addPeriod');
                return schoolyear.save(params);
            },
            getPeriodList: function (params) {
                var schoolyearList = $resource('api/schoolyear/getPeriodList');
                return schoolyearList.get(params);
            },
            updatePeriod: function (params) {
                var schoolyear = $resource('api/schoolyear/updatePeriod','',{
                    update: {method:'PUT'}});
                return schoolyear.update(params);
            },
            getPeriodById: function (params) {
                var schoolyear = $resource('api/schoolyear/getPeriodById');
                return schoolyear.get(params);
            },
            deletePeriod:function (params) {
                var schoolyear=$resource('api/schoolyear/deletePeriod');
                return schoolyear.remove(params);
            },
            updateSchoolYear: function (params) {
                var schoolyear = $resource('api/schoolyear/updateSchoolYear','',{
                    update: {method:'PUT'}});
                return schoolyear.update(params);
            },
            addSemesterWeek:function (params) {
                var schoolyear=$resource('api/schoolyear/addSemesterWeek');
                return schoolyear.save(params);
            },
            getSchoolYearById: function (params) {
                var schoolyear = $resource('api/schoolyear/getSchoolYearById');
                return schoolyear.get(params);
            },
            getSchoolYearDropList: function (params) {
                var schoolyear = $resource('api/schoolyear/getSchoolYearDropList');
                return schoolyear.get(params);
            },
            getTeachWeekList: function (params) {
                var schoolyear = $resource('api/schoolyear/getTeachWeekList');
                return schoolyear.get(params);
            },
            getSemesterList: function (params) {
                var semesterList = $resource('api/schoolyear/getSemesterList');
                return semesterList.get(params);
            }

        }

    });