/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('CourseScoreCtrl', function ($scope, AuthService, CourseService, $timeout, EduManService){
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
                        url: "api/schoolyear/getSemesterList",
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
                            return {
                                results: data.data,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: false
                    },
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                        }
                        _this.schoolYearDropList.push(data);
                        return data.name;
                    }

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

            getCurrentSemester: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId
                };
                EduManService.getCurrentSemester(params).$promise
                    .then(function (data) {
                        _this.params.semesterId = data.id;
                        _this.schoolYearDropList=[data];


                    })
                    .catch(function (error) {

                    })
            },

            init: function () {
                var that=this;
                $timeout(function () {
                    that.getCurrentSemester();
                },100)
                that.getCourseListIn();

                //that.select2SemesterOptions();
            }
		};
		$scope.courseListFn.init();
	});