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
		}

	});