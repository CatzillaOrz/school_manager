/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('StudentService', function ($http, $q,$resource) {

        return {
            getStudentList: function (params) {
                var studentList = $resource('api/student/getStudentList');
                return studentList.get(params);
            },
            addStudent:function (params) {
                var student=$resource('api/student/addStudent');
                return student.save(params);
            },
            deleteStudent:function (params) {
                var student=$resource('api/student/deleteStudent');
                return student.remove(params);
            },
            updateStudent: function (params) {
                var student = $resource('api/student/updateStudent','',{
                    update: {method:'PUT'}});
                return student.update(params);
            },
            getStudentById: function (params) {
                var student = $resource('api/student/getStudentById');
                return student.get(params);
            },
            getSimpleStudents: function (params) {
                var student = $resource('api/student/getSimpleStudents');
                return student.get(params);
            },
            updateStudentToClasses: function (params) {
                var student = $resource('api/student/updateStudentToClasses','',{
                    update: {method:'PUT'}});
                return student.update(params);
            },
            getImpResult: function (params) {
                var student = $resource('api/student/getImpResult');
                return student.get(params);
            },
        }
    });