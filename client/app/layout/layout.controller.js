/**
 * Created by Secmax on 16/6/7.
 */
'use strict';

angular.module('dleduWebApp')
    .controller('LayoutCtrl', function ($scope, $timeout, CommonService, $rootScope, AuthService, $window, $state,
                                        SchoolService, tempStorageService) {
        var backConfig = {
            "periodlist": "subindex,0",
            "courselist": "subindex,0",
            "teachclasslist": "subindex,0",
            "elecfence": "subindex,0",
            "setlogo": "subindex,0",
            "setplayview": "subindex,0",
            "sethotmajor": "subindex,0",
            "setexcellentteacher": "subindex,0",
            "setboutiquecourse": "subindex,0",
            "boutiquecourseapply": "subindex,0",
            "schoolnewlist": "subindex,0",
            "setschoolnew": "subindex,0",
            "appnoticelist": "subindex,0",
            "appnoticeset": "subindex,0",

            "college.list": "subindex,1",
            "majorlist": "subindex,1",
            "classlist": "subindex,1",
            "teacher": "subindex,1",
            "studentlist": "subindex,1",
            "instructorList": "subindex,1",
            "batch.imp": "subindex,1",

            "attendtime": "subindex,2",
            "attendteacher": "subindex,2",
            "attendcollege": "subindex,2",
            "attendmajor": "subindex,2",
            "attendclass": "subindex,2",
            "instructor": "subindex,2",
            "holidayman": "subindex,2",
            "changecourse": "subindex,2",
            "changecourselist": "subindex,2",
            "teacherListSimplify": "subindex,2",
            "attendsetting": "subindex,2",
            "attendpause": "subindex,2",
            "attendfix": "subindex,2",
            "coursescore": "subindex,2",

            "evaquestion": "subindex,3",
            "evaquesamepart": "subindex,3",
            "evaquestiontea": "subindex,3",
            "teachingSupervisor": "subindex,3",
            "teachingData": "subindex,3",

            "workbench": "subindex,4",
            "enterpriseList": "subindex,4",
            "enttutorman": "subindex,4",
            "practicegroupman": "subindex,4",
            "trainClassList": "subindex,4",
            "missionList": "subindex,4",
            "newslist": "subindex,4",
            "teachingSummary": "subindex,4",
            "studentAttending": "subindex,4",
            "studentActive": "subindex,4",

            "stuProcess": "subindex,4",
            "stuJournal": "subindex,4",
            "impartProcess": "subindex,4",
            "stuRoutineCount": "subindex,4",
            "enterpriseDetail": "subindex,4",
            "stuReport": "subindex,4",
            "stuScore": "subindex,4",

            "dormbuildingman": "subindex,5",
            "dormman": "subindex,5",
            "payment": "subindex,5",

            "distlist": "subindex,5",
            "distedlist": "subindex,5",
        };
        $scope.product = CommonService.product;
        $rootScope.user = AuthService.getUser();
        $scope.layoutFn = {
            currentLink: 'home',
            nav:[
                {name: '学校信息管理', url:'subindex({type:0})', selected: true},
                {name: '学校机构人员', url:'subindex({type:1})', selected: false},
                {name: '教务考勤管理', url:'subindex({type:2})', selected: false},
                {name: '教学质量管理', url:'subindex({type:3})', selected: false},
                {name: '实践教学', url:'subindex({type:4})', selected: false},
                {name: '迎新管理', url:'subindex({type:5})', selected: false},
                {name: '权限管理', url:'subindex({type:6})', selected: false}
            ],
            schoolStatistics: {},
            tab: true,


			stepOne: [
				{title: '导入院系信息', url:'college.list', tab: 0},
				{title: '导入专业信息', url: 'majorlist', tab: 0},
				{title: '导入班级信息', url: 'classlist', tab: 0},
				{title: '导入辅导员信息', url: 'instructorList', tab: 0},
				{title: '导入企业信息', url: 'enterpriseList', tab: 1},
				{title: '导入企业导师信息', url: 'enttutorman', tab: 1}
            ],
            stepTwo: [
                {title: '导入基础数据', url: '', tab: 1},
                {title: '创建实践计划', url: 'practicegroupman', tab: 1},
                {title: '关联企业导师', url: 'practicegroupman', tab: 1},
                {title: '数据汇总统计', url: 'teachingSummary', tab: 2},

            ],
            user: $rootScope.user,
            redirectTo : function(entity, step){
                var that = this;
                this.nav.forEach(function(c){
                    c.selected = false
                });
                entity.selected = true;
                that.currentLink = entity.url;
                tempStorageService.setObject('hometempmyurl$', {url: entity.url});
                //step && $state.go(step.url,{},{relative: $state.$current, reload: true});
            },
            goHome: function(){
                tempStorageService.setObject('hometempmyurl$', {url: "home"});
                this.nav.forEach(function(c){
                    c.selected = false;
                })
            },
            redirectStep: function(){
                
            },
            signOut: function () {
                AuthService.signOut();
            },
            navigate: function (host, path) {
                AuthService.navigation(host, path);
            },
            lcReload: function () {
                $window.location.reload();
            },
            //返回
            backPre: function () {
                var pathArr = $scope.backUrl.split(",")
                $state.go(pathArr[0], {type:pathArr[1]});
            },
            //是否显示返回按钮
            isShowBack: function(){
                var urlName = $state.current.name;
                if(urlName == 'home' || urlName == 'subindex' ){
                    return false;
                }
                return true;
            },
            getLogoList:function () {
                var _this=this;
                var params={
                    orgId:AuthService.getUser().orgId
                };
                SchoolService.getLogoList(params).$promise
                    .then(function (data) {
                        angular.forEach(data.data,function (temp) {
                            if(temp.logoSort==1){
                                _this.user.orgLogo=temp.logoUrl;
                            }
                        })
                    })
                    .catch(function (error) {

                    })
            },
            toIndex:function () {
                //$window.location.href
                var domain=AuthService.getCurrentEnvDomain()[5];
                var url=AuthService.getUser().orgCode+"."+domain;
                window.open( '//' +url, "_blank")
            },
            getSchoolStatistics:function () {
                var _this=this;
                var params={
                    orgId:AuthService.getUser().orgId
                };
                SchoolService.getSchoolStatistics(params).$promise
                    .then(function (data) {
                        _this.schoolStatistics = data;
                    })
                    .catch(function (error) {

                    })
            },
            init: function(){
                if($state.current.name == 'home'){
                    tempStorageService.removeObject("hometempmyurl$")
                }
                $scope.layoutFn.getLogoList();
                //($state.current.name == 'workbench') && ($scope.layoutFn.getSchoolStatistics());
                $scope.layoutFn.nav.forEach(function(c){
                    var currentLink = tempStorageService.getObject("hometempmyurl$").url;
                    c.selected = c.url == currentLink;
                })
            }
        };
        $scope.layoutFn.init();

        $rootScope.$watch('user', function () {
            $scope.layoutFn.user = $rootScope.user;
        }, true);
        $scope.$on('$stateChangeSuccess', function () {
            var currentName = $state.current.name;
            $scope.isBack = false;
            $scope.backUrl = backConfig[currentName];
            if($scope.backUrl){
                $scope.isBack = true;
            }
        });
    })

    .directive('smartInclude', function () {
            return {
                replace: true,
                restrict: 'A',
                templateUrl: function (element, attr) {
                    return attr.smartInclude;
                },
                compile: function(element){
                    element[0].className = element[0].className.replace(/placeholder[^\s]+/g, '');
                }
            };
        }
    )

    .directive('smartLayout', function ($rootScope, $timeout, $interval, $q) {

//         var _debug = 0;
//
//         function getDocHeight() {
//             var D = document;
//             return Math.max(
//                 D.body.scrollHeight, D.documentElement.scrollHeight,
//                 D.body.offsetHeight, D.documentElement.offsetHeight,
//                 D.body.clientHeight, D.documentElement.clientHeight
//             );
//         }
//
//         var initialized = false,
//             initializedResolver = $q.defer();
//         initializedResolver.promise.then(function () {
//             initialized = true;
//         });
//
//         var $window = $(window),
//             $document = $(document),
//             $html = $('html'),
//             $body = $('body'),
//             $navigation,
//             $menu,
//             $ribbon,
//             $footer,
//             $contentAnimContainer;
//
//
//         (function cacheElements() {
//             $navigation = $('#header');
//             $menu = $('#left-panel');
//             $ribbon = $('#ribbon');
//             $footer = $('.page-footer');
//             if (_.every([$navigation, $menu, $ribbon, $footer], function ($it) {
//                     return angular.isNumber($it.height())
//                 })) {
//                 initializedResolver.resolve();
//             } else {
//                 $timeout(cacheElements, 100);
//             }
//         })();
//
//
//
//         return {
//             priority: 2014,
//             restrict: 'A',
//             compile: function (tElement, tAttributes) {
//                 tElement.removeAttr('smart-layout data-smart-layout');
//
//                 var appViewHeight = 0,
//                     appViewWidth = 0,
//                     calcWidth,
//                     calcHeight,
//                     deltaX,
//                     deltaY;
//
//                 var forceResizeTrigger = false;
//
//                 function resizeListener() {
//
// //                    full window height appHeight = Math.max($menu.outerHeight() - 10, getDocHeight() - 10);
//
//                     var menuHeight = $body.hasClass('menu-on-top') && $menu.is(':visible') ? $menu.height() : 0;
//                     var menuWidth = !$body.hasClass('menu-on-top') && $menu.is(':visible') ? $menu.width() + $menu.offset().left : 0;
//
//                     var $content = $('#content');
//                     var contentXPad = $content.outerWidth(true) - $content.width();
//                     var contentYPad = $content.outerHeight(true) - $content.height();
//
//
//                     calcWidth = $window.width() - menuWidth - contentXPad;
//                     calcHeight = $window.height() - menuHeight - contentYPad - $navigation.height() - $ribbon.height() - $footer.height();
//
//                     deltaX = appViewWidth - calcWidth;
//                     deltaY = appViewHeight - calcHeight;
//                     if (Math.abs(deltaX) || Math.abs(deltaY) || forceResizeTrigger) {
//
//                         //console.log('exec', calcWidth, calcHeight);
//                         $rootScope.$broadcast('$smartContentResize', {
//                             width: calcWidth,
//                             height: calcHeight,
//                             deltaX: deltaX,
//                             deltaY: deltaY
//                         });
//                         appViewWidth = calcWidth;
//                         appViewHeight = calcHeight;
//                         forceResizeTrigger = false;
//                     }
//                 }
//
//
//                 var looping = false;
//                 $interval(function () {
//                     if (looping) loop();
//                 }, 300);
//
//                 var debouncedRun = _.debounce(function () {
//                     run(300)
//                 }, 300);
//
//                 function run(delay) {
//                     initializedResolver.promise.then(function () {
//                         attachOnResize(delay);
//                     });
//                 }
//
//                 run(10);
//
//                 function detachOnResize() {
//                     looping = false;
//                 }
//
//                 function attachOnResize(delay) {
//                     $timeout(function () {
//                         looping = true;
//                     }, delay);
//                 }
//
//                 function loop() {
//                     $body.toggleClass('mobile-view-activated', $window.width() < 979);
//
//                     if ($window.width() < 979)
//                         $body.removeClass('minified');
//
//                     resizeListener();
//                 }
//
//                 function handleHtmlId(toState) {
//                     if (toState.data && toState.data.htmlId) $html.attr('id', toState.data.htmlId);
//                     else $html.removeAttr('id');
//                 }
//
//                 $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//                     //console.log(1, '$stateChangeStart', event, toState, toParams, fromState, fromParams);
//
//                     handleHtmlId(toState);
//                     detachOnResize();
//                 });
//
//                 // initialized with 1 cause we came here with one $viewContentLoading request
//                 var viewContentLoading = 1;
//                 $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
//                     //console.log(2, '$viewContentLoading', event, viewConfig);
//                     viewContentLoading++;
//                 });
//
//                 $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//                     //console.log(3, '$stateChangeSuccess', event, toState, toParams, fromState, fromParams);
//                     forceResizeTrigger = true;
//                 });
//
//                 $rootScope.$on('$viewContentLoaded', function (event) {
//                     //console.log(4, '$viewContentLoaded', event);
//                     viewContentLoading--;
//
//                     if (viewContentLoading == 0 && initialized) {
//                         debouncedRun();
//                     }
//                 });
//             }
//         }
    });
