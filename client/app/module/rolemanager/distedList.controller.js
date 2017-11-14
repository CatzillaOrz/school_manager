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
                this.roles = [{id: 'all', text: '全部'},
                    {id: 'ROLE_ORG_MANAGER', text: '校级超级管理员'}, {id: 'ROLE_ORG_EDUCATIONALMANAGER', text: '校级教务管理'}, {id: 'ROLE_ORG_DATAVIEW', text: '校级数据查看'},
                    {id: 'ROLE_COLLEGE_ADMIN', text: '院级超级管理员'}, {id: 'ROLE_COLLEG_EDUCATIONALMANAGER', text: '院级教务管理'}, {id: 'ROLE_COLLEG_DATAVIEW', text: '院级数据查看'}
                ];
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
                params.roleName = _this.currentRecord.role;
                RoleManagerService.cancleRole(params).$promise
                    .then(function (data) {
                        if(data && data.sussess){
                            messageService.openMsg("取消权限成功！");
                            _this.getDistedList();
                        }else{
                            messageService.openMsg("取消权限失败！");
                        }
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
                var roleByList = record.role;
                if(roleName.indexOf("ROLE_ORG_ADMIN") != -1){
                    return true;
                }else if(roleName.indexOf("ROLE_ORG_MANAGER") != -1){
                    if(roleByList == 'ROLE_ORG_MANAGER' || roleByList == 'ROLE_ORG_ADMIN'){
                        return false;
                    }else {
                        return true;
                    }
                }else if(roleName.indexOf("ROLE_COLLEGE_ADMIN") != -1){
                    if(roleByList == 'ROLE_COLLEG_EDUCATIONALMANAGER' || roleByList == 'ROLE_COLLEG_DATAVIEW'){
                        return true;
                    }else {
                        return false;
                    }
                }else{
                    return false;
                }
            },

            init: function () {
                this.getDistedList();
            }
        };
        $scope.roleDisted.init();
    });

