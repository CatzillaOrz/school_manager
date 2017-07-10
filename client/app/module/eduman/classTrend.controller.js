/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('ClassTrendCtr', function ($scope, $state,AuthService,Select2LoadOptionsService, EduManService, tempStorageService,$interval) {
        $scope.config = {
            // title: 'Line Chart',
            // subtitle: 'Line Chart Subtitle',
            debug: true,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            stack: false,

            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {show: true},
            },

        };

        $scope.classTrendFn = {
            selected:{},
            trendList:[],
            trendCharts:[],
            showLine:true,
            //学年下拉数据列表
            schoolYearDropList: [],
            //学院下拉列表
            collegeDropList: [],
            //专业下拉列表
            majorDropList: [],
            //班级下拉列表
            classDropList: [],
            params: {
                majorId: null,
                collegeId: null,
                semesterId: null,
                classId: null,
                courseName: null,
                teacherName: null
            },
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
                            _this.schoolYearDropList = _this.select2GroupFormat(data.data)
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
            //select2动态关键字查询列表配置
            selectCollege2Options: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '按班级筛选'
                    },
                    // allowClear: true,
                    ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList", {
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100
                    }, "name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.collegeDropList = [];
                            return '按班级筛选';
                        }
                        _this.collegeDropList.push(data);
                        return data.name;
                    }

                }
            },
            //专业下拉列表配置
            select2MajorOptions: function () {
                var that = this;
                return {
                    ajax: {
                        url: "api/major/getMajorDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                collegeId: that.params.collegeId,

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
                        cache: true
                    },

                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            that.majorDropList = [];
                        }
                        that.majorDropList.push(data);
                        return data.name;
                    }
                }
            },
            //班级下拉列表配置
            select2ClassOptions: function () {
                var that = this;
                return {
                    ajax: {
                        url: "api/class/geClassDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                professionalId: that.params.majorId,

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
                        cache: true
                    },
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            that.classDropList = [];
                        }
                        that.classDropList.push(data);
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
            //查询教学班趋势数据
            classTrend:function () {
                var _this=this;
                var params=_this.params;
                EduManService.classTrend(params).$promise
                    .then(function (data) {
                        _this.trendList = data;
                        var line=_this.getChartData(data);
                        _this.trendCharts.push(line);
                    })
                    .catch(function (error) {

                    })
            },
            //趋势数据转换
            getChartData:function (list) {
                var dataPoints=[];
                angular.forEach(list,function (data) {
                    var temp={
                        x:"第"+data.week+"周",
                        y:data.proportion.replace("%",'')

                    }
                    dataPoints.push(temp)
                });
                var line={
                    name: '教学周考勤趋势',
                    datapoints:dataPoints
                }


                return line;
            },
            //考勤记录导出
            classAttendExportTrend:function () {
                var _this = this;
                var params = {
                    classId: _this.params.classId,
                };
                EduManService.classAttendExportTrend(params).$promise
                    .then(function (data) {
                        location.href=data.message;
                    })
                    .catch(function (error) {

                    })
            },
            //列表折线图切换
            viewToggle:function () {
                this.showLine=!this.showLine;
            },

            //初始化
            init: function () {
                var _this = this;
                _this.params.classId = $state.params.id;
                _this.selected = tempStorageService.getter();
                _this.classTrend();

            },
        };
        $scope.classTrendFn.init();

    });