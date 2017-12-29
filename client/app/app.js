'use strict';

angular.module('dleduWebApp', [
    'ngSanitize',
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule',
    'dleduWebAppComponents',
    'dleduWebService',
    'dlFilters',
    'ngDialog',
    'validation',
    'validation.rule',
    'ncy-angular-breadcrumb',
    'ngFileUpload',
    'ui.select2',
    'courseSchedule',
    'azx.swiper',
    'azx.common',
    "ngTable",
    'ngJcrop',
    'ngUeditor',
    'angular-echarts',
    'angular-datepicker',
    'frapontillo.bootstrap-switch',
    'ui.select'
])
    .factory('httpInterceptor', ['$q', '$injector', function ($q, $injector) {
        var _location = $injector.get('$location');
        /**
         *
         * @param status 是否隐藏
         * @param type 添加类型 part局部添加 all整个添加
         */
        function loading(status, type) {
            var divParent = '.show-container', imgSub = 'show-loading-img';
            if(type == 'part'){
                divParent = '.show-container-part';
                imgSub = 'show-loading-imgsub';
            }
            var html = '<div class="show-curtain"><img class="' + imgSub + '" src="http://oli56k5b0.bkt.clouddn.com/loading.gif"></div>';
            $('body').append('<div class="show-container"></div>');
            if (status) {
                if ($(divParent + ' .show-curtain').length === 0) {
                    $(divParent).append(html);
                }
            } else {
                $(divParent + ' .show-curtain').remove();
                $(".show-container").remove();
            }
        };
        //配置httpInterceptor
        return {
            'responseError': function (response) {
                loading(false,'all')
                if (response.status == 401 || response.data == "该用户id信息不存在!") {
                    var AuthService = $injector.get('AuthService');
                    AuthService.clearUser();
                     _location.$$path != '/login' && (AuthService.navigation(0, '/login'));
                } else if (response.status === 404) {
                    // _window.location.href = '/404';
                } else if (response.status >= 500) {
                    // _window.location.href = '/500';
                }
                return $q.reject(response);
            },
            'response': function (response) {
                loading(false,'all')
                return response;
            },
            'request': function (config) {
                if(config.url.split('/').indexOf('geo') == -1&&config.url.split('/').indexOf('templet1') == -1&&config.method!="JSONP"){
                    loading(true,'all')
                }
                return config;
            },
            'requestError': function (config) {
                loading(false,'all')
                return $q.reject(config);
            }
        };
    }])
    .config(['$urlRouterProvider', '$locationProvider', '$stateProvider', '$httpProvider', 'localStorageServiceProvider','$breadcrumbProvider', function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider, localStorageServiceProvider,$breadcrumbProvider) {

        //加载拦截器
        $httpProvider.interceptors.push('httpInterceptor');
        //$http请求头配置
        $httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};
        // $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        //禁用 IE ajax request caching
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                console.log(u);
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/)
                    || !!u.match(/AppleWebKit/), //是否为移动终端
                    //ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部
                    google: u.indexOf('Chrome') > -1,
                    weixin: u.match(/MicroMessenger/i) == "MicroMessenger"
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };

        // console.log("language"+ CommonService.browser.language);
        // console.log('是否为Ie'+ CommonService.browser.versions.trident);
        if (browser.versions.trident) {
            $httpProvider.defaults.headers.common["Accept"] = 'text/plain';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }

        //localStorageService本地存储配置
        localStorageServiceProvider.setPrefix('aizhixin').setStorageType('localStorage').setNotify(true, true);
        var  url = window.location.hostname;
        //url="gzyd.schooltest.aizhixin.com";
        var domain = url.split('.')[0];
        console.log(domain);

        if(domain=='gdyd') {
            //入口路由配置
            $urlRouterProvider
                .otherwise('/apprenticeship');
        }else if(domain=='gllg'||domain=='glut'){
            $urlRouterProvider
                .otherwise('/templet1');
        }else{

            //入口路由配置
            $urlRouterProvider
                .otherwise('/index');
        }
        $stateProvider
            .state('base', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'app/layout/layout.html',
                        controller: 'LayoutCtrl'
                    }
                }
            });
        $locationProvider.html5Mode(true);

        $breadcrumbProvider.setOptions({
            prefixStateName: 'home'
        });
    }])
    .run(function ($state, $rootScope, AuthService, $window,CommonService,localStorageService) {
        localStorageService.remove('school');
        CommonService.getSchool();
       // 站内页面的访问权限验证
        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
            if (toState.access.requiredLogin && !AuthService.authorize()) {
                $window.location.href = '/login';
            }
        });
    });
