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
                var eduman = $resource('api/eduman/getStudentAttendByTeachClassId',null,{
                    query: {method: 'get', isArray: true, cancellable: true}
                });
                return eduman.query(params);
            },
            //通过行政班级查询学生考勤
            getStudentAttendByClassId: function (params) {
                var eduman = $resource('api/eduman/getStudentAttendByClassId',null,{
                    query: {method: 'get', isArray: true, cancellable: true}
                });
                return eduman.query(params);
            },
            teachClassAttendExport:function (params) {
                var eduman = $resource('api/eduman/teachClassAttendExport');
                return eduman.get(params);
            },
            //行政班考勤记录导出
            classAttendExport:function (params) {
                var eduman = $resource('api/eduman/classAttendExport');
                return eduman.get(params);
            },
            //教学班详情考勤记录导出
            teachClassAttendInfoExport:function (params) {
                var eduman = $resource('api/eduman/teachClassAttendInfoExport');
                return eduman.get(params);
            },
            //行政班详情考勤记录导出
            classAttendInfoExport:function (params) {
                var eduman = $resource('api/eduman/classAttendInfoExport');
                return eduman.get(params);
            },
            //教学班考勤趋势
            teachClassTrend:function (params) {
                var eduman = $resource('api/eduman/teachClassTrend',null,{
                    query: {method: 'get', isArray: true, cancellable: true}
                });
                return eduman.query(params);
            },
            teachClassAttendExportTend:function (params) {
                var eduman = $resource('api/eduman/teachClassAttendExportTend');
                return eduman.get(params);
            },
		}

	});