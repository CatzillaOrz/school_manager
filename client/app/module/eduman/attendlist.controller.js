/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('AttendListCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService, ClassService, EduManService, tempStorageService, MajorService, $timeout) {
        $scope.attendFn = {
            //学年下拉数据列表
            schoolYearDropList: [],
            //学院下拉列表
            collegeDropList: [],
            //专业下拉列表
            majorDropList: [],
            //班级下拉列表
            classDropList: [],
            //教学班考勤列表
            teachClassAttendList: [],
            //行政班考勤列表
            classAttendList: [],
            params: {
                majorId: null,
                collegeId: null,
                semesterId: null,
                classesId: null,
                courseName: null,
                teacherName: null
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
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
                    },
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true
                }
            },
            //专业下拉列表配置
            select2MajorOptions: function () {
                var that = this;
                return {
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

                            };
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
                    placeholder: "全部",
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
                                    id:data.id,
                                    text:data.name
                                }
                            ]
                        };
                        _this.getTeachClassAttendList();
                        _this.schoolYearDropList.push(obj);
                        _this.params.semesterId=data.id;
                       // $(".select2-selected").val(_this.params.semesterId).trigger('change');
                    })
                    .catch(function (error) {

                    })
            },
            //按教学班查询考勤列表
            getTeachClassAttendList: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    courseName: _this.params.courseName,
                    teacherName: _this.params.teacherName,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                EduManService.getTeachClassAttendList(params).$promise
                    .then(function (data) {
                        _this.teachClassAttendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //按行政班查询考勤列表
            getClassAttendList: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    majorId: _this.params.majorId,
                    classAdministrativeId: _this.params.classesId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                EduManService.getClassAttendList(params).$promise
                    .then(function (data) {
                        _this.classAttendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //教学班考勤记录导出
            teachClassAttendExport: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    courseName: _this.params.courseName,
                    teacherName: _this.params.teacherName,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                EduManService.teachClassAttendExport(params).$promise
                    .then(function (data) {
                        location.href = data.message;
                    })
                    .catch(function (error) {

                    })
            },
            //行政班考勤记录导出
            classAttendExport: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    majorId: _this.params.majorId,
                    classAdministrativeId: _this.params.classId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                EduManService.classAttendExport(params).$promise
                    .then(function (data) {
                        location.href = data.message;
                    })
                    .catch(function (error) {

                    })
            },
            //查询参数重置
            resetParams: function (index) {
                var _this = this;
                // _this.params = {
                //     majorId: null,
                //     collegeId: null,
                //     semesterId: null,
                //     classesId: null,
                //     courseName: null,
                //     teacherName: null
                // };
                //分页参数
                _this.page = {
                    totalElements: 0,
                    totalPages: 0,
                    pageNumber: 0,
                    pageSize: 10
                };
                //$scope.$apply();
                if (index == 1) {
                    _this.getTeachClassAttendList();
                } else {
                    _this.getClassAttendList();
                }
            },
            toDetail: function (entity, classes) {
                var _this = this;
                if (classes === 1) {
                    var data = {
                        semester: entity.semesterName,
                        courseName: entity.courseName,
                        code: entity.code,
                        teacherName: entity.teacherName
                    };
                    tempStorageService.setter(data);
                } else {
                    var data = {
                        semester: semesterName,
                        collegeName: entity.collegeName,
                        code: entity.code,
                        className: entity.className
                    };
                    tempStorageService.setter(data);
                }
                $state.go("attenddetail", {id: entity.classId, classes: classes})
            },
            toTrend: function (entity) {
                var data = {
                    semester: entity.semesterName,
                    courseName: entity.courseName,
                    code: entity.code,
                    teacherName: entity.teacherName
                };
                $state.go("teachClassTrend", {id: entity.classId})
                tempStorageService.setter(data);
            },

            //初始化
            init: function () {
                var _this = this;
                _this.getCurrentSemester();
                if ($state.params.position == 2) {
                    $("#myTab  a:last").tab("show");
                }


            },
        }
        $scope.attendFn.init();


    });