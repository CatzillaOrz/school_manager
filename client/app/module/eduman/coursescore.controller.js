/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('CourseScoreCtrl', function ($scope, AuthService, CourseService){
		$scope.courseListFn={
            
            //课程评分列表
            scoreList: null,

			//查询参数
            params: {
                semesterId: null,
                courseName: null,
                teacherName: null
            },

			//分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },

            //学年下拉数据列表
            schoolYearDropList: [],
            select2SemesterOptions: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '按学期筛选'
                    },
                    ajax: {
                        url: "api/schoolyear/getSchoolYearDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,


                            }
                            params.name = query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            _this.schoolYearDropList=_this.select2GroupFormat(data.data)
                            return {
                                results: _this.schoolYearDropList,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: false
                    },

                }
            },
            //学期下拉列表分组数据格式化
            select2GroupFormat: function (dataList) {
                var result = []
                angular.forEach(dataList, function (data) {
                    var obj = {
                        text: data.name,
                        children: []
                    };
                    angular.forEach(data.semesterIdNameList, function (sememster) {
                        var objChild = {
                            id: sememster.id,
                            text: sememster.name
                        };
                        obj.children.push(objChild);
                    })
                    result.push(obj);
                })
                return result;
            },

            //获取课程评分列表
            getCourseListIn: function () {
                var that = this;
                var params ={
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize,
                    managerId: AuthService.getUser().id
                };
                params.semesterId=that.params.semesterId;
                params.courseName=that.params.courseName;
                params.teacherName=that.params.teacherName;
                CourseService.getCourseListIn(params).$promise
                    .then(function (data) {
                        that.scoreList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },

            init: function () {
                var that=this;
                that.getCourseListIn();
                that.select2SemesterOptions();
            }
		};
		$scope.courseListFn.init();
	});