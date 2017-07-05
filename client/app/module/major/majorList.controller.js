'use strict';

angular.module('dleduWebApp')
    .controller('MajorListCtrl', function ($scope, MajorService,AuthService,messageService,CommonService) {
        $scope.majorListFn={
            //专业列表
            majorList: [],
            //当前操作的major
            currentMajor: {},
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
            init: function () {
                this.getMajorList();
            }
        };
        $scope.majorListFn.init();
    });
