'use strict';

angular.module('dleduWebApp')
    .controller('StudentListCtrl', function ($scope, AuthService,StudentService,messageService,CommonService,AccountService, ngDialog, Upload) {
        $scope.studentListFn={
            //学生列表
            studentList: [],
            //当前操作的student
            currentStudent: {},
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
                            uploadType: 'college'
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
                window.location.href = "http://gatewaydev.aizhixin.com:80/org-manager/v1/students/template";
                /*UploadService.downLoad().$promise
                 .then(function (data) {
                 var blob = new Blob([data], {type: "application/vnd.ms-excel"});
                 var objectUrl = URL.createObjectURL(blob);
                 var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
                 $("body").append(aForExcel);
                 $(".forExcel").click();
                 aForExcel.remove();
                 //window.location.href = "http://7xpscc.com1.z0.glb.clouddn.com/904317d0-75df-4728-a832-0e2ce65c4cac.xlsx";
                 })
                 .catch(function (error) {
                 })*/
            },

            init: function () {
                this.getStudentList();
            }
        };
        $scope.studentListFn.init();
    });
