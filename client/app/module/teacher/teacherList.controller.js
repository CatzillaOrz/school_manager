'use strict';

angular.module('dleduWebApp')
    .controller('TeacherListCtrl', function ($scope, TeacherService,AuthService,messageService,CommonService, ngDialog, Upload) {
        $scope.teacherListFn={
            //老师列表
            teacherList: [],
            //当前操作的teacher
            currentTeacher: {},
            myFile: null, //选择的文件对象
            errorInfos: [], //返回的错误信息
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

            /**
             * 弹出批量导入弹出框
             */
            openImpBatch: function(){
                var result = ngDialog.open({
                    template: 'importDialog',
                    width: 600,
                    scope: $scope,
                });
            },

            /**
             * 弹出批量导入弹出框
             */
            importantBatch: function(file){
                var that = this;
                if (file) {
                    Upload.upload({
                        url: '/api/upload/impBatch',
                        method: 'POST',
                        data: {
                            file: file,
                            orgId: AuthService.getUser().orgId,
                            userId: AuthService.getUser().id,
                            uploadType: 'teacher'
                        }
                    }).then(function(res){
                        if(res.status === 200){
                            that.errorInfos = JSON.parse(res.data);
                            if(that.errorInfos[0].id){
                                ngDialog.close();
                                messageService.openMsg("导入成功！");
                            }else{
                                ngDialog.close();
                                ngDialog.open({
                                    template: 'importResultDialog',
                                    width: 600,
                                    scope: $scope
                                });
                            }
                        }
                    },function(res){
                        messageService.openMsg("上传失败!");
                    })
                }else {
                    messageService.openMsg("请选择excel文件！");
                    return;
                }
            },

            //选择文件事件
            selected: function($newFiles, $invalidFiles){
                if($newFiles) {
                    var name = $newFiles[0].name;
                    var suff = name.substring(name.lastIndexOf("."), name.length);
                    if(suff != '.xls' && suff != '.xlsx'){
                        var result = messageService.openDialog("请选择excel文件！");
                        messageService.closeDialog(result.id);
                        return;
                    }
                }
            },

            /**
             * 下载模板
             */
            downLoad: function(){
                window.location.href = "http://gatewaydev.aizhixin.com:80/org-manager/v1/teacher/template";
            },

            init: function () {
                this.getTeacherList();
            }
        };
        $scope.teacherListFn.init();
    });
