'use strict';

angular.module('dleduWebApp')
    .controller('MajorListCtrl', function ($scope, MajorService,AuthService,messageService,CommonService, ngDialog, Upload) {
        $scope.majorListFn={
            //专业列表
            majorList: [],
            //当前操作的major
            currentMajor: {},
            myFile: null, //选择的文件对象
            errorInfos: [], //返回的错误信息
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            //查询参数
            params: {
                name:"",
            },

            // 获取专业列表
            getMajorList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                MajorService.getMajorList(params).$promise
                    .then(function (data) {
                        that.majorList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findMajorByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                MajorService.getMajorList(params).$promise
                    .then(function (data) {
                        that.majorList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
                        //that.page.pageNumber+=that.page.pageNumber;
                    })
                    .catch(function (error) {

                    })
            },
            //删除
            deleteMajor: function () {
                var _this = $scope.majorListFn;
                var params = {
                    id: _this.currentMajor.id,
                    userId: AuthService.getUser().id,
                }
                MajorService.deleteMajor(params).$promise
                    .then(function (data) {
                        messageService.openMsg("专业删除成功！");
                        _this.getMajorList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"专业删除失败！"));
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                this.currentMajor = entity;
                messageService.getMsg("您确定要删除此专业吗？", this.deleteMajor)
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
                            uploadType: 'major'
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
                window.location.href = "http://gatewaydev.aizhixin.com:80/org-manager/v1/professionnal/template";
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
                this.getMajorList();
            }
        };
        $scope.majorListFn.init();
    });
