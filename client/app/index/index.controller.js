'use strict';

angular.module('dleduWebApp')
    .controller('IndexCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,CommonService) {
        $scope.indexFn={
            schoolInfo:{},
            schoolLogo:"",
            currentActive:"index",
            params:{
                orgId: "",
                pageNumber:1,
                pageSize: 10
            },
            boutiqueCourseList:[],
            excellentTeacherList:[],
            hotMajorList:[],
            shuffImageList:[],
            signIn: function () {
                var _pathName = '';
                if (!!$scope.redirectUrl && $scope.redirectUrl.indexOf("http://") >= 0) {
                    _pathName = '/login?redirectUrl=' + $scope.redirectUrl;
                } else if (!!$scope.redirectUrl && $scope.redirectUrl.indexOf("http://") == -1) {
                    _pathName = '/login?redirectUrl=' + $window.location.protocol + '//' + $window.location.host + $scope.redirectUrl;
                } else {
                    _pathName = '/login';
                }
                AuthService.navigation(0, _pathName);
            },
            //精品课程查询
            getBoutiqueCourseList:function () {
                var _this=this;
                var params = _this.params;
                params.pageSize=8;
                SchoolService.getBoutiqueCourseList(params).$promise
                    .then(function (data) {
                        _this.page=data.page;
                        _this.boutiqueCourseList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //优秀教师
            getExcellentTeacherList:function () {
                var _this=this;
                var params = _this.params;
                params.pageSize=6;
                SchoolService.getExcellentTeacherList(params).$promise
                    .then(function (data) {
                        _this.page=data.page;
                        _this.excellentTeacherList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //热门专业
            getHotMajorList:function () {
                var _this=this;
                var _this=this;
                var params = _this.params;
                params.pageSize=10;
                SchoolService.getHotMajorList(params).$promise
                    .then(function (data) {
                        _this.page=data.page;
                        _this.hotMajorList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //轮播
            getShuffImageList:function () {
                var _this=this;
                var params=_this.params;
                SchoolService.getShuffImageList(params).$promise
                    .then(function (data) {
                        _this.shuffImageList=[];
                        angular.forEach(data.data,function (entity,index) {
                            var temp ={
                                "background": "",
                                    image: entity.imageUrl,
                                    "url": null,
                                    "id": index
                            }
                            _this.shuffImageList.push(temp);
                        })

                    })
                    .catch(function (error) {

                    })
            },
            //logo
            getLogoList:function () {
                var _this=this;
                var params={
                    orgId:_this.params.orgId
                };
                SchoolService.getLogoList(params).$promise
                    .then(function (data) {
                        angular.forEach(data.data,function (temp) {
                            if(temp.logoSort==2){
                                _this.schoolLogo=temp;
                            }
                        })
                    })
                    .catch(function (error) {

                    })
            },
           init:function () {
                var _this=this;
               _this.schoolInfo=  CommonService.getSchool();
               _this.params.orgId=_this.schoolInfo.id;
               _this.currentActive=$state.name;
                _this.getShuffImageList();
               _this.getHotMajorList();
               _this.getExcellentTeacherList();
               _this.getBoutiqueCourseList();
               _this.getLogoList();
           }
        };
        $timeout(function () {
            $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
                $scope.indexFn.currentActive=toState.name;
            });
            $scope.indexFn.init();
        })

    });