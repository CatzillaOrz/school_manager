/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebService')
	.factory('EduManService', function ($http, $q, $resource) {

		return {
			getEvaQuesList: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesList');
				return eduman.get(params);
			},

			getEvaQuesInfo: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesInfo');
				return eduman.get(params);
			},

			addEvaQues:function (params) {
				var eduman = $resource('api/eduman/addEvaQues');
				return eduman.save(params);
			},

			deleteEvaQues:function (params) {
				var eduman = $resource('api/eduman/deleteEvaQues');
				return eduman.remove(params);
			},

			updateEvaQues: function (params) {
				var eduman = $resource('api/eduman/updateEvaQues','',{
					update: {method:'PUT'}});
				return eduman.update(params);
			},

			getEvaQuesDist: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesDist');
				return eduman.get(params);
			},

			getEvaQuesUnDist: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesUnDist');
				return eduman.get(params);
			},

			getEvaQuesNormalStatic: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesNormalStatic');
				return eduman.get(params);
			},

			getEvaQuesStaticInfo: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesStaticInfo');
				return eduman.get(params);
			},

			getEvaQuesUnNormalStatic: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesUnNormalStatic');
				return eduman.get(params);
			},

			getEvaQuesResult: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesResult');
				return eduman.get(params);
			},

			distQuestionaire:function (params) {
				var eduman = $resource('api/eduman/distQuestionaire');
				return eduman.save(params);
			},

            getTeachClassAttendList: function (params) {
                var eduman = $resource('api/eduman/getTeachClassAttendList');
                return eduman.get(params);
            },
            getClassAttendList: function (params) {
                var eduman = $resource('api/eduman/getClassAttendList');
                return eduman.get(params);
            },
            getStudentAttendByTeachClassId: function (params) {
                var eduman = $resource('api/eduman/getStudentAttendByTeachClassId');
                return eduman.get(params);
            },
            //通过行政班级查询学生考勤
            getStudentAttendByClassId: function (params) {
                var eduman = $resource('api/eduman/getStudentAttendByClassId');
                return eduman.get(params);
            },
		}

	});