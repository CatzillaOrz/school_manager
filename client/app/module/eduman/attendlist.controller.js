/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('AttendListCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService, ClassService, EduManService, tempStorageService, MajorService, $timeout,messageService) {
       //当天时间
        var today=new Date().Format("yyyy-MM-dd");
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
            //维度标识
            tab:"course",

            classAdministrativeId:"",
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
            switchTab:function (entity) {
                this.tab=entity;
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
                        pageSize: 100,
                        managerId: AuthService.getUser().id
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
                    placeholder: {
                        id: -1, // the value of the option
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
                        cache: false
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
                        id: -1, // the value of the option
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
                        cache: false
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
                        _this.params.semesterId=data.id;
                        _this.getTeachClassAttendList();
                        _this.schoolYearDropList=[obj];


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
            //按行政班查询考勤列表collegeId  professionId

            // getClassAttendList: function () {
            //     var _this = this;
            //     var params = {
            //         collegeId: _this.params.collegeId,
            //         semesterId: _this.params.semesterId,
            //         professionId: (_this.params.collegeId)?_this.params.majorId:null,
            //         classAdministrativeId: _this.classAdministrativeId,
            //         pageNumber: _this.page.pageNumber,
            //         pageSize: _this.page.pageSize,
            //         managerId: AuthService.getUser().id
            //     };
            //     if(!params.professionId){
            //         params.classAdministrativeId=null;
            //     }
            //     EduManService.getClassAttendList(params).$promise
            //         .then(function (data) {
            //             _this.classAttendList = data.data;
            //             _this.page = data.page;
            //         })
            //         .catch(function (error) {
            //
            //         })
            // },
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
                        if(data.message){
                            location.href = data.message;
                        }else {
                            messageService.openMsg("生成导出文件失败！");
                        }
                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
                    })
            },
            //行政班考勤记录导出
            classAttendExport: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    professionId: (_this.params.collegeId)?_this.params.majorId:null,
                    classAdministrativeId: _this.classAdministrativeId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                if(!params.professionId){
                    params.classAdministrativeId=null;
                }
                EduManService.classAttendExport(params).$promise
                    .then(function (data) {
                        if(data.message){
                            location.href = data.message;
                        }else {
                            messageService.openMsg("生成导出文件失败！");
                        }

                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
                    })
            },
            //查询参数重置
            resetParams: function (index) {
                var _this = this;
                if(index==1){
                    _this.switchTab("course");
                }else {
                    _this.switchTab("college");
                }

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
                   // _this.getClassAttendList();
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
                        semester: entity.semesterName,
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
                $state.go("teachClassTrend", {id: entity.classId,semesterId:entity.semesterId})
                tempStorageService.setter(data);
            },

            //初始化
            init: function () {
                var _this = this;

                $timeout(function () {
                    _this.getCurrentSemester();
                },100)
                if ($state.params.position == 2) {
                    $("#myTab  a:last").tab("show");
                }


            },
        };
        //教学班按教师维度查询
        $scope.attendTeacherFn={
            params: {
                collegeId: null,
                beginDate: today,
                endDate: today,
                teacherName: null
            },
            attendList:[],
            getTeachingclassAttendByTeacher:function () {
                var _this=this;
                var params=_this.params;
                params.pageNumber=_this.page.pageNumber;
                params.pageSize=_this.page.pageSize;
                EduManService.getTeachingclassAttendByTeacher(params).$promise
                    .then(function (data) {
                        _this.attendList=data.data;
                        _this.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //导出
            exportTeachingclassByTeacher:function () {
                var _this=this;
                var params=_this.params;
                EduManService.exportTeachingclassByTeacher(params).$promise
                    .then(function (data) {
                        location.href = data.message+'?attname='+ data.fileName ;

                    })
                    .catch(function (error) {

                    })
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
        };
       //教学班按时间维度查询

        $scope.attendTimeFn={
            params: {
                courseName: null,
                beginDate: today,
                endDate: today,
                teacherName: null
            },
            attendList:[],
            ///api/web/v1/attendance/attendanceByPeriod
            getAttendanceByPeriod:function () {
                var _this=this;
                var params=_this.params;
                params.pageNumber=_this.page.pageNumber;
                params.pageSize=_this.page.pageSize;
                EduManService.getAttendanceByPeriod(params).$promise
                    .then(function (data) {
                        _this.attendList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //导出
            exportClassAttendanceByPeriod:function () {
                var _this=this;
                var params=_this.params;
                EduManService.exportClassAttendanceByPeriod(params).$promise
                    .then(function (data) {
                        location.href = data.message+'?attname='+ data.fileName ;

                    })
                    .catch(function (error) {

                    })
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
        };
        ///api/web/v1/attendance/classAttendanceGroupByCollege
        //行政班按学院维度查询

        $scope.attendCollegeFn={
            params: {
                collegeId: null,
                proId:null,
                grade:null,
                courseName: null,
                beginDate: today,
                endDate: today,
                teacherName: null
            },
            attendList:[],
            getClassAttendanceGroupByCollege:function () {
                var _this=this;
                var params=_this.params;
                params.pageNumber=_this.page.pageNumber;
                params.pageSize=_this.page.pageSize;
                EduManService.getClassAttendanceGroupByCollege(params).$promise
                    .then(function (data) {
                        _this.attendList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //导出
            exportClassAttendanceGroupByCollege:function () {
                var _this=this;
                var params=_this.params;
                EduManService.exportClassAttendanceGroupByCollege(params).$promise
                    .then(function (data) {
                        location.href = data.message+'?attname='+ data.fileName ;

                    })
                    .catch(function (error) {

                    })
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
        };
        //行政班按专业维度查询

        $scope.attendMajorFn={
            params: {
                collegeId: null,
                proId:null,
                grade:null,
                courseName: null,
                beginDate: today,
                endDate: today,
                teacherName: null
            },
            attendList:[],
            ////api/web/v1/attendance/classAttendanceGroupByPro
            getClassAttendanceGroupByPro:function () {
                var _this=this;
                var params=_this.params;
                EduManService.getClassAttendanceGroupByPro(params).$promise
                    .then(function (data) {
                        _this.attendList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //导出
            exportClassAttendanceGroupByPro:function () {
                var _this=this;
                var params=_this.params;
                EduManService.exportClassAttendanceGroupByPro(params).$promise
                    .then(function (data) {
                        location.href = data.message+'?attname='+ data.fileName ;

                    })
                    .catch(function (error) {

                    })
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
        };
        //行政班按班级维度查询

        $scope.attendClassFn={
            params: {
                collegeId: null,
                proId:null,
                classId:null,
                grade:null,
                courseName: null,
                beginDate: today,
                endDate: today,
                teacherName: null
            },
            attendList:[],
            getClassAttendanceGroupByclass:function () {
                var _this=this;
                var params=_this.params;
                EduManService.getClassAttendanceGroupByclass(params).$promise
                    .then(function (data) {
                        _this.attendList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //导出
            exportClassAttendanceGroupByclass:function () {
                var _this=this;
                var params=_this.params;
                EduManService.exportClassAttendanceGroupByclass(params).$promise
                    .then(function (data) {
                        location.href = data.message+'?attname='+ data.fileName ;

                    })
                    .catch(function (error) {

                    })
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
        };
        //设置到课率
        $scope.attendSettingFn={
            settingList:[],
            params: {

            },
            getAttendacneSettingList:function () {
                var _this=this;
                EduManService.getAttendacneSettingList().$promise
                    .then(function (data) {
                        _this.settingList=_this.dataFormat(data);
                    })
                    .catch(function (error) {

                    })
            },
            dataFormat:function (list) {
                var result=[];
                angular.forEach(list,function (entity) {
                    _.mapKeys(entity, function(value, key) {
                        var obj={
                            key:key,
                            value:value
                        }
                        result.push(obj);
                    });
                });
                return result;
            },
            //分页参数
            init:function () {
                this.getAttendacneSettingList();
            }
        };
        $scope.attendSettingFn.init();
        $scope.attendFn.init();
        $timeout(function () {
            $scope.$watch('attendFn.params.collegeId', function(newValue, oldValue) {
                if(!newValue){
                    $scope.attendFn.params.majorId=null;
                }
                if (newValue!=oldValue){
                    $scope.attendFn.majorDropList=[];
                }
            });
            $scope.$watch('attendFn.params.majorId', function(newValue, oldValue) {
                if(!newValue){
                    $scope.attendFn.classAdministrativeId=null;
                }
                if (newValue!=oldValue){
                    $scope.attendFn.classDropList=[];
                }
            });
        });

    });