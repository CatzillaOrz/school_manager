
/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('SchoolService', function ($http, $q,$resource) {

        return {
            addLogo: function (params) {
                var schoolLogo = $resource('api/school/addLogo');
                return schoolLogo.save(params);
            },
            getLogoList:function (params) {
                var schoolLogo = $resource('api/school/getLogoList');
                return schoolLogo.get(params);
            },
            addShuffImage:function (params) {
                var shuffImage=$resource('api/school/addShuffImage');
                return shuffImage.save(params);
            },
            getShuffImageList:function (params) {
                var shuffImage = $resource('api/school/getShuffImageList');
                return shuffImage.get(params);
            },
            deleteShuffImage:function (params) {
                var shuffImage=$resource('api/school/deleteShuffImage');
                return shuffImage.remove(params);
            },
            updateShuffImage: function (params) {
                var shuffImage = $resource('api/school/updateShuffImage', '', {
                    update: {method: 'PUT'}
                });
                return shuffImage.update(params);
            },
            addSchoolInfo:function (params) {
                var schoolInfo=$resource('api/school/addSchoolInfo');
                return schoolInfo.save(params);
            },
            getSchoolInfo:function (params) {
                var schoolInfo = $resource('api/school/getSchoolInfo');
                return schoolInfo.get(params);
            },
            addHotMajor:function (params) {
                var hotMajor=$resource('api/school/addHotMajor');
                return hotMajor.save(params);
            },
            getHotMajorList:function (params) {
                var hotMajor = $resource('api/school/getHotMajor');
                return hotMajor.get(params);
            },
            updateHotMajor: function (params) {
                var hotMajor = $resource('api/school/updateHotMajor', '', {
                    update: {method: 'PUT'}
                });
                return hotMajor.update(params);
            },
            deleteHotMajor:function (params) {
                var hotMajor=$resource('api/school/deleteHotMajor');
                return hotMajor.remove(params);
            },
            addExcellentTeacher:function (params) {
                var excellentTeacher=$resource('api/school/addExcellentTeacher');
                return excellentTeacher.save(params);
            },
            getExcellentTeacherList:function (params) {
                var excellentTeacher = $resource('api/school/getExcellentTeacherList');
                return excellentTeacher.get(params);
            },
            updateExcellentTeacher: function (params) {
                var excellentTeacher = $resource('api/school/updateExcellentTeacher', '', {
                    update: {method: 'PUT'}
                });
                return excellentTeacher.update(params);
            },
            deleteExcellentTeacher:function (params) {
                var excellentTeacher=$resource('api/school/deleteExcellentTeacher');
                return excellentTeacher.remove(params);
            },
            ///
            addBoutiqueCourse:function (params) {
                var boutiqueCourse=$resource('api/school/addBoutiqueCourse');
                return boutiqueCourse.save(params);
            },
            getBoutiqueCourseList:function (params) {
                var boutiqueCourse = $resource('api/school/getBoutiqueCourseList');
                return boutiqueCourse.get(params);
            },
            updateBoutiqueCourse: function (params) {
                var boutiqueCourse = $resource('api/school/updateBoutiqueCourse', '', {
                    update: {method: 'PUT'}
                });
                return boutiqueCourse.update(params);
            },
            deleteBoutiqueCourse:function (params) {
                var boutiqueCourse=$resource('api/school/deleteBoutiqueCourse');
                return boutiqueCourse.remove(params);
            },
            getSchoolByDomain:function (params) {
                var school = $resource('api/school/getSchoolByDomain');
                return school.get(params);
            },
            getBoutiqueCourseDropList:function (params) {
                var boutiqueCourse = $resource('api/school/getBoutiqueCourseDropList');
                return boutiqueCourse.get(params);
            },
        }

    });