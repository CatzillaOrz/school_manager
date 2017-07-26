/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('ClassTrendCtr', function ($scope,$timeout, $state, AuthService, Select2LoadOptionsService, EduManService, tempStorageService, $interval) {
        $scope.config = {
            // title: 'Line Chart',
            // subtitle: 'Line Chart Subtitle',
            debug: true,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            stack: false,
            tooltip:{
                formatter: '出勤率：{c} %'
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {
                    show: true
                },
                axisPointer:{
                    label:{
                        formatter:'{value} %'
                    }
                }
            },

        };

        $scope.classTrendFn = {
            selected: {},
            trendList: [],
            trendCharts: [],
            studentsCount: "",
            showLine: true,
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
                        id: -1, // the value of the option
                        text: '按学期筛选'
                    },
                    allowClear: true,
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
                            _this.schoolYearDropList = _this.select2GroupFormat(data.data);
                            console.log(_this.schoolYearDropList);
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
                        text: '全部'
                    },
                    allowClear: true,
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
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
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
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
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
            //查询行政班趋势数据
            classTrend: function () {
                var _this = this;
                var params = _this.params;
                params.professionId=_this.params.majorId;
                EduManService.classTrend(params).$promise
                    .then(function (data) {
                        _this.trendList = data.data;
                        var line = _this.getChartData(_this.trendList,data.title);
                        _this.trendCharts = [];
                        _this.studentsCount = data.personNum;
                        if(_this.trendList.length!=0){
                            _this.trendCharts.push(line);
                        }else {
                            _this.trendCharts=[];
                        }

                    })
                    .catch(function (error) {

                    })
            },
            //趋势数据转换
            getChartData: function (list,title) {
                var dataPoints = [];
                angular.forEach(list, function (data) {
                    var dataY=data.proportion.replace("%", '')==""?0:data.proportion.replace("%", '');
                    var temp = {
                        x: "第" + data.week + "周",
                        y: dataY

                    }
                    dataPoints.push(temp)
                });
                var line = {
                    name: title,
                    datapoints: dataPoints
                }


                return line;
            },
            //考勤记录导出
            classAttendExportTrend: function () {
                var _this = this;
                var params = {
                    classId: _this.params.classId,
                };
                EduManService.classAttendExportTrend(params).$promise
                    .then(function (data) {
                        location.href = data.message;
                    })
                    .catch(function (error) {

                    })
            },
            //列表折线图切换
            viewToggle: function () {
                this.showLine = !this.showLine;
            },
            getCurrentSemester: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId
                };
                EduManService.getCurrentSemester(params).$promise
                    .then(function (data) {
                        var obj = {
                            text: data.yearName,
                            children: [
                                {
                                    id: data.id,
                                    text: data.name
                                }
                            ]
                        };
                        _this.schoolYearDropList = [obj];
                        _this.params.semesterId = data.id;
                        _this.classTrend();


                    })
            },
            //初始化
            init: function () {
                var _this = this;
                $timeout(function () {
                    _this.getCurrentSemester();
                },100)
                _this.params.classId = $state.params.id;
                _this.selected = tempStorageService.getter();


            },
        };
        $scope.classTrendFn.init();
        $timeout(function () {
            $scope.$watch('classTrendFn.params.collegeId', function(newValue, oldValue) {
                if(!newValue){
                    $scope.classTrendFn.params.majorId=null;
                }
                if (newValue!=oldValue){
                    $scope.classTrendFn.majorDropList=[];
                }
            });
            $scope.$watch('classTrendFn.params.majorId', function(newValue, oldValue) {
                if(!newValue){
                    $scope.classTrendFn.classAdministrativeId=null;
                }
                if (newValue!=oldValue){
                    $scope.classTrendFn.classDropList=[];
                }
            });
        });
    });