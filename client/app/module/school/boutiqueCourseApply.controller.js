'use strict';

angular.module('dleduWebApp')
    .controller('BoutiqueCourseApplyCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService, SchoolService, CourseService, $timeout) {
        $scope.BCApplyFn = {
            applyList: [],
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            getApplyList: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: _this.page.pageNumber+1,
                    pageSize: 10
                };
                SchoolService.getApplyList(params).$promise
                    .then(function (data) {
                        _this.page = data.pageDomain;
                        _this.applyList = data.dataList;
                    })
                    .catch(function (error) {

                    })
            },
            handleApply: function (id, state) {
                var _this = this;
                var params = {
                    id: id,
                    state: state
                };
                SchoolService.handleApply(params).$promise
                    .then(function (data) {
                        _this.getApplyList();
                        messageService.openMsg("处理成功")
                    })
                    .catch(function (error) {

                    })
            },
            init:function () {
                var _this=this;
                _this.getApplyList();
            }
        };
        $scope.BCApplyFn.init();
    });