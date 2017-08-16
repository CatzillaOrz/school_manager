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
                var eduman = $resource('api/eduman/teachClassTrend');
                return eduman.get(params);
            },
            teachClassAttendExportTend:function (params) {
                var eduman = $resource('api/eduman/teachClassAttendExportTend');
                return eduman.get(params);
            },

			getElecFenceList: function (params) {
				var eduman = $resource('api/eduman/getElecFenceList');
				return eduman.get(params);
			},
			//获取历史轨迹信息
			getElecFenceHistory: function (params) {
				var eduman = $resource('api/eduman/getElecFenceHistory');
				return eduman.get(params);
			},
			//获取当天轨迹信息
			getElecFenceCurrent: function (params) {
				var eduman = $resource('api/eduman/getElecFenceCurrent');
				return eduman.get(params);
			},
			//获取电子围栏设置信息
			getElecSetInfo: function(params){
				var eduman = $resource('api/eduman/getElecSetInfo');
				return eduman.get(params);
			},
			//保存设置的多边形信息
			setElecFenceInfo: function(params){
				var eduman = $resource('api/eduman/setElecFenceInfo');
				return eduman.save(params);
			},
			//通知班主任
			notice: function(params){
				var eduman = $resource('api/eduman/notice');
				return eduman.save(params);
			},
			//开启围栏
			switchElec: function(params){
				var eduman = $resource('api/eduman/switchElec');
				return eduman.save(params);
			},

            classTrend:function (params) {
                var eduman = $resource('api/eduman/classTrend');
                return eduman.get(params);
            },
            classAttendExportTrend:function (params) {
                var eduman = $resource('api/eduman/classAttendExportTrend');
                return eduman.get(params);
            },
            getCurrentSemester:function (params) {
                var eduman = $resource('api/eduman/getCurrentSemester');
                return eduman.get(params);
            },
		}

	});