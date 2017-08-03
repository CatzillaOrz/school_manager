'use strict';

angular.module('dleduWebApp')
    .controller('hotMajorListCtrl', function ($scope, $rootScope, AuthService, CollegeService, $state, messageService, $timeout, SchoolService, CommonService) {
        $scope.hotMajorListFn = {
            schoolInfo: {},
            params: {
                orgId: "",
                pageNumber: 1,
                pageSize: 12
            },
            hotMajorList: [],
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 12
            },
            //精品课程查询
            getHotMajorList: function () {
                var _this = this;
                var params = _this.params;
                params.pageNumber = _this.page.pageNumber,
                    params.pageSize = _this.page.pageSize
                params.pageSize = 10;
                SchoolService.getHotMajorList(params).$promise
                    .then(function (data) {
                        _this.page = data.page;
                        _this.hotMajorList = data.data;
                        _this.page.pageNumber += _this.page.pageNumber;
                    })
                    .catch(function (error) {

                    })
            },

            cutHtml: function (str, len) {
                return CommonService.strCut(str, len)
            },


            init: function () {
                var _this = this;
                _this.schoolInfo = CommonService.getSchool();
                _this.params.orgId = _this.schoolInfo.id;
                _this.getHotMajorList();
            }
        };
        $timeout(function () {

            $scope.hotMajorListFn.init();
            var height = document.body.clientHeight - 82 - 100;
            $(".content-container").css("min-height", height + "px")
        })

    });