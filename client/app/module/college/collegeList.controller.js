'use strict';

angular.module('dleduWebApp')
    .controller('CollegeListCtrl', function ($scope, AuthService,ngDialog, CollegeService, messageService,CommonService, Upload, UploadService, ImpBatchService) {
        $scope.collegeListFn = {
            //学院列表
            collegeList: [],
            //当前操作的学院
            currentCollege: {},
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            myFile: null, //选择的文件对象
            errorInfos: [], //返回的错误信息
            //查询参数
            params: {
                name:""
            },

            // 获取学院列表
            getCollegeList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 0,
                    pageSize: 10
                };
                params.name=that.params.name;
                CollegeService.getCollegeList(params).$promise
                    .then(function (data) {
                        that.collegeList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findCollegeByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                CollegeService.getCollegeList(params).$promise
                    .then(function (data) {
                        that.collegeList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {

                    })
            },
            //删除
            deleteCollege: function () {
                var _this = $scope.collegeListFn;
                var params = {
                    id: _this.currentCollege.id,
                    userId: AuthService.getUser().id,
                }
                CollegeService.deleteCollege(params).$promise
                    .then(function (data) {
                        messageService.openMsg("院系删除成功！");
                        _this.getCollegeList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"院系删除失败！"));
                    })
            },
            //删除提示弹出框
            deletePrompt: function (entity) {
                this.currentCollege = entity;
                messageService.getMsg("您确定要删除此院系吗？", this.deleteCollege);
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
                    uploadType: 'college'
                };
                var dialogParams = {
                    template: 'importResultDialog',
                    width: 600,
                    scope: $scope
                };
                ImpBatchService.importantBatch(params, this, dialogParams, this.getCollegeList);
            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

			/**
			 * 下载模板
             */
            downLoad: function(){
                ImpBatchService.downLoad('college');
            },

            /**
             * 导出
             */
            exportData: function(){
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name = that.params.name;
                params.pageNumber = 1;
                params.pageSize = 9999999;
                CollegeService.exportCollege(params).success(function(data) {
                    CommonService.saveAs(data, '院系信息');
                }).catch(function (e) {

                });
            },

            init: function () {
                this.getCollegeList();
            }
        };

            $scope.collegeListFn.init();
    });
