/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
	.factory('TeachClassService', function ($http, $q, $resource) {

		return {
			getTeachClassList: function (params) {
				var teachClassList = $resource('api/teachclass/getTeachClassList');
				return teachClassList.get(params);
			},
			addTeachClass: function (params) {
				var addTeachClass = $resource('api/teachclass/addTeachClass');
				return addTeachClass.save(params);
			},
			deleteTeachClass: function (params) {
				var deleteTeachClass = $resource('api/teachclass/deleteTeachClass');
				return deleteTeachClass.remove(params);
			},
			updateTeachClass: function (params) {
				var updateTeachClass = $resource('api/teachclass/updateTeachClass', '', {
					update: {method: 'PUT'} 
				});
				return updateTeachClass.update(params);
			},
			getTeachClassById: function (params) {
				var getTeachClassById = $resource('api/teachclass/getTeachClassById');
				return getTeachClassById.get(params);
			},
			getTeachClassDropListOrg: function (params) {
				var getTeachClassDropListOrg = $resource('api/teachclass/getTeachClassDropListOrg');
				return getTeachClassDropListOrg.get(params);
			},
            getTeachClassTeacherList: function (params) {
                var list = $resource('api/teachclass/getTeachClassTeacherList');
                return list.get(params);
            },
            getTeachClassStudentList: function (params) {
                var list = $resource('api/teachclass/getTeachClassStudentList');
                return list.get(params);
            },
            deleteTeachClassTeacher: function (params) {
                var deleteTeachClass = $resource('api/teachclass/deleteTeachClassTeacher');
                return deleteTeachClass.remove(params);
            },
            deleteTeachClassAllStudent: function (params) {
                var deleteTeachClass = $resource('api/teachclass/deleteTeachClassStudent');
                return deleteTeachClass.remove(params);
            },
            deleteTeachClassOneStudent: function (params) {
                var deleteTeachClass = $resource('api/teachclass/deleteTeachClassOneStudent');
                return deleteTeachClass.remove(params);
            },
            getTeachClassClassesListById: function (params) {
                var getTeachClassById = $resource('api/teachclass/getTeachClassClassesListById');
                return getTeachClassById.get(params);
            },
            addTeachClassClasses: function (params) {
                var addTeachClass = $resource('api/teachclass/addTeachClassClasses');
                return addTeachClass.save(params);
            },
            deleteTeachClassClasses: function (params) {
                var deleteTeachClass = $resource('api/teachclass/deleteTeachClassClasses');
                return deleteTeachClass.remove(params);
            },
            addTeachClassTeacher: function (params) {
                var addTeachClass = $resource('api/teachclass/addTeachClassTeacher');
                return addTeachClass.save(params);
            },
            addTeachClassStudent: function (params) {
                var addTeachClass = $resource('api/teachclass/addTeachClassStudent');
                return addTeachClass.save(params);
            },
            getTeachClassClassesList: function (params) {
                var list = $resource('api/teachclass/getTeachClassClassesList');
                return list.get(params);
            },
            getCourseSchedule: function (params) {
                var courseSchedule = $resource('api/teachclass/getCourseSchedule');
                return courseSchedule.get(params);
            },
            saveCourseSchedule: function (params) {
                var courseSchedule = $resource('api/teachclass/saveCourseSchedule');
                return courseSchedule.save(params);
            },
            delCourseSchedule: function (params) {
                var courseSchedule = $resource('api/teachclass/delCourseSchedule');
                return courseSchedule.remove(params);
            },
            getCourseSchedules:function(params){
                var courseSchedules = $resource('api/teachclass/getCourseSchedules', '', {
                    update: {method: 'PUT', isArray: true}
                });
                return courseSchedules.update(params);
            },
            saveCourseSchedules: function (params) {
                var courseSchedule = $resource('api/teachclass/saveCourseSchedules');
                return courseSchedule.save(params);
            }
		}

	});