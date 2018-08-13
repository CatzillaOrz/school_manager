/**
 * Created by Secmax on 2017/2/11.
 */

'use strict';
/**
 * 账号登录相关
 */
angular.module("azx.schoolman", ['ui.bootstrap'])
    /**
     * 学校定制化header
     */
    .directive('azxSchoolManHeader', ['$window', function ($window) {
        return {
            restrict: 'EA',
            template: '' +
            '<div class="azx-school-header">' +
                '<div class="school-header">' +
                    '<div class="school-nav-bar">' +
                        '<div class="logo" ng-click="indexFn.goHome()"><img id="logo" ng-src="{{indexFn.schoolLogo.logoUrl || \'https://s.aizhixin.com/lib/logo.png\' }}" class="logo"/></div>' +
                        '<ul ng-if="indexFn.user" class="account">' +
                            '<li uib-dropdown="uib-dropdown" uib-dropdown-toggle="uib-dropdown-toggle" class="user-menu">' +
                                '<span class="user-avatar"><img ng-src="{{indexFn.user.avatar}}" class="avatar-30 img-circle"/></span>' +
                                '<span id="user-name" class="dropdown-toggle">' +
                                    '<span class="">{{indexFn.user.name || indexFn.user.login | cutStr:8}}</span> ' +
                                '</span>' +
                                '<span> | </span> ' +
                                '<a ng-click="indexFn.signOut()" class="signout"><span>退出</span></a> </span>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>',
            scope: {
                redirectUrl: '@',
                subnav: '='
            },
            transclude: true,
            controller: function ($scope, $rootScope, $timeout, AuthService, $window, $state,localStorageService, $location, $http, $interval, $templateCache) {
                $rootScope.user = AuthService.getUser();
                $rootScope.schoolInfo = AuthService.getSchoolInfoStore();
                $scope.indexFn = {
                    user: $rootScope.user,
                    schoolInfo: $rootScope.schoolInfo,
                    schoolLogo: "",
                    subnavArrow: '',
                    currentTab: 0,
                    currentRouter: "index",
                    showLearn: false,
                    signIn: function () {
                        //var isCustomize = _this.isCustomize();
                        var _pathName = '/schoolLogin?redirectUrl=' + $window.location.protocol + '//' + $window.location.host + "/schindex";
                        // if (!!$scope.redirectUrl && $scope.redirectUrl.indexOf("http://") >= 0) {
                        //     _pathName = '/login?redirectUrl=' + $scope.redirectUrl;
                        // } else if (!!$scope.redirectUrl && $scope.redirectUrl.indexOf("http://") == -1) {
                        //     _pathName = '/login?redirectUrl=' + $window.location.protocol + '//' + $window.location.host + $scope.redirectUrl;
                        // } else {
                        //     _pathName = '/login';
                        // }
                        AuthService.navigation(0, _pathName);
                    },
                    //点击图片到首页
                    goHome: function(){
                        $state.go("index");
                    },
                    isShowLearn: function () {
                        var _this = this;
                        var search = $location.search();
                        var showLearnReg=/\w*(\bgllg\b)|(\bglut\b)|(\bzxxy\b)|(\bzxkj\b)|(\bgcjs\b)|(\bsccj\b)\w*/;
                        if(AuthService.isLogin()){
                            var orgDomainName= AuthService.getUser().orgDomainName
                            if(orgDomainName=="gllg"||orgDomainName=="glut"||orgDomainName=="zxxy"||orgDomainName=="zxkj"||orgDomainName=="gcjs"||orgDomainName=="sccj"){
                                _this.showLearn=true;
                            }else {
                                _this.showLearn=false;
                            }
                        }else {
                            if(showLearnReg.test($window.location.hostname)){
                                _this.showLearn=true;
                            }
                            if (("org" in search) && search.org) {
                                if(search.org=="gllg"||search.org=="glut"||search.org=="zxxy"||search.org=="zxkj"||search.org=="gcjs"||search.org=="sccj"){
                                    _this.showLearn=true;
                                }else {
                                    _this.showLearn=false;
                                }
                            } else {
                                return false;
                            }
                        }

                    },
                    signOut: function () {
                        AuthService.clearUser();
                        AuthService.clearSiginPosition();
                        $http.post("api/account/signout");
                        $state.go("index");
                        //AuthService.signOut();
                    },
                    navigate: function (host, path) {
                        AuthService.navigation(host, path);
                    },
                    authority: function () {
                        return AuthService.authority();

                    },
                    getSchool: function () {
                        var _this = this;
                        if (_this.schoolInfo && _this.schoolInfo.logos) {
                            angular.forEach(_this.schoolInfo.logos, function (temp) {
                                if (temp.logoSort == 2) {
                                    _this.schoolLogo = temp;
                                }
                            })
                        }
                    },

                    currentActiveTabInit: function () {
                        var _hostname = $window.location.hostname;
                        var _urlarr = AuthService.contrastDomain(_hostname);
                        this.currentTab = _urlarr.indexOf(_hostname);
                    },
                    init: function () {
                        var _this = this;
                        _this.currentActiveTabInit();
                        _this.isShowLearn();
                        //_this.getSchool();

                    }
                };
                $scope.indexFn.init();

                $rootScope.$watch('user', function () {
                    // //console.log($rootScope.user);
                    $scope.indexFn.user = $rootScope.user;
                    //$scope.headerFn.menuRoute();
                }, true);
                $rootScope.$watch('schoolInfo', function () {
                    // //console.log($rootScope.user);
                    $scope.indexFn.schoolInfo = eval($rootScope.schoolInfo);
                    $scope.indexFn.getSchool();
                }, true);
            },
            link: function (scope, element, attr) {
                attr.fluid ? element.addClass('fluid') : element.removeClass('fluid');
                attr.inverse ? element.addClass('inverse-nav') : element.removeClass('inverse-nav');
                attr.alphaLight ? element.addClass('alpha-light-nav') : element.removeClass('alpha-light-nav');
                attr.alphaDark ? element.addClass('alpha-dark-nav') : element.removeClass('alpha-dark-nav');

                function onScroll(e) {
                    if ($window.document.body.scrollTop > 120) {
                        element.addClass('fixed-nav');
                        $(".nav-fiexd-box").fadeIn();
                    } else if ($window.document.body.scrollTop > 50 && $window.document.body.scrollTop < 100) {
                        element.removeClass('fixed-nav');
                        $(".nav-fiexd-box").fadeOut();
                    } else {
                        // $(".nav-fiexd-box").fadeIn();
                        element.find('.nav-fiexd-box').css('display', 'block');
                    }
                }

                // angular.element($window).bind('scroll', onScroll);
            }
        }
    }])

    /**
     * azxSchoolFooter directive
     * @data-product 各产品名称
     * @data-fiexd   默认false:没有滚动条时，自动向页面底部浮动; true:不会自动向页面底部浮动
     * @data-version 各产品版本
     * example：
     * <div azx-school-footer data-product='知新开卷' data-version='0.2.0'></div>
     */
    .directive('azxSchoolManFooter', ['$window', '$sce', '$interval', '$rootScope', function ($window, $sce, $interval, $rootScope) {
        return {
            restrict: 'EA',
            template: '' +
            '<div class="azx-school-footer"> ' +
            '    <div class="footer-content">' +
            '            <div class="footer-center">' +
            //'               <div class="version">{{footerFn.schoolInfo.data.name || "知新网"}} · ver.{{version}}</div>' +
            '               <div class="Copyright"><span>技术支持：北京知新树科技有限公司</span></div>' +
            // '               <div class="float-right">' +
            // '               <span class="QRcode" data-popover-title="知新网微信公众号" uib-popover-html="footerFn.qrWeixin" data-popover-trigger="footerFn.mouseenter">' +
            // '                   <i class="fa fa-lg fa-weixin"></i>' +
            // '               </span>' +
            // '               <span class="QRcode" data-popover-title="知新网QQ服务群" uib-popover-html="footerFn.qrQQ" data-popover-trigger="footerFn.mouseenter">' +
            // '                   <i class="fa fa-lg fa-qq"></i>' +
            // '               </div>' +
            // '               </span>' +
            // '           </div>' +
            '    </div>' +
            '</div>',
            scope: {
                product: '@',
                fiexd: '=',
                version: '@'
            },
            controller: function ($scope, $sce, $rootScope, AuthService) {
                //$rootScope.schoolInfo=AuthService.getSchoolInfoStore();
                $scope.footerFn = {
                    schoolInfo: $rootScope.schoolInfo,
                    connector: null,
                };
                $scope.product && ($scope.footerFn.connector = '');
                $rootScope.$watch('schoolInfo', function () {
                    // //console.log($rootScope.user);
                    $scope.footerFn.schoolInfo = $rootScope.schoolInfo;
                }, true);
            },
            link: function (scope, element, attr) {
                function init() {
                    if (!scope.fiexd) {
                        element.removeClass('footer-fiexd');
                        var _pageHeight, _scrollHeight;
                        $interval(function () {
                            _pageHeight = $window.document.body.offsetHeight;
                            _scrollHeight = $window.document.body.scrollHeight;
                            if (_scrollHeight > _pageHeight) {
                                // //console.log('有滚动条');
                                element.removeClass('footer-fiexd');
                            } else {
                                // //console.log("无滚动条");
                                element.addClass('footer-fiexd');
                            }
                        }, 500, 5);
                    }
                }

                angular.element($window).bind('resize', init);
                scope.$on("$stateChangeStart", function () {
                    init();
                });
                init();
            }
        }
    }]);

