'use strict';

angular.module('dleduWebApp')
    .controller('MajorListCtrl', function ($scope, MajorService,AuthService,messageService) {
        $scope.majorListFn={
            //专业列表
            majorList: [],
            //当前操作的major
            currentMajor: {},
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params: {},

            // 获取专业列表
            getMajorList: function () {
                var that = this;
                var params = {
                    name:"",
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                }
                MajorService.getMajorList(params).$promise
                    .then(function (data) {
                        that.majorList = data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findMajorByName: function () {

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
                        messageService.openMsg("专业删除失败！");
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
