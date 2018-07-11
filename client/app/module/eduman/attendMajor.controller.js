/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('AttendMajorCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
                                            ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService,
                                            ngDialog, RoleAuthService) {

        //控制按钮权限
        $scope.isUseAuth = function(type){
            return RoleAuthService.isUseAuthority(type);
        };


        //当天时间
        var today = new Date().Format("yyyy-MM-dd");
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
            tab: "time",

            classAdministrativeId: "",
            params: {
                majorId: null,
                collegeId: null,
                semesterId: null,
                classesId: null,
                courseName: null,
                teacherName: null,
                managerId: AuthService.getUser().id
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },

            checkDateZone:function (startDate,endDate) {
                var star=new Date(startDate).getTime();
                var end=new Date(endDate).getTime();
                if(star<=end){
                    return true;
                }else{
                    return false;
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

        };

        //行政班按专业维度查询
        $scope.attendMajorFn = {
            params: {
                collegeId: null,
                proId: null,
                grade: null,
                courseName: null,
                beginDate: today,
                endDate: today,
                teacherName: null,
                managerId: AuthService.getUser().id
            },
            majorDropList: [],
            attendList: [],
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
            getClassAttendanceGroupByPro: function () {
                var _this = this;
                var params = _this.params;
                params.pageNumber = _this.page.pageNumber;
                params.pageSize = _this.page.pageSize;

                EduManService.getClassAttendanceGroupByPro(params).$promise
                    .then(function (data) {
                        _this.attendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //导出
            exportClassAttendanceGroupByPro: function () {
                var _this = this;
                var params = _this.params;
                EduManService.exportClassAttendanceGroupByPro(params).$promise
                    .then(function (data) {
                        if(data.message&&data.fileName){
                            location.href = data.message + '?attname=' + data.fileName;
                        }else {
                            messageService.openMsg("生成导出文件失败！");
                        }


                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
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

        $scope.attendMajorFn.getClassAttendanceGroupByPro();
        $timeout(function () {
            $scope.$watch('attendFn.params.collegeId', function (newValue, oldValue) {
                if (!newValue) {
                    $scope.attendFn.params.majorId = null;
                }
                if (newValue != oldValue) {
                    $scope.attendFn.majorDropList = [];
                }
            });
        });
    });