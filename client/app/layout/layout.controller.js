/**
 * Created by Secmax on 16/6/7.
 */
'use strict';

angular.module('dleduWebApp')
    .controller('LayoutCtrl', function ($scope, $timeout, CommonService, $rootScope, AuthService, $window, $state,SchoolService) {
        $scope.product = CommonService.product;
        $rootScope.user = AuthService.getUser();
        $scope.layoutFn = {
           
            currentLink: $state.current.name,
            nav:[
                {name: '首页', url: 'home', selected: true},
                {name: '实践教学', url: 'enterpriseList', selected: false},
                {name: '统计报表', url: 'teachingSummary', selected: false},
            ],
            user: $rootScope.user,
            redirectTo : function(entity){
                var that = this;
                this.nav.forEach(function(c){
                    c.selected = false
                });
                entity.selected = true;
                $timeout(function(){
                    that.lcReload();
                }, 800);
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
            }
        };
        $scope.layoutFn.getLogoList();
        $scope.layoutFn.nav.forEach(function(c){
            c.selected = c.url == $scope.layoutFn.currentLink
        })
        $rootScope.$watch('user', function () {
            // console.log($rootScope.user);
            $scope.layoutFn.user = $rootScope.user;
        }, true);
        console.log($scope.layoutFn.currentLink);
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
