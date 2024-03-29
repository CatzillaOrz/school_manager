'use strict';

angular.module('dleduWebApp')
    .controller('IndexCtrl', function ($scope, $rootScope,AuthService, CollegeService,NoticeService, $state, messageService, $timeout,SchoolService,CommonService,$location,$window,NewsService) {
        $rootScope.user = AuthService.getUser();
        $scope.indexFn={
            product:CommonService.product,
            user: $rootScope.user,
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
            showSlidNav:true,
            noticeList:[],
            currentTab:"notice",
            activeCourseIndex:4,
            activeFirstNotice:0,
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
            signOut: function () {
                AuthService.signOut();
            },
            navigate: function (host, path) {
                AuthService.navigation(host, path);
            },
            authority: function (entity) {
                var _this = this;
                return ("ROLE_ADMIN".indexOf(_this.user.roleNames.toString()) > -1 || "ROLE_ORG_ADMIN".indexOf(_this.user.roleNames.toString()) > -1);
            },
            //精品课程查询
            getBoutiqueCourseList:function () {
                var _this=this;
                var params = _this.params;
                params.pageSize=10;
                SchoolService.getBoutiqueCourseList(params).$promise
                    .then(function (data) {
                        _this.page=data.page;
                        _this.boutiqueCourseList=data.data;
                        $timeout(function () {
                            var swiper = new Swiper('.swiper-course-container', {
                                pagination: '.swiper-course-pagination',
                                nextButton: '.swiper-course-button-next',
                                prevButton: '.swiper-course-button-prv',
                                //loop: true,
                                // effect: 'fade',
                                //centeredSlides: true,
                                // autoplay: 5000,
                                spaceBetween: 20,
                                slidesPerView: 5,
                                paginationClickable: true,
                                // onSlideChangeEnd: function (swiper, current, total) {
                                //     $scope.$apply(function(){
                                //         _this.activeCourseIndex=swiper.realIndex;
                                //     })
                                // },
                                // onSlideChangeStart: function (swiper, current, total) {
                                //     $scope.$apply(function(){
                                //         _this.activeCourseIndex=-1;
                                //     })
                                // }
                            },100);
                        })

                    })
                    .catch(function (error) {

                    })
            },
            //优秀教师
            getExcellentTeacherList:function () {
                var _this=this;
                var params = _this.params;
                params.pageSize=5;
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
                params.pageSize=5;
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
                                    background: entity.imageUrl,
                                    //image: entity.imageUrl,
                                    "url": entity.href,
                                    "id": index,
                            }
                            _this.shuffImageList.push(temp);
                        })

                    })
                    .catch(function (error) {
                        var temp ={
                            background: "http://lorempixel.com/600/600/nature/1/",
                            //image: entity.imageUrl,
                            "url": "",
                            "id": "",
                        };
                        var temp1 ={
                            background: "http://lorempixel.com/600/600/nature/2/",
                            //image: entity.imageUrl,
                            "url": "",
                            "id": "",
                        }
                        _this.shuffImageList.push(temp);
                        _this.shuffImageList.push(temp1);
                    })
            },
            getNewsListByOrg:function () {
                var _this=this;
                var params = _this.params;
                params.pageNumber= 1,
                params.pageSize= 5,
                params.published=1,
                params.organId=_this.params.orgId;
                params.type=20,
                NewsService.getNewsListByOrg(params).$promise
                    .then(function (data) {
                        _this.noticeList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            formatDate:function (date,format) {
               var data=date.split(" ")[0];
               var arr=data.split("-");
               if(format=="yyyy-MM"){
                   return arr[0]+"-"+ arr[1];
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
            getHtmlFirstImg:function (html) {
                var matches = /src="(.*?)"/gi;
                var  results=null;
                results=matches.exec(html);
                if(results){
                    if(results.length>0){
                        return results[0].replace("src=","").replace(/\042/gi,"");
                    };
                }
                return "";

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
               if(_this.schoolInfo){
                   _this.params.orgId=_this.schoolInfo.id;
                   _this.currentActive=$state.current.name;
                   _this.getShuffImageList();
                   _this.getHotMajorList();
                   _this.getExcellentTeacherList();
                   _this.getBoutiqueCourseList();
                   _this.getLogoList();
                   _this.getNewsListByOrg();
               }else {
                   CommonService.msgDialog("您输入的地址有误!", 2);
               }
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