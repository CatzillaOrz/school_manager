/**
 * Created by wangjun on 2016/11/23.
 * 素质学分
 */
'use strict';

angular.module('dleduWebService')
	.factory('QualityCreditService', function ($http, $q, $resource) {

		return {
			getQualityCreditReportList: function (params) {
				var qualitycredit = $resource('api/qualitycredit/getQualityCreditReportList');
				return qualitycredit.get(params);
			},

			getQualityCreditTemList: function (params) {
				var qualitycredit = $resource('api/qualitycredit/getQualityCreditTemList');
				return qualitycredit.get(params);
			},

			getTemplateById: function (params) {
				var qualitycredit = $resource('api/qualitycredit/getTemplateById');
				return qualitycredit.get(params);
			},

			addTemplate: function (params) {
				var qualitycredit = $resource('api/qualitycredit/addTemplate');
				return qualitycredit.save(params);
			},
			delTemplate: function (params) {
				var qualitycredit = $resource('api/qualitycredit/delTemplate');
				return qualitycredit.remove(params);
			},
			updateTemplate: function (params) {
				var qualitycredit = $resource('api/qualitycredit/updateTemplate', '', {
					update: {method: 'PUT'}
				});
				return qualitycredit.update(params);
			},
			exportCourse: function (params) {
				return $http({
					method: 'GET',
					url: "api/course/exportCourse",
					params: params
				});
			},
			exportReport: function (params) {
				var qualitycredit = $resource('api/qualitycredit/exportReport');
				return qualitycredit.get(params);
			},
			exportReportById: function (params) {
				var qualitycredit = $resource('api/qualitycredit/exportReportById');
				return qualitycredit.get(params);
			}
		}

	});