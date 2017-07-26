'use strict';

angular.module('dleduWebApp')
    .controller('IndexCtrl', function ($scope, $rootScope,AuthService, CollegeService,NoticeService, $state, messageService, $timeout,SchoolService,CommonService,$location) {
        $scope.indexFn={
            schoolInfo:{},
            schoolLogo:"",
            currentActive:"index",
            params:{
                orgId: "",
                pageNumber:1,
                pageSize: 10
            },
            emHost:"http://emdev.aizhixin.com",
            boutiqueCourseList:[],
            excellentTeacherList:[],
            hotMajorList:[],
            shuffImageList:[],
            showSlidNav:false,
            noticeList:[],
            currentTab:"notice",
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
                                    "url": entity.href,
                                    "id": index
                            }
                            _this.shuffImageList.push(temp);
                        })

                    })
                    .catch(function (error) {

                    })
            },
            getNoticeList:function () {
                var _this=this;
                var params = _this.params;
                params.pageNumber= 1,
                params.pageSize= 5,
                params.published=1,
                params.organId=_this.params.orgId;
                NoticeService.getNoticeList(params).$promise
                    .then(function (data) {
                        _this.noticeList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            formatDate:function (date,format) {
               var arr=date.split("-");
               if(format=="yyyy/MM"){
                   return arr[0]+"/"+ arr[1];
               }else {
                   return arr[2];
               }
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
            cutHtml:function (str,len) {
                return CommonService.strCut(str,len)
            },
            toEmHostInit:function () {
                var _this=this;
                var urlArr=$location.host().split('.');
                var  urlOne ="";
                var  urlTwo ="";
                if(urlArr.length==4){
                    urlOne =urlArr[1];
                    urlTwo =urlArr[2];
                    if(urlOne=="schooltest"){
                        _this.emHost="http://emtest.aizhixin.com/classicalCourse/";
                    }else if(urlOne=="school" || urlOne=="schooluat"){
                        if(urlTwo =="dlztc"){
                            _this.emHost="http://em.dlztc.com/classicalCourse/";
                        }else {
                            _this.emHost="http://em.aizhixin.com/classicalCourse/";
                        }
                    }else {
                        _this.emHost="http://emdev.aizhixin.com/classicalCourse/";
                    }
                }else {
                    _this.emHost="http://emdev.aizhixin.com/classicalCourse/";
                }
            },
            tabToggle:function(entity){
                this.currentTab=entity;
            },
            tabToDetail:function(){
                if(this.currentTab=="notice"){
                    $state.go("noticelist");
                }else {
                    $state.go("hotmajorlist");
                }
            },
           init:function () {
                var _this=this;
               _this.toEmHostInit();
               _this.schoolInfo=  CommonService.getSchool();
               _this.params.orgId=_this.schoolInfo.id;
               _this.currentActive=$state.current.name;
                _this.getShuffImageList();
               _this.getHotMajorList();
               _this.getExcellentTeacherList();
               _this.getBoutiqueCourseList();
               _this.getLogoList();
               _this.getNoticeList();
           }
        };
        $timeout(function () {
            $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
                if(toState.name=="excellentteacherdetail"){
                    $scope.indexFn.currentActive="excellentteacherlist";
                }else if(toState.name=="hotmajordetail"){
                    $scope.indexFn.currentActive="hotmajorlist";
                }else if(toState.name=="noticedetail"){
                    $scope.indexFn.currentActive="noticelist";
                }else {
                    $scope.indexFn.currentActive=toState.name;
                }
            });
            $scope.indexFn.init();
        })

    });