'use strict';

angular.module('dleduWebApp')
    .controller('TeacherListCtrl', function ($scope, TeacherService,AuthService,messageService,CommonService,
                                             ngDialog, Upload, ImpBatchService, AccountService) {
        $scope.teacherListFn={
            //老师列表
            teacherList: [],
            //当前操作的teacher
            currentTeacher: {},
            myFile: null, //选择的文件对象
            errorInfos: null, //返回的错误信息
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

            /**
             * 弹出批量导入弹出框
             */
            openImpBatch: function(type){
                var that = this;
                var params = {
                    template: 'importDialog',
                    width: 600,
                    scope: $scope,
                };
                if(type == 'reset'){
                    ngDialog.close();
                    ImpBatchService.openImpBatch(params);
                    return;
                }
                CommonService.addLoading(true, 'all');
                TeacherService.getImpResult({orgId: AuthService.getUser().orgId, userId: AuthService.getUser().id}).$promise
                    .then(function (data) {
                        CommonService.addLoading(false, 'all');
                        if(typeof data.state == 'undefined'){
                            ImpBatchService.openImpBatch(params);
                        }else{
                            if(data.state == 10){//数据正在处理请稍候查看
                                messageService.openMsg("数据正在处理，请稍候导入数据！");
                            }else if(data.state == 20){
                                ImpBatchService.openImpBatch(params);
                            }else if(data.state == 30){
                                that.errorInfos = data
                                ngDialog.close();
                                var dialogParams = {
                                    template: 'importResultDialog',
                                    width: 600,
                                    scope: $scope
                                };
                                ngDialog.open(dialogParams);
                            }
                        }
                    })
                    .catch(function (error) {

                    })
            },

            /**
             * 弹出批量导入弹出框
             */
            importantBatch: function(file){
                var params = {
                    file: file,
                    orgId: AuthService.getUser().orgId,
                    userId: AuthService.getUser().id,
                    uploadType: 'teacher'
                };
                var dialogParams = {
                    template: 'importResultDialog',
                    width: 600,
                    scope: $scope
                };
                ImpBatchService.importantBatch(params, this, dialogParams, this.getTeacherList);
            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

            /**
             * 下载模板
             */
            downLoad: function(){
                ImpBatchService.downLoad('teacher');
            },

            init: function () {
                this.getTeacherList();
            }
        };
        $scope.teacherListFn.init();
    });
