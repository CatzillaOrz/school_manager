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

			lookComment: function (params) {
				var eduman = $resource('api/eduman/lookComment');
				return eduman.get(params);
			},

			getEvaQuesStaticInfo: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesStaticInfo');
				return eduman.get(params);
			},

			getEvaQuesUncompleteStu: function (params) {
				var eduman = $resource('api/eduman/getEvaQuesUncompleteStu');
				return eduman.get(params);
			},

			exportQuesResult: function (params) {
				var eduman = $resource('api/eduman/exportQuesResult');
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
            getAttendacneSettingList:function () {
                var eduman =  $resource('api/eduman/getAttendacneSettingList');
                return eduman.get();
            },
            getTeachingclassAttendByTeacher:function (params) {
                var eduman = $resource('api/eduman/getTeachingclassAttendByTeacher');
                return eduman.get(params);
            },
            getAttendanceByPeriod:function (params) {
                var eduman = $resource('api/eduman/getAttendanceByPeriod');
                return eduman.get(params);
            },
            getClassAttendanceGroupByPro:function (params) {
                var eduman = $resource('api/eduman/getClassAttendanceGroupByPro');
                return eduman.get(params);
            },
            getClassAttendanceGroupByclass:function (params) {
                var eduman = $resource('api/eduman/getClassAttendanceGroupByclass');
                return eduman.get(params);
            },
            getClassAttendanceGroupByCollege:function (params) {
                var eduman = $resource('api/eduman/getClassAttendanceGroupByCollege');
                return eduman.get(params);
            },
            exportTeachingclassByTeacher:function (params) {
                var eduman = $resource('api/eduman/exportTeachingclassByTeacher');
                return eduman.get(params);
            },
            exportClassAttendanceByPeriod:function (params) {
                var eduman = $resource('api/eduman/exportClassAttendanceByPeriod');
                return eduman.get(params);
            },
            exportClassAttendanceGroupByCollege:function (params) {
                var eduman = $resource('api/eduman/exportClassAttendanceGroupByCollege');
                return eduman.get(params);
            },
            exportClassAttendanceGroupByPro:function (params) {
                var eduman = $resource('api/eduman/exportClassAttendanceGroupByPro');
                return eduman.get(params);
            },
            exportClassAttendanceGroupByclass:function (params) {
                var eduman = $resource('api/eduman/exportClassAttendanceGroupByclass');
                return eduman.get(params);
            },
            updateAttendacne:function (params) {
                var eduman = $resource('api/eduman/updateAttendacne','',{
                    update: {method:'PUT'}});
                return eduman.update(params);
            },
            getAttendListByCondition:function (params) {
                var eduman = $resource('api/eduman/getAttendListByCondition');
                return eduman.get(params);
            },
            getAttendChangeLog:function (params) {
                var eduman = $resource('api/eduman/getAttendChangeLog');
                return eduman.get(params);
            },
            updateAttend: function (params) {
                var eduman = $resource('api/eduman/updateAttend','',{
                    update: {method:'PUT'}});
                return eduman.update(params);
            },
            getAttendStopLogs:function (params) {
                var eduman = $resource('api/eduman/getAttendStopLogs');
                return eduman.get(params);
            },
            getInsRollCallList:function (params) {
                var eduman = $resource('api/eduman/getInsRollCallList');
                return eduman.get(params);
            },
            getClassRollCallDetails:function (params) {
                var eduman = $resource('api/eduman/getClassRollCallDetails');
                return eduman.get(params);
            },
			exportRollCallInfo:function (params) {
				return $http({
					method: 'GET',
					url: "api/eduman/exportRollCallInfo",
					params: params
				});
			},
            getTeachClassDataList:function (params) {

			},
            getCollageDataList:function (params) {
				return $http({
					method: 'GET',
					url: "api/eduman/getCollageDataList",
					params: params
				});
			},
            collageDataExport:function (params) {
				return $http({
					method: 'GET',
					url: "api/eduman/collageDataExport",
					params: params
				});
			},
            teachClassDataExport:function (params) {
				return $http({
					method: 'GET',
					url: "api/eduman/teachClassDataExport",
					params: params
				});
			},

			//查询督导信息列表
			getTeachingSupervisorList: function (params) {
				var eduman = $resource('api/eduman/getTeachingSupervisorList');
				return eduman.get(params);
			},

			//查询督导信息详情
			getTeachingSupervisorInfo: function (params) {
				var eduman = $resource('api/eduman/getTeachingSupervisorInfo');
				return eduman.get(params);
			},

			//查询模板详情
			getTeachingSupervisorTem: function (params) {
				var eduman = $resource('api/eduman/getTeachingSupervisorTem');
				return eduman.get(params);
			},

			//创建督导模板
			addTeachingSupervisor:function (params) {
				var eduman = $resource('api/eduman/addTeachingSupervisor');
				return eduman.save(params);
			},

			//创建督导模板
			addTeachingTemplateStu:function (params) {
				var eduman = $resource('api/eduman/addTeachingTemplateStu');
				return eduman.save(params);
			},

			//更新督导模板
			updateTeachingSupervisor: function (params) {
				var eduman = $resource('api/eduman/updateTeachingSupervisor','',{
					update: {method:'PUT'}});
				return eduman.update(params);
			},

			exportTea: function (params) {
				return $http({
					method: 'GET',
					url: "api/eduman/exportTea",
					params: params
				});
			},

			exportStu: function (params) {
				return $http({
					method: 'GET',
					url: "api/eduman/exportStu",
					params: params
				});
			},

			//教师评学分配接口
			distTeaching:function (params) {
				var eduman = $resource('api/eduman/distTeaching');
				return eduman.save(params);
			},
			//教师评学已经分配接口
			getDistedTeaching: function (params) {
				var eduman = $resource('api/eduman/getDistedTeaching');
				return eduman.get(params);
			},
			//教师评学分配接口
			delTeaching:function (params) {
				var eduman = $resource('api/eduman/delTeaching');
				return eduman.save(params);
			},
			//教师评学已经分配接口
			getDistTeaching: function (params) {
				var eduman = $resource('api/eduman/getDistTeaching');
				return eduman.get(params);
			},
			getSamePartList: function (params) {
				var dormman = $resource('api/eduman/getSamePartList');
				return dormman.get(params);
			},
			//保存权重
			saveWeight:function (params) {
				var eduman = $resource('api/eduman/saveWeight');
				return eduman.save(params);
			},
		}

	});