/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('AttendTeacherCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
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

            classAdministrativeId: "",
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
            //初始化
            init: function () {
                var _this = this;
                $timeout(function () {
                    _this.getCurrentSemester();
                }, 100)
            },
        };
        //教学班按教师维度查询
        $scope.attendTeacherFn = {
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            params: {
                collegeId: null,
                beginDate: today,
                endDate: today,
                teacherName: null,
                managerId: AuthService.getUser().id
            },
            attendList: [],
            getTeachingclassAttendByTeacher: function () {
                var _this = this;
                var params = _this.params;
                params.pageNumber = _this.page.pageNumber;
                params.pageSize = _this.page.pageSize;
                EduManService.getTeachingclassAttendByTeacher(params).$promise
                    .then(function (data) {
                        _this.attendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //导出
            exportTeachingclassByTeacher: function () {
                var _this = this;
                var params = _this.params;
                EduManService.exportTeachingclassByTeacher(params).$promise
                    .then(function (data) {
                        location.href = data.message + '?attname=' + data.fileName;

                    })
                    .catch(function (error) {

                    })
            },
        };
        $scope.attendTeacherFn.getTeachingclassAttendByTeacher();
    });