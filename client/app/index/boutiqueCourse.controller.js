'use strict';

angular.module('dleduWebApp')
    .controller('BoutiqueCourseCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,CommonService) {
        $scope.boutiqueFn={
            schoolInfo:{},
            params:{
                orgId: "",
                pageNumber:1,
                pageSize: 12
            },
            boutiqueCourseList:[],
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 12
            },
            //精品课程查询
            getBoutiqueCourseList:function () {
                var _this=this;
                var params = _this.params;
                params.pageNumber= _this.page.pageNumber,
                params.pageSize= _this.page.pageSize
                params.pageSize=12;
                SchoolService.getBoutiqueCourseList(params).$promise
                    .then(function (data) {
                        _this.page=data.page;
                        _this.boutiqueCourseList=data.data;
                        _this.page.pageNumber+=_this.page.pageNumber;
                    })
                    .catch(function (error) {

                    })
            },




            init:function () {
                var _this=this;
                _this.schoolInfo=  CommonService.getSchool();
                _this.params.orgId=_this.schoolInfo.id;
                _this.getBoutiqueCourseList();
            }
        };
        $timeout(function () {

            $scope.boutiqueFn.init();
        })

    });