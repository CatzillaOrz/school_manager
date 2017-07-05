'use strict';

angular.module('dleduWebApp')
    .controller('CollegeListCtrl', function ($scope, AuthService, CollegeService, messageService,CommonService) {
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
                        messageService.openMsg("学院删除成功！");
                        _this.getCollegeList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"学院删除失败！"));
                    })
            },
            //删除提示弹出框
            deletePrompt: function (entity) {
                this.currentCollege = entity;
                messageService.getMsg("您确定要删除此学院吗？", this.deleteCollege);
            },
            init: function () {
                this.getCollegeList();
            }
        };
        $scope.collegeListFn.init();
    });
