/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('ClassService', function ($http, $q,$resource) {

        return {
            getClassList: function (params) {
                var classesList = $resource('api/class/getClassList');
                return classesList.get(params);
            },
            addClass:function (params) {
                var classes=$resource('api/class/addClass');
                return classes.save(params);
            },
            deleteClass:function (params) {
                var classes=$resource('api/class/deleteClass');
                return classes.remove(params);
            },
            updateClass: function (params) {
                var classes = $resource('api/class/updateClass','',{
                    update: {method:'PUT'}});
                return classes.update(params);
            },
            getClassById: function (params) {
                var classes = $resource('api/class/getClassById');
                return classes.get(params);
            },
            getClassDropList: function (params) {
                var classes = $resource('api/class/geClassDropList');
                return classes.get(params);
            },
            saveClassTeacher:function (params) {
                var classes=$resource('api/class/saveClassTeacher');
                return classes.save(params);
            },
            getClassTeacherList: function (params) {
                var classesList = $resource('api/class/getClassTeacherList');
                return classesList.get(params);
            },
            getInstructorList: function (params) {
                var classesList = $resource('api/class/getInstructorList');
                return classesList.get(params);
            },
            deleteClassTeacher:function (params) {
                var classes=$resource('api/class/deleteClassTeacher');
                return classes.remove(params);
            },
            getClassDropListOrg: function (params) {
                var classes = $resource('api/class/getClassDropListOrg');
                return classes.get(params);
            },
            exportClass: function (params) {
                return $http({
                    method: 'GET',
                    url: "api/class/exportClass",
                    params: params
                });
            },
        }

    });