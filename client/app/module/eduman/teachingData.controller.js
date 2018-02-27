/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('teachingDataCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
                                            ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService,
                                            ngDialog, RoleAuthService) {

        //控制按钮权限
        $scope.isUseAuth = function(type){
            return RoleAuthService.isUseAuthority(type);
        };

        $scope.teachDataFn = {
            //学年下拉数据列表
            semesterDropList: [],
            semesterId:null,
            //学院下拉列表
            collegeDropList: [],
            tab:1,
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },

            switchOneTab: function (index) {
                console.log(index);
                var _this = this;
                if (index == 1) {
                    _this.tab=1;
                } else if (index == 2) {
                    _this.tab=2;
                }
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
                                    id: data.id,
                                    text: data.name
                                }
                            ]
                        };
                        _this.semesterId = data.id;
                        _this.getTeachClassAttendList();
                        _this.schoolYearDropList = [obj];


                    })
                    .catch(function (error) {

                    })
            },
            //按教学班查询考勤列表
            getTeachClassAttendList: function () {
                var _this = this;
                var params = {
                };
                EduManService.getTeachClassAttendList(params).$promise
                    .then(function (data) {
                        _this.teachClassAttendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //教学班导出
            teachClassAttendExport: function () {
                var _this = this;
                var params = {
                };
                EduManService.teachClassAttendExport(params).$promise
                    .then(function (data) {
                        if (data.message) {
                            location.href = data.message;
                        } else {
                            messageService.openMsg("生成导出文件失败！");
                        }
                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
                    })
            },

            //初始化
            init: function () {
                var _this = this;

                $timeout(function () {
                    _this.getCurrentSemester();
                }, 100);
                if ($state.params.position == 2) {
                    $("#myTab  a:last").tab("show");
                }


            },
        };
        $timeout(function () {
            /*$scope.$watch('teachDataFn.params.collegeId', function (newValue, oldValue) {
                if (!newValue) {
                    $scope.teachDataFn.params.majorId = null;
                }
                if (newValue != oldValue) {
                    $scope.teachDataFn.majorDropList = [];
                }
            });*/
        });
        $scope.teachDataFn.init();
    });