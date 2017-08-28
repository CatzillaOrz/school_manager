'use strict';

angular.module('dleduWebApp')
    .controller('BoutiqueCourseCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,CommonService,$location,$window) {
        $scope.boutiqueFn={
            schoolInfo:{},
            emHost:"http://emdev.aizhixin.com",
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

            toEmHostInit:function () {
                var _this=this;
                var _this=this;
                var _hostname=$window.location.hostname;
                var _host=_hostname.substring(_hostname.indexOf('.') + 1, _hostname.length);
                _this.emHost="http://"+_hostname.split(".")[0]+'.'+AuthService.contrastDomain(_host)[1]+"/classicalCourse/";
                // var urlArr=$location.host().split('.');
                // var  urlOne ="";
                // var  urlTwo ="";
                // if(urlArr.length==4){
                //     urlOne =urlArr[1];
                //     urlTwo =urlArr[2];
                //     if(urlOne=="schooltest"){
                //         _this.emHost="http://emtest.aizhixin.com/classicalCourse/";
                //     }else if(urlOne=="school" || urlOne=="schooluat"){
                //         if(urlTwo =="dlztc"){
                //             _this.emHost="http://em.dlztc.com/classicalCourse/";
                //         }else {
                //             _this.emHost="http://em.aizhixin.com/classicalCourse/";
                //         }
                //     }else {
                //         _this.emHost="http://emdev.aizhixin.com/classicalCourse/";
                //     }
                // }else {
                //     _this.emHost="http://emdev.aizhixin.com/classicalCourse/";
                // }

            },
            cutHtml:function (str,len) {
                return CommonService.strCut(str,len)
            },

            init:function () {
                var _this=this;
                _this.toEmHostInit();
                _this.schoolInfo=  CommonService.getSchool();
                _this.params.orgId=_this.schoolInfo.id;
                _this.getBoutiqueCourseList();
            }
        };
        $timeout(function () {

            $scope.boutiqueFn.init();

        })
        var height = document.documentElement.clientHeight - 50 - 100;
        $(".content-container").css("min-height", height + "px");

    });