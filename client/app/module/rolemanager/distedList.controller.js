'use strict';

/**
 * 已经分配的角色页面
 */
angular.module('dleduWebApp')
    .controller('DistedListCtrl', function ($scope, TeacherService, AuthService, messageService, CommonService, ngDialog,
                                          RoleManagerService) {
        $scope.roleDisted = {
            //老师列表
            records: [],
            //当前操作的teacher
            currentRecord: null,
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params: {
                name: "",
                role: 'all'
            },

            getResultOption: function () {
                this.roles = [{id: 'all', text: '全部'}, {id: 'ROLE_ORG_MANAGER', text: '校级管理员'}, {id: 'ROLE_COLLEGE_ADMIN', text: '院级管理员'}];
                //return {minimumResultsForSearch: -1};
            },

            // 获取老师列表
            getDistedList: function () {
                var that = this;
                var params = {
                    managerId: AuthService.getUser().id,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.teacherName = that.params.name;
                params.roleName = that.params.role;
                if(params.roleName == 'all'){
                    delete params.roleName;
                }
                RoleManagerService.getDistedRoleList(params).$promise
                    .then(function (data) {
                        that.records = data.data;
                        that.page = data.page;
                        that.page.pageNumber++;
                    })
                    .catch(function (error) {

                    })
            },

            //分配角色
            cancleRole: function () {
                var _this = $scope.roleDisted;
                var params = {
                    userId: _this.currentRecord.id
                }
                if(_this.currentRecord.roleName == '校级管理员'){
                    params.roleName = 'ROLE_ORG_MANAGER';
                }else if(_this.currentRecord.roleName == '院级管理员'){
                    params.roleName = 'ROLE_COLLEGE_ADMIN';
                }
                RoleManagerService.cancleRole(params).$promise
                    .then(function (data) {
                        messageService.openMsg("取消权限成功！");
                        _this.getDistedList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error, "取消权限失败！"));
                    })
            },

            //分配提示
            cancleDist: function (record) {
                var that = this;
                that.currentRecord = record;
                messageService.getMsg("是否确定取消"+ that.currentRecord.name +"的权限吗？", that.cancleRole)
            },

            //是否可以取消权限
            isCancle: function(record){
                var roleName = AuthService.getUser().roleNames.toString();
                var roleByList = "ROLE_ORG_MANAGER";
                if(record.roleName == '校级管理员'){
                    roleByList = 'ROLE_ORG_MANAGER';
                }else if(record.roleName == '院级管理员'){
                    roleByList = 'ROLE_COLLEGE_ADMIN';
                }
                if(roleName.indexOf("ROLE_ORG_ADMIN") != -1){
                    return true;
                }else if(roleName.indexOf("ROLE_ORG_MANAGER") != -1){
                    if(roleByList == 'ROLE_ORG_MANAGER'){
                        return false;
                    }else if(roleByList == 'ROLE_COLLEGE_ADMIN'){
                        return true;
                    }
                }
            },

            init: function () {
                this.getDistedList();
            }
        };
        $scope.roleDisted.init();
    });

