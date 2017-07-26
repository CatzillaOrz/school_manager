'use strict';

angular.module('dleduWebApp')
    .controller('TeacherListCtrl', function ($scope, TeacherService,AuthService,messageService,CommonService,AccountService) {
        $scope.teacherListFn={
            //老师列表
            teacherList: [],
            //当前操作的teacher
            currentTeacher: {},
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params: {
                name:"",
            },

            // 获取老师列表
            getTeacherList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                TeacherService.getTeacherList(params).$promise
                    .then(function (data) {
                        that.teacherList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findTeacherByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                TeacherService.getTeacherList(params).$promise
                    .then(function (data) {
                        that.teacherList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {

                    })
            },
            //删除
            deleteTeacher: function () {
                var _this = $scope.teacherListFn;
                var params = {
                    id: _this.currentTeacher.id,
                    userId: AuthService.getUser().id,
                }
                TeacherService.deleteTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("老师删除成功！");
                        _this.getTeacherList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"老师删除失败！"));
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentTeacher = entity;
                messageService.getMsg("您确定要删除此老师吗？", that.deleteTeacher)
            },
            resetPassword: function () {
                var _this = $scope.teacherListFn;
                AccountService.resetPassword( _this.currentTeacher.id)
                    .success(function (data) {
                        messageService.openMsg("重置密码成功！");
                        _this.getStudentList();
                    })
                    .error(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"重置密码失败！"));
                    })
            },
            resetPasswordPrompt: function (entity) {
                var that=this;
                that.currentTeacher = entity;
                messageService.getMsg("您确定要重置"+that.currentTeacher.name+"的密码吗？", that.resetPassword)
            },
            init: function () {
                this.getTeacherList();
            }
        };
        $scope.teacherListFn.init();
    });
