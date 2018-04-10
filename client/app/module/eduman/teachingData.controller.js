/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('teachingDataCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
                                            ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService,
                                            ngDialog, RoleAuthService,SchoolYearService, SchoolService) {

        //控制按钮权限
        $scope.isUseAuth = function(type){
            return RoleAuthService.isUseAuthority(type);
        };

        $scope.teachDataFn = {
            //学年下拉数据列表
            semesterDropList: [],
            selectedSemester:{},
            semesterId:null,
            courseName:'',
            teacherName:'',
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
            page2: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            collageDataList:[],
            teachClassDataList:[],
            switchOneTab: function (index) {
                console.log(index);
                var _this = this;
                if (index == 1) {
                    _this.tab=1;
                    _this.getCollageDataList();
                } else if (index == 2) {
                    _this.tab=2;
                    _this.getTeachClassDataList();
                }
            },
            //学期列表查询
            getSemesterList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageSize:100,
                    pageNumber:1
                };
                SchoolYearService.getSemesterList(params).$promise
                    .then(function (data) {
                        that.semesterList = data.data;
                        that.selectedSemester = that.semesterList[0];
                    })
                    .catch(function (error) {

                    })
            },
            //按学院查询
            getCollageDataList: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    // orgId: 218,
                    semesterId:_this.selectedSemester.id,
                    pageNumber:_this.page.pageNumber,
                    pageSize:_this.page.pageSize
                };
                EduManService.getCollageDataList(params)
                    .then(function (data) {
                        _this.collageDataList = data.data.data;
                        console.log(_this.collageDataList);
                        _this.page = data.data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //学院数据导出
            collageDataExport: function () {
                var _this = this;
                var params = {
                    orgId:AuthService.getUser().orgId,
                    semesterId:_this.selectedSemester.id
                };

                EduManService.collageDataExport(params)
                    .then(function (data) {
                        SchoolService.getApiUrl({type:"em"}).$promise
                            .then(function (data) {
                                window.location.href = data.url + '/api/web/v2/educational/departmentstatisticsexport?orgId='+ params.orgId
                                    + (params.semesterId ? "&semesterId=" + params.semesterId : '');
                            })
                            .catch(function (error) {
                        })
                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
                    })

            },
            //按教学班查询
            getTeachClassDataList: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    // orgId: 218,
                    semesterId:_this.selectedSemester.id,
                    collegeId:'',
                    courseName:_this.courseName,
                    teacherName:_this.teacherName,
                    pageNumber:_this.page2.pageNumber || 0,
                    pageSize:_this.page2.pageSize
                };
                EduManService.getTeachClassDataList(params)
                    .then(function (data) {
                        _this.teachClassDataList = data.data.data;
                        console.log(data.data.page);
                        _this.page2 = data.data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //教学班导出
            teachClassDataExport: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    semesterId:_this.selectedSemester.id,
                    collegeId:'',
                    courseName:_this.courseName,
                    teacherName:_this.teacherName,
                };
                EduManService.teachClassDataExport(params)
                    .then(function (data) {
                        SchoolService.getApiUrl({type:"em"}).$promise
                            .then(function (data) {
                                window.location.href = data.url + '/api/web/v2/educational/teachingclassstatisticsexport?orgId='+ params.orgId
                                    + (params.semesterId ? "&semesterId=" + params.semesterId : '')
                                    + (params.collegeId ? "&collegeId=" + params.collegeId : '')
                                    + (params.courseName ? "&courseName=" + params.courseName : '')
                                    + (params.teacherName ? "&semesterId=" + params.teacherName : '');
                            })
                            .catch(function (error) {
                            })
                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
                    })
            },

            //初始化
            init: function () {
                var _this = this;
                _this.getSemesterList();
                // _this.getCollageDataList();
                _this.getCollageDataList();
            },
        };
        $scope.teachDataFn.init();
    });