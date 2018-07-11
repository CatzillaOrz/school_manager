/**
 * Created by Administrator on 2017/6/21.
 * 辅导员暂停考勤记录
 */
angular.module('dleduWebApp')
    .controller('AttendPauseCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
                                            ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService,
                                            ngDialog, RoleAuthService) {

        //控制按钮权限
        $scope.isUseAuth = function(type){
            return RoleAuthService.isUseAuthority(type);
        };

        //暂停考勤
        $scope.attendPauseFn = {
            params: {
                orgId: AuthService.getUser().orgId,
                criteria: null,
                opt:null,
                startTime: null,
                endTime: null,
                managerId: AuthService.getUser().id

            },
            cause: '',
            currentSt: null,
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            attendList: [],

            getAttendStopLogs: function () {
                var _this = this;
                var params = _this.params;
                if(params.startTime&&params.endTime){
                    var flag=$scope.attendFn.checkDateZone(params.startTime,params.endTime)
                    if(!flag){
                        messageService.openMsg("开始时间小于结束时间！");
                        return ;
                    }
                }
                params.pageNumber = _this.page.pageNumber;
                params.pageSize = _this.page.pageSize;
                params.managerId = AuthService.getUser().id;
                EduManService.getAttendStopLogs(params).$promise
                    .then(function (data) {
                        _this.attendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },

            //恢复考勤
            openAttendDialog:function (stu) {
                this.currentSt = stu;
                ngDialog.open({
                    template: 'attendPauseDialog',
                    width: 550,
                    scope: $scope
                })
            },

            operAttend: function(){
                var that = this;
                var params = {msg: that.cause, studentId: that.currentSt.stuId};
                if(that.currentSt.optContent=='暂停考勤'){
                    EduManService.recoverAttend(params).$promise
                        .then(function (data) {
                            if(data.success){
                                that.getAttendStopLogs();
                                messageService.openMsg("恢复考勤成功！");
                            }else{
                                messageService.openMsg("恢复考勤失败！");
                            }
                        })
                        .catch(function (error) {

                        })
                }else{
                    EduManService.cancleAttend(params).$promise
                        .then(function (data) {
                            that.getAttendStopLogs();
                            if(data.success){
                                messageService.openMsg("暂停考勤成功！");
                            }else{
                                messageService.openMsg("暂停考勤失败！");
                            }
                        })
                        .catch(function (error) {

                        })
                }
            }
        };
        $scope.attendPauseFn.getAttendStopLogs();
    });