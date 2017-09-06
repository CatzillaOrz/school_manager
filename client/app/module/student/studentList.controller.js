'use strict';

angular.module('dleduWebApp')
    .controller('StudentListCtrl', function ($scope, AuthService,StudentService,messageService,CommonService,
                                             ngDialog, Upload, ImpBatchService, AccountService) {
        $scope.studentListFn={
            //学生列表
            studentList: [],
            //当前操作的student
            currentStudent: {},
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

            // 获取学生列表
            getStudentList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                StudentService.getStudentList(params).$promise
                    .then(function (data) {
                        that.studentList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findStudentByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                StudentService.getStudentList(params).$promise
                    .then(function (data) {
                        that.studentList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {

                    })
            },
            //删除
            deleteStudent: function () {
                var _this = $scope.studentListFn;
                var params = {
                    id: _this.currentStudent.id,
                    userId: AuthService.getUser().id,
                }
                StudentService.deleteStudent(params).$promise
                    .then(function (data) {
                        messageService.openMsg("学生删除成功！");
                        _this.getStudentList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"学生删除失败！"));
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentStudent = entity;
                messageService.getMsg("您确定要删除此学生吗？", that.deleteStudent)
            },
            resetPassword: function () {
                var _this = $scope.studentListFn;
                AccountService.resetPassword( _this.currentStudent.id)
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
                that.currentStudent = entity;
                messageService.getMsg("您确定要重置"+that.currentStudent.name+"的密码吗？", that.resetPassword)
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
                StudentService.getImpResult({orgId: AuthService.getUser().orgId, userId: AuthService.getUser().id}).$promise
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
                    uploadType: 'student'
                };
                var dialogParams = {
                    template: 'importResultDialog',
                    width: 600,
                    scope: $scope
                };
                ImpBatchService.importantBatch(params, this, dialogParams);
            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

            /**
             * 下载模板
             */
            downLoad: function(){
                ImpBatchService.downLoad('student');
            },

			/**
			 * 导出学生
             */
            exportData: function(){

            },

            init: function () {
                this.getStudentList();
            }
        };
        $scope.studentListFn.init();
    });
