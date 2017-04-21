/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
	.factory('CourseService', function ($http, $q, $resource) {

		return {
			getCourseList: function (params) {
				var coursesList = $resource('api/course/getCourseList');
				return coursesList.get(params);
			},
			addCourse: function (params) {
				var addCourse = $resource('api/course/addCourse');
				return addCourse.save(params);
			},
			deleteCourse: function (params) {
				var deleteCourse = $resource('api/course/deleteCourse');
				return deleteCourse.remove(params);
			},
			updateCourse: function (params) {
				var updateCourse = $resource('api/course/updateCourse', '', {
					update: {method: 'PUT'}
				});
				return updateCourse.update(params);
			},
			getCourseById: function (params) {
				var getCourseById = $resource('api/course/getCourseById');
				return getCourseById.get(params);
			},
			getCourseDropListOrg: function (params) {
				var getCourseDropListOrg = $resource('api/course/getCourseDropListOrg');
				return getCourseDropListOrg.get(params);
			}
		}

	});