/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('AttendTimeCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
                                            ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService,
                                            ngDialog, RoleAuthService) {

        //控制按钮权限
        $scope.isUseAuth = function(type){
            return RoleAuthService.isUseAuthority(type);
        };


        //当天时间
        var today = new Date().Format("yyyy-MM-dd");

        //教学班按时间维度查询
        $scope.attendTimeFn = {
            params: {
                courseName: null,
                beginDate: today,
                endDate: today,
                teacherName: null,
                managerId: AuthService.getUser().id
            },
            attendList: [],
            ///api/web/v1/attendance/attendanceByPeriod
            getAttendanceByPeriod: function () {
                var _this = this;
                var params = _this.params;
                params.pageNumber = _this.page.pageNumber;
                params.pageSize = _this.page.pageSize;
                EduManService.getAttendanceByPeriod(params).$promise
                    .then(function (data) {
                        _this.attendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //导出
            exportClassAttendanceByPeriod: function () {
                var _this = this;
                var params = _this.params;
                EduManService.exportClassAttendanceByPeriod(params).$promise
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

            convertTitle: function(value){
                var result = '';
                if(value && value!=''){
                    var arr = [], count = 40;
                    var len = Math.ceil(value.length / count);
                    for(var i = 0; i < len; i++){
                        if(value.length >= count){
                            var strCut = value.substring(0, count);
                            arr.push(strCut);
                            value = value.substring(count);
                        }else{
                            value = value;
                            arr.push(value);
                        }
                    }
                    result = arr.join("\r\n");
                }
                return result;
            },

            init: function () {
                this.getAttendanceByPeriod();
            }
        };
        $scope.attendTimeFn.init();
    });