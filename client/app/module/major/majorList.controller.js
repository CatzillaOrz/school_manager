'use strict';

angular.module('dleduWebApp')
    .controller('MajorListCtrl', function ($scope, $state,MajorService,AuthService,messageService,CommonService, ngDialog,
                                           Upload, ImpBatchService, RoleAuthService) {
        $scope.majorListFn={
            //专业列表
            majorList: [],
            //当前操作的major
            currentMajor: {},
            myFile: null, //选择的文件对象
            errorInfos: [], //返回的错误信息
            collegeId:null,
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

            //控制按钮权限
            isUseAuth: function(type){
                return RoleAuthService.isUseAuthority(type);
            },

            // 获取专业列表
            getMajorList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    managerId: AuthService.getUser().id,
                    collegeId:that.collegeId,
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
                    pageSize: that.page.pageSize,
                    collegeId:that.collegeId,
                    managerId: AuthService.getUser().id
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
                var params = {
                    template: 'importDialog',
                    width: 600,
                    scope: $scope,
                };
                ImpBatchService.openImpBatch(params);
            },

            /**
             * 弹出批量导入弹出框
             */
            importantBatch: function(file){
                var params = {
                    file: file,
                    orgId: AuthService.getUser().orgId,
                    userId: AuthService.getUser().id,
                    uploadType: 'major'
                };
                var dialogParams = {
                    template: 'importResultDialog',
                    width: 600,
                    scope: $scope
                };
                ImpBatchService.importantBatch(params, this, dialogParams, this.getMajorList);
            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

            /**
             * 下载模板
             */
            downLoad: function(){
                ImpBatchService.downLoad('major');
            },

            /**
             * 导出
             */
            exportData: function(){
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize,
                    collegeId:that.collegeId,
                    managerId: AuthService.getUser().id
                };
                params.name = that.params.name;
                params.pageNumber = 1;
                params.pageSize = 9999999;
                MajorService.exportMajor(params).success(function(data) {
                    CommonService.saveAs(data, '专业信息');
                }).catch(function (e) {

                });
            },


            init: function () {
                this.collegeId=$state.params.collegeId;
                this.getMajorList();
            }
        };
        $scope.majorListFn.init();
    });
