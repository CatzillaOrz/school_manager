/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('TeacherService', function ($http, $q,$resource) {

        return {
            getTeacherList: function (params) {
                var teacheresList = $resource('api/teacher/getTeacherList');
                return teacheresList.get(params);
            },
            addTeacher:function (params) {
                var teacheres=$resource('api/teacher/addTeacher');
                return teacheres.save(params);
            },
            deleteTeacher:function (params) {
                var teacheres=$resource('api/teacher/deleteTeacher');
                return teacheres.remove(params);
            },
            updateTeacher: function (params) {
                var teacheres = $resource('api/teacher/updateTeacher','',{
                    update: {method:'PUT'}});
                return teacheres.update(params);
            },
            getTeacherById: function (params) {
                var teacheres = $resource('api/teacher/getTeacherById');
                return teacheres.get(params);
            },
        }

    });