'use strict';

angular.module('dleduWebApp')
    .controller('CollegeListCtrl', function ($scope, AuthService, CollegeService, messageService) {
        $scope.collegeListFn = {
            //学院列表
            collegeList: [],
            //当前操作的college
            currentCollege: {},
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params: {},

            // 获取学院列表
            getCollegeList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                }
                CollegeService.getCollegeList(params).$promise
                    .then(function (data) {
                        that.collegeList = data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findCollegeByName: function () {

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
                        messageService.openMsg("学院删除失败！");
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                this.currentCollege = entity;
                messageService.getMsg("您确定要删除此学院吗？", this.deleteCollege)
            },
            init: function () {
                this.getCollegeList();
            }
        };
        $scope.collegeListFn.init();
    });
