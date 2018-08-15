/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('PracticeManService', function ($http, $q,$resource) {

        return {
            defineProperty: function (entity) {
                var that = this;
                return {
                    bar: {},
                    get: function () {
                        return that.bar;
                    },
                    set: function () {
                        entity && (that.bar = entity);
                        !entity && (that.bar = {});
                    }
                }
            },
            getEntTutorList: function (params) {
                var practiceman = $resource('api/practiceman/getEntTutorList');
                return practiceman.get(params);
            },
            saveEnterprise: function (params) {
                var practiceman = $resource('api/practiceman/saveEnterprise');
                return practiceman.save(params);
            },
            updateEnterprise: function (params) {
                var practiceman = $resource('api/practiceman/updateEnterprise');
                return practiceman.save(params);
            },
            getIssuedWeekTaskList: function (params) {
                var practiceman = $resource('api/practiceman/getIssuedWeekTaskList');
                return practiceman.save(params);
            },
            getEnterpriseList: function (params) {
                var practiceman = $resource('api/practiceman/getEnterpriseList');
                return practiceman.get(params);
            },
            getEntTutorInfo: function (params) {
                var practiceman = $resource('api/practiceman/getEntTutorInfo');
                return practiceman.get(params);
            },
            getStudentTaskDetail: function (params) {
                var practiceman = $resource('api/practiceman/getStudentTaskDetail');
                return practiceman.get(params);
            },
            getIssuedGroupList: function (params) {
                var practiceman = $resource('api/practiceman/getIssuedGroupList');
                return practiceman.get(params);
            },
            addEntTutor: function (params) {
                var practiceman = $resource('api/practiceman/addEntTutor');
                return practiceman.save(params);
            },
            delEntTutor:function (params) {
                var practiceman = $resource('api/practiceman/delEntTutor');
                return practiceman.remove(params);
            },
            delEnterprise:function (params) {
                var practiceman = $resource('api/practiceman/delEnterprise');
                return practiceman.remove(params);
            },
            updateEntTutor: function (params) {
                var practiceman = $resource('api/practiceman/updateEntTutor','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            getPracticeGroupList: function (params) {
                var practiceman = $resource('api/practiceman/getPracticeGroupList');
                return practiceman.get(params);
            },
            getPracticeGroupInfo: function (params) {
                var practiceman = $resource('api/practiceman/getPracticeGroupInfo');
                return practiceman.get(params);
            },
            addPracticeGroup: function (params) {
                var practiceman = $resource('api/practiceman/addPracticeGroup');
                return practiceman.save(params);
            },
            getMissionList: function (params) {
                var practiceman = $resource('api/practiceman/getMissionList');
                return practiceman.save(params);
            },
            getMissionDetail: function (params) {
                var practiceman = $resource('api/practiceman/getMissionDetail');
                return practiceman.save(params);
            },
            addPracticeTask: function (params) {
                var practiceman = $resource('api/practiceman/addPracticeTask');
                return practiceman.save(params);
            },
            updatePracticeGroup: function (params) {
                var practiceman = $resource('api/practiceman/updatePracticeGroup','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            updatePracticeTask: function (params) {
                var practiceman = $resource('api/practiceman/updatePracticeTask','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            editTaskTime: function (params) {
                var practiceman = $resource('api/practiceman/editTaskTime','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            checkAllStu: function (params) {
                var practiceman = $resource('api/practiceman/checkAllStu','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            delPracticeGroup:function (params) {
                var practiceman = $resource('api/practiceman/delPracticeGroup');
                return practiceman.remove(params);
            },
            delPracticeGroupByGId:function (params) {
                var practiceman = $resource('api/practiceman/delPracticeGroupByGId');
                return practiceman.remove(params);
            },
            isExistInGroup:function (params) {
                var practiceman = $resource('api/practiceman/isExistInGroup');
                return practiceman.get(params);
            },
            getPeopleStats: function (params) {
                var practiceman = $resource('api/practiceman/getPeopleStats');
                return practiceman.save(params);
            },
            getTaskStats: function (params) {
                var practiceman = $resource('api/practiceman/getTaskStats');
                return practiceman.save(params);
            },
            getPeopleDetail: function (params) {
                var practiceman = $resource('api/practiceman/getPeopleDetail');
                return practiceman.save(params);
            },
            exportPeople: function (params) {
                return $http({
                    method: 'GET',
                    url: "api/practiceman/exportPeople",
                    params: params
                });
            },
            exportPeopleStats: function (params) {
                return $http({
                    method: 'GET',
                    url: "api/practiceman/exportPeopleStats",
                    params: params
                });
            },
            exportTaskStats: function (params) {
                return $http({
                    method: 'GET',
                    url: "api/practiceman/exportTaskStats",
                    params: params
                });
            },
            getWeekTaskList: function (params) {
                var practiceman = $resource('api/practiceman/getWeekTaskList');
                return practiceman.get(params);
            },
            getTaskList: function (params) {
                var practiceman = $resource('api/practiceman/getTaskList');
                return practiceman.get(params);
            },
            putWeekTask: function (params) {
                var practiceman = $resource('api/practiceman/putWeekTask','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            updateTask: function (params) {
                var practiceman = $resource('api/practiceman/updateTask','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            getWeekTaskDetail: function (params) {
                var practiceman = $resource('api/practiceman/getWeekTaskDetail');
                return practiceman.get(params);
            },
            getTaskDetail: function (params) {
                var practiceman = $resource('api/practiceman/getTaskDetail');
                return practiceman.get(params);
            },
            deleteWeekTask: function (params) {
                var practiceman = $resource('api/practiceman/deleteWeekTask');
                return practiceman.remove(params);
            },
            deleteTask: function (params) {
                var practiceman = $resource('api/practiceman/deleteTask');
                return practiceman.remove(params);
            },
            deleteTaskDetail: function (params) {
                var practiceman = $resource('api/practiceman/deleteTaskDetail');
                return practiceman.save(params);
            },
            addWeekTask: function (params) {
                var practiceman = $resource('api/practiceman/addWeekTask');
                return practiceman.save(params);
            },
            addTask: function (params) {
                var practiceman = $resource('api/practiceman/addTask');
                return practiceman.save(params);
            },
            getGrouplistByOrgId: function (params) {
                var practiceman = $resource('api/practiceman/getGrouplistByOrgId');
                return practiceman.query(params);
            }
        }

    });