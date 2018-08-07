/**
 * Created by Secmax on 16/6/7.
 */
'use strict';

angular.module('dleduWebApp')
    .controller('LayoutCtrl', function ($scope, $timeout, $http, CommonService, $rootScope, AuthService, $window,
                                        $state, SchoolService, tempStorageService) {
        $scope.product = CommonService.product;
        $rootScope.user = AuthService.getUser();
        $scope.layoutFn = {
            currentLink: 'home',
            nav:[
                {name: '首页', url: 'home', selected: true},
                {name: '实践教学', url: 'workbench', selected: false},
                {name: '统计报表', url: 'teachingSummary', selected: false},
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
                SchoolService.defineProperty(entity.url).set();
                that.currentLink = entity.url;
                step && $state.go(step.url,{},{relative: $state.$current, reload: true});
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

            //判断角色是否应当授予权限
            isUseAuthority: function(auth){
                if(typeof auth.role == 'undefined'){
                    return true;
                }
                var user = AuthService.getUser();
                var roleNames = user.roleNames;
                for(var i = 0, length = roleNames.length; i < length; i++){
                    var roleName = roleNames[i];
                    if(roleName && roleName != '' && auth.role.indexOf(roleName) != -1){
                        return true;
                        break;
                    }
                }
                return false;
            },

            //根据权限重新生成新的菜单数据
            getMenusByAuth: function(datas){
                var tempItems = [];
                for(var i = 0, len = datas.length; i < len; i++){
                    var data = datas[i];
                    if(this.isUseAuthority(data)){
                        tempItems.push(data);
                    }
                }
                this.datas = tempItems;
            },


            /**
	         * 获取左边菜单配置
             */
            getLeftMenu: function(){
                var that = this;
                var sourceLeft = "app/layout/navigation/menu-items.json";
                $http.get(sourceLeft).then(function(res){
                    that.datas = res.data.items;
                    that.getMenusByAuth(that.datas);
                    //实践工作台查询统计数据 - 请勿删除
                    ($state.current.name == 'workbench') && ($scope.layoutFn.getSchoolStatistics());
                    that.datas.forEach(function(c){
                        var currentLink = tempStorageService.getObject("hometempmyurl$").url;
                        if(!currentLink && c.sref == 'home'){
                            c.selected = true;
                        }else{
                            c.selected = c.sref == currentLink;
                        }
                    })
                })
            },

            //点击添加背景颜色
            clickMenu : function(entity){
                var that = this;
                that.datas.forEach(function(c){
                    c.selected = false
                });
                tempStorageService.setObject('hometempmyurl$', {url: entity.sref, name: entity.title});
                this.navigateHome = entity.title;
                entity.selected = true;
            },

            //是否显示导航
            isShowBack: function(){
                var urlName = $state.current.name;
                if(urlName == 'home' || urlName == 'subindex' ){
                    return false;
                }
                return true;
            },

	        /**
             * 返回首页
             */
            goHome: function(){
                var myurl = tempStorageService.getObject("hometempmyurl$").url;
                var goUrl = myurl && myurl != '' ? myurl : 'home';
                if(goUrl == 'home'){
                    $state.go('home');
                }else{
                    var params = myurl.split(':')[1].substr(0,1);
                    $state.go('subindex',{type: params});
                }
            },

            init: function(){
                if($state.current.name == 'home'){
                    tempStorageService.removeObject("hometempmyurl$");
                }
                //页面刷新时给导航赋值
                var urlInfo = tempStorageService.getObject("hometempmyurl$");
                this.navigateHome = urlInfo ? urlInfo.name : '首页';
                $scope.layoutFn.getLogoList();
                $scope.layoutFn.getLeftMenu();
            }

        };
        $scope.layoutFn.init();

        $rootScope.$watch('user', function () {
            $scope.layoutFn.user = $rootScope.user;
        }, true);
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