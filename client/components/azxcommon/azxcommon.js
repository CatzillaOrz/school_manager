/**
 * Created by Secmax on 2017/2/11.
 */

'use strict';
/**
 * 账号登录相关
 */
angular.module("azx.common", ['ui.bootstrap'])
/**
 * 账号相关服务
 */
    .factory('AuthService', ['$rootScope', '$http', '$q', '$window', function ($rootScope, $http, $q, $window) {
        var AuthService = {
            setUser: function (user) {
                for (var _k in user) {
                    user[_k] == 'null' && (user[_k] = null);
                }
                user.userName = user.userName || user.name || user.shortName;
                // user.name = user.name || user.userName || user.shortName;
                user.avatar = user.avatar || 'http://oli56k5b0.bkt.clouddn.com/default_profile.jpg';
                angular.forEach(user.roleNames, function (role) {
                    if (role == 'ROLE_STUDENT') {
                        if (!user.role) {
                            user.role = role;
                        } else if (user.role == 'ROLE_TEACHER') {
                            // console.error('用户角色冲突，不能既是老师又是学生，请联系学院平台管理员查验数据。');
                        }
                    } else if (role == 'ROLE_TEACHER') {
                        if (!user.role) {
                            user.role = role;
                        } else if (user.role == 'ROLE_STUDENT') {
                            // console.error('用户角色冲突，不能既是老师又是学生，请联系学院平台管理员查验数据。');
                        }
                    }
                });
                var domain = $window.document.domain.split('.')[1];
                console.log(domain);
                if (domain == 'dlztc') {
                    if(AuthService.browser.versions().ie9){
                        Cookies.set('user', user);
                    }else {
                        Cookies.set('user', user, {domain: '.dlztc.com'});
                    }
                } else if (domain == 'aizhixin') {
                    if(AuthService.browser.versions().ie9){
                        Cookies.set('user', user);
                    }else {
                        Cookies.set('user', user, {domain: '.aizhixin.com'});
                    }
                } else {
                    Cookies.set('user', user);
                }
                $rootScope.user = user;
            },
            clearUser: function () {
                var domain = $window.document.domain.split('.')[1];
                if (domain == 'dlztc') {
                    Cookies.remove('user', {domain: '.dlztc.com'});
                    Cookies.remove('authorize', {domain: '.dlztc.com'});
                } else if(domain == 'aizhixin'){
                    Cookies.remove('user', {domain: '.aizhixin.com'});
                    Cookies.remove('authorize', {domain: '.aizhixin.com'});
                }else{
                    Cookies.remove('user');
                    Cookies.remove('authorize');
                }
                $rootScope.user = undefined;
            },
            getUser: function () {
                // console.log(Cookies.getJSON('user'));
                return Cookies.getJSON('user');
            },
            signIn: function (username, password) {
                var deferred = $q.defer();
                $http.post("api/signin", {
                    username: username,
                    password: password
                })
                    .success(function (user) {
                        console.log(user);
                        if (!!user) {
                            AuthService.setUser(user);
                            var domain = $window.document.domain.split('.')[1];
                            if (domain == 'dlztc') {
                                if(AuthService.browser.versions().ie9){
                                    Cookies.set('authorize', true);
                                }else {
                                    Cookies.set('authorize', true, {domain: '.dlztc.com'});
                                }
                            } else if(domain == 'aizhixin'){
                                if(AuthService.browser.versions().ie9){
                                    Cookies.set('authorize', true);
                                }else {
                                    Cookies.set('authorize', true, {domain: '.aizhixin.com'});
                                }

                            }else{
                                Cookies.set('authorize', true);
                            }
                            deferred.resolve(user);
                            return user;
                        }
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            },
            logIn: function (username, password) {
                return $http.post("api/signin", {
                    username: username,
                    password: password
                });
            },
            refreshUser: function () {
                if (AuthService.authorize()) {
                    $http.get("api/account")
                        .success(function (user) {
                            AuthService.setUser(user);
                        })
                        .error(function (e) {
                            AuthService.clearUser();
                        });
                }
            },
            signOut: function (redirectUrl) {
                AuthService.clearUser();
                $window.location.href = redirectUrl || '/';
                $http.post("api/account/signout");
            },
            authorize: function () {
                return Cookies.getJSON('authorize');
            },
            contrastDomain: function (host) {
                //各开发环境域名配置
                var _headerLink = {
                    DEV: ['dledudev.aizhixin.com', 'emdev.aizhixin.com', 'ptdev.aizhixin.com', 'hydev.aizhixin.com', 'dddev.aizhixin.com'],
                    TEST: ['dledutest.aizhixin.com', 'emtest.aizhixin.com', 'pttest.aizhixin.com', 'hytest.aizhixin.com', 'ddtest.aizhixin.com'],
                    PDE: ['www.dlztc.com', 'em.dlztc.com', 'pt.dlztc.com', 'hy.dlztc.com', 'dd.dlztc.com'],
                    SDE: ['www.aizhixin.com', 'em.aizhixin.com', 'pt.aizhixin.com', 'hy.aizhixin.com', 'dd.aizhixin.com']
                };
                var _urlarr = [];
                for (var _k in _headerLink) {
                    angular.forEach(_headerLink[_k], function (obj) {
                        if (host == obj) {
                            _urlarr = _headerLink[_k];
                        }
                    })
                }
                return _urlarr;
            },
            navigation: function (link, pathname) {
                var _hostname = $window.location.hostname;
                var _host = $window.location.host;
                var _urlarr = this.contrastDomain(_hostname);
                var _pathname = pathname || '';
                if (_hostname != 'localhost' && _urlarr.length > 0) {
                    $window.location.href = 'http://' + _urlarr[link] + _pathname;
                } else {
                    (!!_pathname ? $window.location.href = 'http://' + _host + _pathname : console.warn('没有发现跳转路径'));
                }
            },
            browser:{
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    var browser=navigator.appName
                    var b_version=navigator.appVersion
                    var version=b_version.split(";");
                    var trim_Version=version[1].replace(/[ ]/g,"");
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
                        weixin:u.match(/MicroMessenger/i)=="MicroMessenger",
                        ie9:browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0"
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            }
        };
        return AuthService;
    }])
    /**
     * 图片相关服务
     */
    .factory('ImageService', [function () {

        var ImageService = {

            /**
             * 把文件转换成Image对象
             * @param file
             * @returns {*} image对象
             */
            convertFileToImage: function (file, callback) {
                var that = this;
                var image;
                that.imgFile = file;
                var reader = new FileReader();
                reader.onload = function () {
                    // 通过 reader.result 来访问生成的 DataURL
                    var url = reader.result;
                    image = new Image();
                    image.src = url;
                    callback(image);
                };
                reader.readAsDataURL(file);
            },
            /**
             * 把image裁剪成特定大小的图片对象
             * @param image image对象
             * @param actionParams {offsetX:x轴偏移量，offsetY: y轴偏移量 width : 剪裁区域的宽度，height:剪裁区域的高度 }
             * @param dWidth 剪裁后图片的宽度
             * @param dHeight 剪裁后图片的高度
             * @returns {Blob} blob 图片对象（image/png）
             */
            getCutImage: function (image, actionParams, dWidth, dHeight) {
                var that = this;
                var canvas = $('<canvas width="' + dWidth + '" height="' + dHeight + '"></canvas>')[0],
                    ctx = canvas.getContext('2d');
                ctx.drawImage(image, actionParams.offsetX, actionParams.offsetY, actionParams.width, actionParams.height, 0, 0, dWidth, dHeight);
                var data = canvas.toDataURL();
                data = data.split(',')[1];
                data = window.atob(data);
                var ia = new Uint8Array(data.length);
                for (var i = 0; i < data.length; i++) {
                    ia[i] = data.charCodeAt(i);
                }
                ;
                var blob = new Blob([ia], {type: "image/png"});
                return blob;
            },
        };
        return ImageService;
    }])
    /**
     * select2 动态加载参数获取服务
     */
    .factory('Select2LoadOptionsService', [function () {

        var Select2LoadOptionsService = {

            /**
             *
             * @param url 关键字查询的url
             * @param params 固定附加查询参数 注意此方法设置后就不可变
             * @param keyWord 查询关键字
             * @returns {{url: *, dataType: string, data: Select2LoadOptionsService.data, processResults: Select2LoadOptionsService.processResults, cache: boolean}}
             */
           getLoadOptions:function (url,params,keyWord) {
               return {
                   url: url,
                   dataType: 'json',
                   //delay: 250,
                   data: function (query) {
                       params[keyWord]=query.term;
                       return params;
                   },
                   processResults: function (data, params) {
                       params.page = params.page || 1;
                       return {
                           results: data.data,
                           pagination: {
                               more: (params.page * 30) < data.total_count
                           }
                       };
                   },
                   cache: true
               }
           }
        };
        return Select2LoadOptionsService;
    }])
    /**
     * azxHeader directive
     * @data-fluid 导航内容宽度扩展到100%，默认是最宽1200px
     * @data-inverse 深色导航条，默认是亮色
     * @data-subnav 二级菜单，登录后如果有数据才会显示，index:代表二级菜单的父级索引，navs:二级菜单对象队列，menu：默认菜单名称（必填），path：默认跳转链接（必填），tMenu：老师角色显示的菜单名称，tPath：老师角色跳转的链接，sMenu：学生角色显示的菜单名称，sPath：学生角色跳转的链接
     *
     *
     * 二级菜单设置，example：
     * html:
     * <div azx-header data-subnav='subnavdata'></div>
     * controller:
     *  $scope.subnavdata = {
            index: 0,  //0：知新网，1：开卷， 2：校场， 3：慧眼， 4：点点
            navs: [
                {menu: '首页', path:'/',tMenu: '首页',tPath: '/teacherhome',sMenu: '首页', sPath: '/studenthome'},
                {menu: '个人中心', path:'/userCenter',tMenu: '个人中心',tPath: '/userCenter',sMenu: '个人中心', sPath: '/userCenter'}
            ]
        }
     *
     *
     * 导航条样式设置，example：
     * <div azx-header data-fluid data-inverse></div>
     */
    .directive('azxHeader', ['$window', function ($window) {
        return {
            restrict: 'EA',
            template: '' +
            '<div class="azx-header">' +
            '   <div class="nav-fiexd-box">' +
            '       <div class="border-top"></div>' +
            '       <div class="nav-container">' +
            '           <a href="javascript:;" ng-click="headerFn.navigate(0)" class="azxlogo"><span><div azx-logo></div></span></a>' +
            '           <div class="logo-split"></div>' +
            '           <div class="logo-info">产教一体化学习管理<br/>配套解决方案</div>' +
            '           <ul ng-if="headerFn.user" class="account">' +
            '               <li uib-dropdown="uib-dropdown" uib-dropdown-toggle="uib-dropdown-toggle" class="user-menu">' +
            '                   <span class="user-avatar">' +
            '                       <img ng-src="{{headerFn.user.avatar}}" class="avatar-30 img-circle"/>' +
            '                   </span>' +
            '                   <span id="user-name" class="dropdown-toggle">' +
            '                       <span>{{headerFn.user.login | cutStr:8}}</span>' +
            '                       <i class="caret"></i>' +
            '                   </span>' +
            '               <ul uib-dropdown-menu="uib-dropdown-menu" aria-labelledby="user-name" class="dropdown-menu">' +
            '                   <li ng-repeat="anav in navigation.accountNav" class="{{anav.name}}"><a ng-if="anav.name != \'split\'" ng-click="headerFn.navigate(anav.host,anav.path)"><i class="fa {{anav.icon}}"></i><span>{{anav.name}}</span></a></li>' +
            // '                   <li><a ng-click="headerFn.navigate(0,\'/userCenter\')"><i class="fa fa-sun-o"></i><span>个人中心</span></a></li>' +
            // '                   <li><a ng-click="headerFn.navigate(0,\'/account\')"><i class="fa fa-vcard-o"></i><span>账号设置</span></a></li>' +
            // '                   <li class="split"></li>' +
            '                   <li><a ng-click="headerFn.signOut()"><i class="fa fa-sign-out"></i><span>退出</span></a></li>' +
            '               </ul>' +
            '               </li>' +
            // '               <li class="tool-bar"><span class="user-inbox"><i class="fa fa-inbox fa-2x"></i><span ng-if="true" class="badge">1</spanng-if></span></li>' +
            '           </ul>' +
            '           <button ng-if="!headerFn.user" class="btn-login" ng-click="headerFn.signIn()"><i class="fa fa-user fa-fw"></i> 登录</button>' +
            '           <div class="nav-split"></div>' +
            '           <ul id="navigation" class="navigation">' +
            // '               <li ng-click="headerFn.navigate(0)">首页' +
            // '                   <svg ng-if="headerFn.user && subnav.index == 0" class="subnav-arrow" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="0,10 12,10 6,4""/></svg>' +
            // '               </li>' +
            '               <li ng-repeat="mnav in navigation.mainNav" ng-click="headerFn.mainNavigate(mnav)">{{mnav.name}}' +
            '                   <svg ng-if="headerFn.user && subnav.index == $index+1" class="subnav-arrow" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="0,10 12,10 6,4""/></svg>' +
            '               </li>' +
            // '               <li ng-click="headerFn.navigate(1)">课程中心' +
            // '                   <svg ng-if="headerFn.user && subnav.index == 1" class="subnav-arrow" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="0,10 12,10 6,4""/></svg>' +
            // '               </li>' +
            // '               <li ng-click="headerFn.navigate(2)">实训中心' +
            // '                   <svg ng-if="headerFn.user && subnav.index == 2" class="subnav-arrow" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="0,10 12,10 6,4""/></svg>' +
            // '               </li>' +
            // '               <li ng-click="headerFn.navigate(4)">管理中心' +
            // '                   <svg ng-if="headerFn.user && subnav.index == 4" class="subnav-arrow" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon points="0,10 12,10 6,4""/></svg>' +
            // '               </li>' +
            '           </ul>' +
            '       </div>' +
            '   </div>' +
            '       <div ng-if="headerFn.user && subnav" class="nav-sub">' +
            '           <div class="nav-sub-container">' +
            '               <ul>' +
            '                   <li ng-click="headerFn.subNavigate(subItem.path)" ng-repeat="subItem in subnav.navs">{{subItem.menu}}</li>' +
            '               </ul>' +
            '           </div>' +
            '       </div>' +
            '</div>',
            scope: {
                redirectUrl: '@',
                subnav: '='
            },
            transclude: true,
            controller: function ($scope, $rootScope, $timeout, AuthService, $window, $http,CommonService) {
                $rootScope.user = AuthService.getUser();
                $scope.headerFn = {
                    user: $rootScope.user,
                    subnavArrow: '',
                    signOut: function () {
                        AuthService.signOut();
                    },
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
                    navigate: function (host, path) {
                        AuthService.navigation(host, path);
                    },
                    mainNavigate: function (nav) {
                        var that = this;
                        if (that.user && that.user.role == 'ROLE_TEACHER') {
                            AuthService.navigation(nav.host, nav.tpath);
                        } else if (that.user && that.user.role == 'ROLE_STUDENT') {
                            AuthService.navigation(nav.host, nav.spath);
                        } else {
                            AuthService.navigation(nav.host);
                        }
                    },
                    subNavigate: function (path) {
                        $window.location.href = $window.location.protocol + '//' + $window.location.host + path;
                    },
                    menuRoute: function () {
                        var that = this;
                        if ($scope.subnav && that.user) {
                            angular.forEach($scope.subnav.navs, function (nav) {
                                if (that.user.role == 'ROLE_TEACHER') {
                                    nav.menu = nav.tMenu || nav.menu;
                                    nav.path = nav.tPath || nav.path;
                                } else if (that.user.role == 'ROLE_STUDENT') {
                                    nav.menu = nav.sMenu || nav.menu;
                                    nav.path = nav.sPath || nav.path;
                                } else {
                                    nav.menu = nav.menu || '';
                                    nav.path = nav.path || '/';
                                }
                            });
                        }
                    }
                };
                if(AuthService.browser.versions.trident){
                    $scope.navigation = {
                        "mainNav": [
                            {
                                "name": "课程中心",
                                "host": 1,
                                "spath": "/index",
                                "tpath": "/index",
                                "subnav": []
                            },
                            {
                                "name": "实训中心",
                                "host": 2,
                                "spath": "/dashboard",
                                "tpath": "/dashboard"
                            },
                            {
                                "name": "管理中心",
                                "host": 4,
                                "spath": "/content",
                                "tpath": "/content"
                            }
                        ],
                        "accountNav": [
                            {
                                "name": "个人中心",
                                "host": 0,
                                "icon": "fa-sun-o",
                                "path": "/userCenter"
                            },
                            {
                                "name": "账号设置",
                                "host": 0,
                                "icon": "fa-vcard-o",
                                "path": "/account"
                            },
                            {
                                "name": "split"
                            }
                        ]
                    };
                }else{
                    $http({
                        method:  'GET' ,
                        url:  'http://oli56k5b0.bkt.clouddn.com/api/navigation.json'
                    }).success(function (res) {
                        $scope.navigation = res;
                    });
                }

                /*$http.get('http://oli56k5b0.bkt.clouddn.com/api/navigation.json').then(function (res) {
                    $scope.navigation = res.data;
                });
*/
                /*$http({
                    method:  'GET' ,
                    url:  'http://oli56k5b0.bkt.clouddn.com/api/navigation.json' ,
                    headers: {
                        'Content-Type' :  'text/html,application/xhtml+xml,application/xml',
                        'X-Requested-With':null
                    }
                }).success(function (data) {
                    console.log(data);
                });*/
                /*$http.get('http://oli56k5b0.bkt.clouddn.com/api/navigation.json' + new Date().getTime()).then(function (res) {
                    $scope.navigation = res.data;
                });*/
                $rootScope.$watch('user', function () {
                    // console.log($rootScope.user);
                    $scope.headerFn.user = $rootScope.user;
                    $scope.headerFn.menuRoute();
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
     * azxFooter directive
     * @data-product 各产品名称
     * @data-fiexd   默认false:没有滚动条时，自动向页面底部浮动; true:不会自动向页面底部浮动
     * @data-version 各产品版本
     * example：
     * <div azx-footer data-product='知新开卷' data-version='0.2.0'></div>
     */
    .directive('azxFooter', ['$window', '$sce', '$interval', '$rootScope', function ($window, $sce, $interval, $rootScope) {
        return {
            restrict: 'EA',
            template: '' +
            '<div class="azx-footer"> ' +
            '    <div class="footer-content">' +
            '            <div azx-logo class="azx-logo-gray"></div>' +
            '            <div class="footer-right">' +
            '               <div class="version">{{footerFn.connector}}{{product}} · ver.{{version}}</div>' +
            '               <div class="Copyright">Copyright © 2016-2018 北京知新树科技有限公司 aizhixin.com All Rights Reserved · <span>京ICP备16006959号-1</span></div>' +
            '               <div class="float-right">' +
            '               <span class="QRcode" data-popover-title="知新网微信公众号" uib-popover-html="footerFn.qrWeixin" data-popover-trigger="footerFn.mouseenter">' +
            '                   <i class="fa fa-lg fa-weixin"></i>' +
            '               </span>' +
            '               <span class="QRcode" data-popover-title="知新网QQ服务群" uib-popover-html="footerFn.qrQQ" data-popover-trigger="footerFn.mouseenter">' +
            '                   <i class="fa fa-lg fa-qq"></i>' +
            '               </div>' +
            '               </span>' +
            '           </div>' +
            '    </div>' +
            '</div>',
            scope: {
                product: '@',
                fiexd: '=',
                version: '@'
            },
            controller: function ($scope, $sce) {
                $scope.footerFn = {
                    connector: null,
                    mouseenter: 'mouseenter',
                    qrWeixin: $sce.trustAsHtml('<div class="barcode"><img src="http://oli56k5b0.bkt.clouddn.com/QRcode_weixin.jpg"/></div>'),
                    qrQQ: $sce.trustAsHtml('<div class="barcode"><img src="http://oli56k5b0.bkt.clouddn.com/QRcode_qq.png"/></div>'),
                    linksTop: [
                        {
                            "name": "世纪鼎利",
                            "href": "http://www.dingli.com/"
                        },
                        {
                            "name": "智翔教育",
                            "href": "http://www.ultrawise.com.cn/"
                        },
                        {
                            "name": "鼎利学院",
                            "href": "http://www.dingli.com/"
                        }
                    ],
                    linksBottom: [
                        /*{
                         "name": "关于我们",
                         "href": "javascript:void(0);"
                         },
                         {
                         "name": "联系我们",
                         "href": "javascript:void(0);"
                         },
                         {
                         "name": "加入我们",
                         "href": "javascript:void(0);"
                         },
                         {
                         "name": "帮助中心",
                         "href": "javascript:void(0);"
                         },
                         {
                         "name": "商务合作",
                         "href": "javascript:void(0);"
                         }*/
                    ]
                };
                $scope.product && ($scope.footerFn.connector = '');

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
                                // console.log('有滚动条');
                                element.removeClass('footer-fiexd');
                            } else {
                                // console.log("无滚动条");
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
    }])
    /**
     * 知新树logo
     */
    .directive('azxLogo', [function () {
        return {
            restrict: 'EA',
            template: '' +
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
            '<svg version="1.1" id="azxlogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 143 48.3" style="enable-background:new 0 0 143 48.3;" xml:space="preserve">' +
            '   <g>' +
            '      <path class="st0" d="M20.6,21.5c3.7,0,6.9,2.2,8.2,5.4c0.6-2.2,1-4.6,1-7c0-8-3.6-15.1-9.2-19.9c-5.6,4.8-9.2,11.9-9.2,19.9 c0,2.4,0.3,4.8,1,7C13.7,23.7,16.9,21.5,20.6,21.5"/>' +
            '      <path class="st0" d="M11.7,30.4c0-4.4,3.1-8,7.3-8.8c-0.4-0.7-0.8-1.4-1.3-2.1C13.7,14,7.5,11,0.9,10.7c-1.8,6.3-1,13.2,2.9,18.7 c2.7,3.9,6.6,6.5,10.9,7.8C12.9,35.5,11.7,33.1,11.7,30.4"/>' +
            '      <path class="st1" d="M17.6,19.5c-1.5-2.2-3.4-3.9-5.6-5.3c-0.4,1.8-0.6,3.7-0.6,5.7c0,2.4,0.3,4.8,1,7c0-0.1,0.1-0.1,0.1-0.2 c0-0.1,0.1-0.2,0.1-0.2c0.1-0.1,0.1-0.3,0.2-0.4c0-0.1,0.1-0.1,0.1-0.2c0.1-0.2,0.2-0.4,0.3-0.5c0,0,0,0,0-0.1 c0.3-0.4,0.6-0.8,0.9-1.1c0,0,0,0,0.1-0.1c0.2-0.2,0.3-0.3,0.5-0.4c0,0,0.1,0,0.1-0.1c0.2-0.1,0.4-0.3,0.5-0.4c0,0,0,0,0,0 c1-0.7,2.2-1.2,3.5-1.5C18.5,20.9,18.1,20.2,17.6,19.5"/>' +
            '      <path class="st0" d="M40.1,10.7C33.5,11,27.4,14,23.4,19.5c-0.5,0.7-0.9,1.4-1.3,2.1c4.2,0.7,7.4,4.4,7.4,8.8 c0,2.7-1.2,5.1-3.1,6.7c4.3-1.4,8.1-4,10.8-7.8C41.1,23.8,42,17,40.1,10.7"/>' +
            '      <path class="st1" d="M23.4,19.5c-0.5,0.7-0.9,1.4-1.3,2.1c1.6,0.3,3,1,4.2,1.9c0,0,0,0,0,0c0.2,0.2,0.4,0.3,0.5,0.5c0,0,0,0,0,0 c0.5,0.5,1,1.1,1.4,1.8c0,0,0,0.1,0.1,0.1c0.1,0.2,0.2,0.3,0.3,0.5c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0.1,0.2,0.1,0.2c0.6-2.2,1-4.6,1-7 c0-2-0.2-3.9-0.6-5.8C26.9,15.5,25,17.3,23.4,19.5"/>' +
            '      <path class="st0" d="M25.1,30.5c0-2.5-2-4.6-4.6-4.6c-2.5,0-4.6,2-4.6,4.6c0,1.6,0.9,3,2.1,3.9v8.9c0,1.3,1.1,2.4,2.4,2.4 c1.3,0,2.4-1.1,2.4-2.4v-8.9C24.3,33.5,25.1,32.1,25.1,30.5"/>' +
            '   </g>' +
            '   <g>' +
            '      <g>' +
            '           <path class="st2" d="M92.2,3.7c0,0-0.1,0-0.1,0c-2.7,0-4.9,2-5.3,4.6c0,0,0.1,0,0.1,0C89.5,8.3,91.8,6.3,92.2,3.7z"/>' +
            '           <path class="st3" d="M120.1,37c-0.7,0.5-1.6,0.6-2.4,0.5c0.1-0.8,0.5-1.5,1.2-2c0.7-0.5,1.6-0.6,2.4-0.5 C121.3,35.7,120.8,36.5,120.1,37"/>' +
            '      </g>' +
            '      <g>' +
            '           <path class="st4" d="M93.6,30.5v-6.4c0-0.2-0.2-0.4-0.4-0.4h-1.6c-0.2,0-0.4,0.2-0.4,0.4v5.7c0,1.7,1.4,3,3,3c0.1,0,0.1,0,0.2,0 c0.1,0,0-0.1,0-0.1C94.2,32.2,93.6,31.5,93.6,30.5z"/>' +
            '           <path class="st4" d="M141.2,9c-0.2,0-0.3,0-0.4,0c0,0,0,0-0.1,0c-0.1,0-0.2,0-0.4,0c-0.8,0-1.2-0.3-1.1-1.1V5.2 c0-0.2-0.2-0.4-0.4-0.4h-1.6c-0.2,0-0.4,0.2-0.4,0.4V8c0,0.7-0.5,1-1.1,1h-2.9c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3 h2.9c0.7,0.1,1,0.4,1.1,1v21.9c0,0.2,0.2,0.4,0.4,0.4h1.6c0.2,0,0.4-0.2,0.4-0.4V10.9c0-0.6,0.4-1,1.2-1.1c0.2,0,0.3,0,0.3,0 c0,0,0,0,0.1,0c0.1,0,0.2,0,0.3,0c0.2,0,0.3-0.2,0.3-0.3V9.3C141.6,9.1,141.4,9,141.2,9z"/>' +
            '           <path class="st4" d="M63.4,32.4c-3.3-1.8-4.5-9.3-5.3-11.4c-0.2-0.6-0.5-0.3-0.9-0.4c-0.7-0.1-0.7-1.4,0.3-1.4h5 c0.2,0,0.3-0.2,0.3-0.3v-0.1c0-0.2-0.2-0.3-0.3-0.3h-5.1c-0.2,0-0.4-0.1-0.4-0.4v-7.2c0-0.4,0.2-0.3,0.3-0.3h4.3 c0.2,0,0.3-0.2,0.3-0.3V10c0-0.2-0.2-0.3-0.3-0.3h-8.4c-1,0,0.1-1.8,0.3-2.7l0.4-1.5C53.9,5.2,53.7,5,53.4,5H52 c-0.3,0-0.6,0.2-0.7,0.5c-0.4,1.5-0.9,3-1.3,4.5c-0.1,0.3,0.1,0.5,0.4,0.5c1.3,0,2.5,0,3.8,0c0.1,0,0.3,0,0.3,0.4v7.1 c0,0.3-0.1,0.5-0.4,0.5H48c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3h5.9c0.1,0,0.4-0.1,0.3,0.3 c-0.3,3.4-4.4,12.3-6.2,12.8c-0.3,0.1-0.3,0.6,0,0.6h1.7c2.8,0,4.1-5,5.8-9c0.3-0.7,0.8-0.6,0.9-0.1c1.2,5,2.6,9.4,7,9.1 C63.8,32.8,63.7,32.5,63.4,32.4z"/>' +
            '           <path class="st4" d="M84.1,23.7h-1.6c-0.2,0-0.4,0.2-0.4,0.4v5.6c0,0,0,0.1,0,0.1c-0.1,1.1-1,2-2.2,2h-1.5c-1.2,0-2.2-1-2.2-2.2 v-6.6v-6.8v-0.5v-4.4c0-1.7-1.4-3-3-3h-4.9c-0.8,0-1.5,0.3-2,0.8V8.5c0-0.2-0.2-0.4-0.4-0.4h-1.6c-0.2,0-0.4,0.2-0.4,0.4v24.2 c0,0.2,0.2,0.4,0.4,0.4H66c0.2,0,0.4-0.2,0.4-0.4V9.9c0.4-0.6,1.1-1,1.8-1h3.6c1.2,0,2.2,1,2.2,2.2v1.5V19v6.8v3.9v0 c0,1.2-1,2.2-2.2,2.2h-3.6c-0.4,0-0.7-0.1-1-0.2v0.8c0.4,0.1,0.7,0.2,1.2,0.2h4.9c0.7,0,1.4-0.2,1.9-0.7c0.5,0.4,1.2,0.7,1.9,0.7 c1.5,0,3,0,4.5,0c1.7,0,3-1.4,3-3v-0.1v-3.3v-2.2C84.5,23.9,84.3,23.7,84.1,23.7z"/>' +
            '           <path class="st4" d="M84.9,13.5l-1.2-3c-0.1-0.2-0.3-0.3-0.4-0.3h-1.4c-0.2,0-0.2,0.1-0.2,0.3l0.7,2.4c0.7,2.2,2.3,2.5,3.8,2.5 c0.2,0,0.2-0.4,0.1-0.5C85.9,14.6,85.1,14.2,84.9,13.5z"/>' +
            '           <path class="st4" d="M92.3,10.3c-0.2,0-0.4,0.1-0.4,0.3l-1.2,3c-0.3,0.6-1.1,1.1-1.5,1.4c-0.1,0.1-0.1,0.5,0.1,0.5 c1.5,0,3.1-0.2,3.8-2.5l0.7-2.4c0.1-0.2,0-0.3-0.2-0.3H92.3z"/>' +
            '           <path class="st4" d="M80.3,9.2h14.6c0.2,0,0.3-0.2,0.3-0.3V8.7c0-0.2-0.2-0.3-0.3-0.3h-6.1c-0.6,0.2-1.3,0.3-2,0.3 c-0.2,0-0.4,0-0.6,0c0-0.1,0-0.2,0-0.3h-6c-0.2,0-0.3,0.2-0.3,0.3v0.1C79.9,9,80.1,9.2,80.3,9.2z"/>' +
            '           <path class="st4" d="M95.7,16.1h-7.2h-0.5h-8.2c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3h6c0.7,0,0.8,0.2,0.8,0.7v2.9 c0,0.5-0.2,0.7-0.7,0.8h-5.4c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3h5.4c0.6,0.1,0.7,0.4,0.8,0.9v9.7 c0,0.2,0.2,0.4,0.4,0.4h1h0.5h0.1c0.2,0,0.4-0.2,0.4-0.4V23c0-0.5,0.2-0.8,0.8-0.9h5.4c0.2,0,0.3-0.2,0.3-0.3v-0.1 c0-0.2-0.2-0.3-0.3-0.3h-5.4c-0.6-0.1-0.7-0.3-0.7-0.8v-2.9c0-0.5,0.1-0.7,0.8-0.7h6c0.2,0,0.3-0.2,0.3-0.3v-0.1 C96.1,16.3,95.9,16.1,95.7,16.1z"/>' +
            '           <path class="st4" d="M114,12h-1.6c-0.2,0-0.4,0.2-0.4,0.4v17.2c0,0,0,0.1,0,0.1c-0.1,1.1-1,2-2.2,2h-1.6c-1.2,0-2.2-1-2.2-2.2 V18.3c0-1,0.6-1.3,1.5-1.4h1.1c0.2,0,0.3-0.2,0.3-0.3v-0.1c0-0.2-0.2-0.3-0.3-0.3h-8.1c-0.9-0.1-1.2-0.4-1.3-1.4v-4.2 c0-3.3,3.5-2.4,5.2-2.5c1.5,0.1,3.2-0.2,3.6-1.3c0.3-0.7-0.2-0.7-0.5-0.7h-2.1c-0.5,0-0.6,0-1.2,0.5c-2.2,2.2-7.4-1.3-7.5,4v22.2 c0,0.2,0.2,0.4,0.4,0.4h1.6c0.2,0,0.4-0.2,0.4-0.4V18.5c-0.1-1,0.4-1.4,1.3-1.6h1.9c0.9,0,1.3,0.5,1.3,1.5v11.3c0,1.7,1.4,3,3,3 c1.5,0,3.1,0,4.6,0c1.7,0,3-1.4,3-3v-0.1V12.4C114.4,12.2,114.2,12,114,12z"/>' +
            '           <path class="st4" d="M134.9,12.2h-1.6c-0.2,0-0.4,0.2-0.4,0.4v17.5c0,2.2-1.5,2.4-2.3,0.4l-2.8-8.5l3.3-10.4 c0.5-1.6,0.1-2.6-1.9-2.6h-10.1c-0.8,0-1.2-0.3-1.1-1.1V5.2c0-0.2-0.2-0.4-0.4-0.4H116c-0.2,0-0.4,0.2-0.4,0.4V8 c0,0.7-0.5,1-1.1,1h-2.9c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3h2.9c0.7,0.1,1,0.4,1.1,1v21.9c0,0.2,0.2,0.4,0.4,0.4 h1.6c0.2,0,0.4-0.2,0.4-0.4V10.9c0-0.6,0.4-1,1.2-1.1h8.8c1.4,0,1.3,1.4,0.8,2.9l-2,6l-1.9-5.6c-0.2-0.4-0.4-0.5-1-0.5h-0.7 c-0.3,0-0.5,0.2-0.4,0.6l2.9,8.9l-2.8,8.5c-0.2,0.5-0.4,0.9-0.6,1.2c-0.2,0.2-0.7,1.1-0.1,1c1.4-0.3,2.8-1.4,3.2-2.7l1.4-4.5 l1.4,4.5c1,3.4,7.1,3.4,7.1-0.6V12.6C135.3,12.4,135.1,12.2,134.9,12.2z"/>' +
            '           <path class="st4" d="M120.9,12.1h-1.2c-0.2,0-0.3,0.1-0.3,0.3c0,6.7,0,13.4,0,20.1c0,0.2,0.1,0.3,0.3,0.3h1.2 c0.2,0,0.3-0.1,0.3-0.3c0-6.7,0-13.4,0-20.1C121.2,12.2,121.1,12.1,120.9,12.1z"/>' +
            '           <path class="st5" d="M48.2,35.7h2.1c1.1,0,1.9,0.2,2.5,0.6c0.6,0.4,0.9,1,0.9,1.8c0,0.4-0.1,0.8-0.3,1.2c-0.2,0.4-0.6,0.7-1,0.9 c0.7,0.2,1.3,0.6,1.6,1c0.4,0.4,0.6,1,0.6,1.6c0,0.8-0.3,1.5-1,2c-0.6,0.5-1.5,0.8-2.5,0.8h-2.9V35.7z M49.3,36.7v3.2h0.6 c0.9,0,1.6-0.1,2-0.4c0.4-0.3,0.7-0.7,0.7-1.3c0-1-0.7-1.5-2.1-1.5H49.3z M49.3,40.8v3.8h1.3c0.7,0,1.3-0.1,1.7-0.2 c0.4-0.1,0.6-0.4,0.9-0.7c0.2-0.3,0.3-0.6,0.3-0.9c0-0.3-0.1-0.6-0.2-0.8c-0.1-0.2-0.3-0.4-0.6-0.6c-0.2-0.2-0.5-0.3-0.9-0.4 c-0.3-0.1-1-0.1-1.9-0.1H49.3z"/>' +
            '           <path class="st5" d="M56.1,38.3h1v1.1c0.3-0.4,0.5-0.7,0.8-1c0.3-0.2,0.5-0.3,0.9-0.3c0.3,0,0.6,0.1,1,0.2l-0.5,0.8 C59,39,58.9,39,58.7,39c-0.3,0-0.6,0.1-0.9,0.4c-0.3,0.3-0.5,0.7-0.6,1.1c-0.1,0.5-0.2,1.3-0.2,2.5v2.5h-1V38.3z"/>' +
            '           <path class="st5" d="M60.4,36.2c0-0.2,0.1-0.4,0.2-0.6c0.2-0.2,0.4-0.2,0.6-0.2c0.2,0,0.4,0.1,0.6,0.2c0.2,0.2,0.2,0.3,0.2,0.6 c0,0.2-0.1,0.4-0.2,0.6c-0.2,0.2-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2C60.5,36.6,60.4,36.4,60.4,36.2 M60.7,38.3h1v7.3h-1V38.3 z"/>' +
            '           <rect x="63.6" y="35.4" class="st5" width="1" height="10.1"/>' +
            '           <rect x="66.5" y="35.4" class="st5" width="1" height="10.1"/>' +
            '           <path class="st5" d="M69.1,36.2c0-0.2,0.1-0.4,0.2-0.6c0.2-0.2,0.4-0.2,0.6-0.2c0.2,0,0.4,0.1,0.6,0.2c0.2,0.2,0.2,0.3,0.2,0.6 c0,0.2-0.1,0.4-0.2,0.6C70.4,36.9,70.2,37,70,37c-0.2,0-0.4-0.1-0.6-0.2C69.2,36.6,69.1,36.4,69.1,36.2 M69.5,38.3h1v7.3h-1V38.3z "/>' +
            '           <path class="st5" d="M80.3,38.3v7.3h-1v-1.3c-0.9,1-1.9,1.5-3,1.5c-1.1,0-2.1-0.4-2.9-1.2c-0.8-0.8-1.2-1.7-1.2-2.7 c0-1.1,0.4-2,1.2-2.7c0.8-0.8,1.7-1.1,2.8-1.1c1.3,0,2.3,0.5,3.1,1.5v-1.3H80.3z M79.3,42c0-0.8-0.3-1.5-0.9-2.1 c-0.6-0.6-1.3-0.9-2.2-0.9c-0.9,0-1.6,0.3-2.2,0.9c-0.6,0.6-0.9,1.3-0.9,2.1c0,0.8,0.3,1.5,0.9,2.1c0.6,0.6,1.3,0.9,2.2,0.9 c0.8,0,1.6-0.3,2.2-0.9C79,43.6,79.3,42.8,79.3,42"/>' +
            '           <path class="st5" d="M82.5,38.3h1v1.3c0.8-1,1.8-1.5,2.9-1.5c0.6,0,1.1,0.1,1.6,0.4c0.5,0.3,0.8,0.7,1,1.2 c0.2,0.5,0.3,1.2,0.3,2.1v3.8h-1v-3.5c0-0.9,0-1.4-0.1-1.7c-0.1-0.3-0.2-0.6-0.4-0.8c-0.2-0.2-0.4-0.4-0.7-0.5 c-0.3-0.1-0.6-0.2-1-0.2c-0.4,0-0.7,0.1-1.1,0.3c-0.4,0.2-0.7,0.4-0.9,0.7c-0.3,0.3-0.4,0.6-0.5,1c-0.1,0.3-0.1,1-0.1,2v2.7h-1 V38.3z"/>' +
            '           <path class="st5" d="M93.3,44.4c0,0.2,0,0.4,0.1,0.4c0.1,0,0.2,0.1,0.5,0.1h0.6v0.8c-0.4,0.1-0.7,0.1-1,0.1c-0.4,0-0.8-0.1-1-0.3 c-0.2-0.2-0.3-0.5-0.3-1v-5.5h-1.4v-0.8h1.4v-2.8h1v2.8h1.6v0.8h-1.6V44.4z"/>' +
            '           <rect x="100" y="35.7" class="st5" width="1.1" height="9.9"/>' +
            '           <path class="st5" d="M103.3,38.3h1v1.3c0.8-1,1.8-1.5,2.9-1.5c0.6,0,1.1,0.1,1.6,0.4c0.5,0.3,0.8,0.7,1,1.2 c0.2,0.5,0.3,1.2,0.3,2.1v3.8h-1v-3.5c0-0.9,0-1.4-0.1-1.7c-0.1-0.3-0.2-0.6-0.4-0.8c-0.2-0.2-0.4-0.4-0.7-0.5 c-0.3-0.1-0.6-0.2-1-0.2c-0.4,0-0.7,0.1-1.1,0.3c-0.4,0.2-0.7,0.4-0.9,0.7c-0.3,0.3-0.4,0.6-0.5,1c-0.1,0.3-0.1,1-0.1,2v2.7h-1 V38.3z"/>' +
            '           <path class="st5" d="M116.1,39.1l-0.6,0.6c-0.5-0.5-1.1-0.7-1.6-0.7c-0.3,0-0.6,0.1-0.8,0.3c-0.2,0.2-0.3,0.4-0.3,0.7 c0,0.3,0.1,0.5,0.4,0.7c0.2,0.2,0.6,0.5,1.2,0.7c0.6,0.3,1,0.6,1.3,0.9c0.3,0.3,0.5,0.7,0.5,1.2c0,0.6-0.2,1.1-0.7,1.6 c-0.5,0.4-1,0.6-1.7,0.6c-0.4,0-0.9-0.1-1.3-0.3c-0.4-0.2-0.7-0.4-1-0.8l0.6-0.7c0.5,0.5,1.1,0.8,1.6,0.8c0.4,0,0.7-0.1,1-0.4 c0.3-0.2,0.4-0.5,0.4-0.9c0-0.3-0.1-0.6-0.4-0.8c-0.2-0.2-0.7-0.5-1.2-0.7c-0.6-0.3-1-0.6-1.3-0.9c-0.3-0.3-0.4-0.7-0.4-1.3 c0-0.5,0.2-1,0.6-1.3c0.4-0.4,0.9-0.6,1.6-0.6C114.7,38.1,115.4,38.4,116.1,39.1"/>' +
            '           <rect x="117.8" y="38.3" class="st5" width="1" height="7.3"/>' +
            '           <path class="st5" d="M127.6,38.3h1v5.7c0,1-0.1,1.7-0.3,2.2c-0.2,0.5-0.5,0.9-0.8,1.2c-0.4,0.3-0.8,0.6-1.3,0.7 c-0.5,0.2-1,0.2-1.6,0.2c-2,0-3.4-0.8-4-2.3h1.1c0.6,1,1.5,1.4,2.9,1.4c0.7,0,1.2-0.1,1.7-0.4c0.5-0.2,0.8-0.5,1-0.9 c0.2-0.4,0.3-1,0.3-1.7v-0.3c-0.4,0.5-0.9,0.8-1.4,1c-0.5,0.2-1.1,0.3-1.7,0.3c-1.1,0-2.1-0.4-2.8-1.1c-0.8-0.7-1.1-1.6-1.1-2.6 c0-1,0.4-1.9,1.2-2.6c0.8-0.7,1.8-1.1,2.9-1.1c1.1,0,2.1,0.5,3,1.5V38.3z M127.7,41.8c0-0.8-0.3-1.5-0.9-2 c-0.6-0.5-1.3-0.8-2.1-0.8c-0.9,0-1.6,0.3-2.2,0.9c-0.6,0.6-0.9,1.3-0.9,2c0,0.8,0.3,1.4,0.9,1.9c0.6,0.5,1.3,0.8,2.2,0.8 c0.9,0,1.6-0.3,2.2-0.8C127.4,43.3,127.7,42.6,127.7,41.8"/>' +
            '           <path class="st5" d="M130.7,35.4h1v4.1c0.8-1,1.8-1.5,2.9-1.5c0.6,0,1.1,0.1,1.6,0.4c0.5,0.3,0.8,0.7,1,1.2 c0.2,0.5,0.3,1.2,0.3,2.1v3.8h-1v-3.5c0-0.8,0-1.3-0.1-1.6c0-0.3-0.2-0.6-0.3-0.8c-0.2-0.3-0.4-0.5-0.7-0.6 c-0.3-0.1-0.6-0.2-1-0.2c-0.4,0-0.8,0.1-1.1,0.3c-0.4,0.2-0.7,0.4-0.9,0.7c-0.3,0.3-0.4,0.6-0.5,1c-0.1,0.3-0.1,1-0.1,2v2.7h-1 V35.4z"/>' +
            '           <path class="st5" d="M141.5,44.4c0,0.2,0,0.4,0.1,0.4c0.1,0,0.2,0.1,0.5,0.1h0.6v0.8c-0.4,0.1-0.7,0.1-1,0.1c-0.4,0-0.8-0.1-1-0.3 c-0.2-0.2-0.3-0.5-0.3-1v-5.5h-1.4v-0.8h1.4v-2.8h1v2.8h1.6v0.8h-1.6V44.4z"/>' +
            '      </g>' +
            '   </g>' +
            '</svg>'
        }
    }])
    /**
     * step-line
     */
    .directive('stepLine', [function () {
        return {
            restrict: 'EA',
            template: '' +
            '   <div class="mt-step-col" ng-class="isDone($index+1)" ng-repeat="step in steps" style="width:{{width}}%">' +
            '       <div class="mt-step-number">{{$index+1}}</div>' +
            '       <div class="mt-step-title uppercase">{{step.title}}</div>' +
            '       <div class="mt-step-content">{{step.introduce}}</div>' +
            '   </div>',
            scope: {
                steps: '=',
                onStep: '='
            },
            controller: function ($scope) {
                /*$scope.onStep=1;
                 $scope.steps=[
                 {title:'第一步',introduce:'第一步的小文字介绍'},
                 {title:'第二步',introduce:'第二步的小文字介绍'},
                 {title:'第三步',introduce:'第三步的小文字介绍'}
                 ];*/
                !!$scope.steps && ($scope.width = 100 / $scope.steps.length);
                $scope.isDone = function (step) {
                    if ($scope.onStep == step) {
                        return 'active'
                    } else if ($scope.onStep > step) {
                        return 'done'
                    } else {
                        return null
                    }
                }
            }
        }
    }])

    /**
     * form-callback
     */
    .directive('azxAlert', [function () {
        return {
            restrict: 'EA',
            template: '<div uib-alert ng-class="\'alert-\' + (alert.type || \'warning\')" data-close="closeAlert()">{{alert.msg}}</div>',
            scope: {
                alert: '=',
                closeCallback: '&'
            },
            link: function (scope) {
                scope.alert = scope.alert || null;
                scope.closeAlert = function () {
                    scope.alert = null;
                }
            }
        }
    }])

    /**
     * 裁剪字符串的过滤器
     * 使用方法： {{scopeData | cutStr:10}}
     * 裁剪10位单字节字符串，如果有中文，中文占2个字节。未显示内容被替换为...
     */
    .filter('cutStr', [function () {
        return function (input, len) {
            /**
             * description : 得到字符串的字节长度,中文返回两个字节。
             ****************
             * @return 返回字符串的字节长度(eg:"一二12"的字节长度是6);
             */
            String.prototype.getLength = function () {
                var text = this.replace(/[^\x00-\xff]/g, "**");
                return text.length;
            };

            /**
             * description : 按字节长度截取字符串,并添加后缀。
             ****************
             * @param     len     需要截取的长度,字符串长度不足返回本身;
             * @param     alt     添加后缀(非必要),默认为"...";
             * @return    string  返回截取后的字符串;
             * @requires  String.prototype.getLength();
             */
            String.prototype.getShortForm = function (len, alt) {
                var tempStr = this;
                if (this.getLength() > len) {
                    if (!alt) {
                        alt = "...";
                    }
                    var i = 0;
                    for (var z = 0; z < len; z++) {
                        if (tempStr.charCodeAt(z) > 255) {
                            i = i + 2;
                        } else {
                            i = i + 1;
                        }
                        if (i >= len) {
                            tempStr = tempStr.slice(0, (z + 1)) + alt;
                            break;
                        }
                    }
                    return tempStr;
                } else {
                    return this + "";
                }
            };
            return input.getShortForm(len);
        }
    }])

    /**
     * 隐藏手机号码中间四位
     * 使用方法： {{scopeData | hidePhone}}
     */
    .filter('hidePhone', [function () {
        return function (phone) {
            phone && (phone = phone.substr(0, 3) + '****' + phone.substr(7));
            return phone
        }
    }]);


/**
 * 表单验证插件  使用中发现的bug或有扩展功能的需求及时与我联系-刘朝晖up
 *
 *
 * 使用方法：
 * 先引入依赖   angular.module('dleduWebApp', [ 'validation', 'validation.rule'])
 * jade例子
 * form(name='profieForm')
 *      .form-group
 *          label 真实姓名
 *          input.form-control(type='text' name='userName' placeholder='请填写真实姓名' ng-model='name' validator="required, maxlength=20")
 *      .form-group
 *          label 手机
 *          input.form-control(type='text' name='userPhone' placeholder='请填写手机号' ng-model='phone' validator="phone")
 *      .form-group
 *          label 电子邮箱
 *          input.form-control(type='text' name='userEmail' placeholder='请填写电子邮箱' ng-model='mail' validator="email, maxlength=60")
 *      button(type='submit' validation-submit="profieForm" ng-click='updateUser()') 保存
 */
angular.module('validation', ['validation.provider', 'validation.directive']);
angular.module('validation.provider', []);
angular.module('validation.directive', ['validation.provider']);


(function () {
    angular
        .module('validation.provider')
        .provider('$validation', Provider);

    function Provider() {
        var $injector;
        var $scope;
        var $http;
        var $q;
        var $timeout;
        var _this = this;

        /**
         * Setup the provider
         * @param injector
         */
        var setup = function (injector) {
            $injector = injector;
            $scope = $injector.get('$rootScope');
            $http = $injector.get('$http');
            $q = $injector.get('$q');
            $timeout = $injector.get('$timeout');
        };

        /**
         * Define validation type RegExp
         * @type {{}}
         */
        var expression = {};

        /**
         * default valid method
         * @type {{}}
         */
        var validMethod = null;

        /**
         * default error, success message
         * @type {{}}
         */
        var defaultMsg = {};

        /**
         * Allow user to set a custom Expression, do remember set the default message using setDefaultMsg
         * @param obj
         * @returns {*}
         */
        this.setExpression = function (obj) {
            angular.extend(expression, obj);
            return _this;
        };

        /**
         * Get the Expression
         * @param exprs
         * @returns {*}
         */
        this.getExpression = function (exprs) {
            return expression[exprs];
        };

        /**
         * Allow user to set default message
         * @param obj
         * @returns {*}
         */
        this.setDefaultMsg = function (obj) {
            angular.extend(defaultMsg, obj);
            return _this;
        };

        /**
         * Get the Default Message
         * @param msg
         * @returns {*}
         */
        this.getDefaultMsg = function (msg) {
            return defaultMsg[msg];
        };

        /**
         * allow user to set the global valid method
         * @param v
         * @returns {*}
         */
        this.setValidMethod = function (v) {
            validMethod = v;
        };

        /**
         * Get the valid method
         * @returns {*}
         */
        this.getValidMethod = function () {
            return validMethod;
        };

        /**
         * Override the errorHTML function
         * @param func
         * @returns {*}
         */
        this.setErrorHTML = function (func) {
            if (func.constructor !== Function) {
                return;
            }
            _this.getErrorHTML = func;
            return _this;
        };

        /**
         * Invalid message HTML, here's the default
         * @param message
         * @returns {string}
         */
        this.getErrorHTML = function (message) {
            return '<p class="validation-invalid">' + message + '</p>';
        };

        /**
         * Override the successHTML function
         * @param func
         * @returns {*}
         */
        this.setSuccessHTML = function (func) {
            if (func.constructor !== Function) {
                return;
            }
            _this.getSuccessHTML = func;
            return _this;
        };

        /**
         * Valid message HTML, here's the default
         * @param message
         * @returns {string}
         */
        this.getSuccessHTML = function (message) {
            return '<p class="validation-valid">' + message + '</p>';
        };

        /**
         * Whether show the validation success message
         * You can easily change this to false in your config
         * example: $validationProvider.showSuccessMessage = false;
         * @type {boolean}
         */
        this.showSuccessMessage = true;

        /**
         * Whether show the validation error message
         * You can easily change this to false in your config
         * example: $validationProvider.showErrorMessage = false;
         * @type {boolean}
         */
        this.showErrorMessage = true;

        /**
         * Check form valid, return true
         * checkValid(Form): Check the specific form(Form) valid from angular `$valid`
         * @param form
         * @returns {boolean}
         */
        this.checkValid = function (form) {
            return !!(form && form.$valid);
        };

        /**
         * Validate the form when click submit, when `validMethod = submit`
         * @param form
         * @returns {promise|*}
         */
        this.validate = function (form) {
            var deferred = $q.defer();
            var idx = 0;

            if (form === undefined) {
                console.error('This is not a regular Form name scope');
                deferred.reject('This is not a regular Form name scope');
                return deferred.promise;
            }

            if (form.validationId) { // single
                $scope.$broadcast(form.$name + 'submit-' + form.validationId, idx++);
            } else if (form.constructor === Array) { // multiple
                for (var k in form) {
                    $scope.$broadcast(form[k].$name + 'submit-' + form[k].validationId, idx++);
                }
            } else {
                for (var i in form) { // whole scope
                    if (i[0] !== '$' && form[i].hasOwnProperty('$dirty')) {
                        $scope.$broadcast(i + 'submit-' + form[i].validationId, idx++);
                    }
                }
            }

            deferred.promise.success = function (fn) {
                deferred.promise.then(function (value) {
                    fn(value);
                });
                return deferred.promise;
            };

            deferred.promise.error = function (fn) {
                deferred.promise.then(null, function (value) {
                    fn(value);
                });
                return deferred.promise;
            };

            $timeout(function () {
                if (_this.checkValid(form)) {
                    deferred.resolve('success');
                } else {
                    deferred.reject('error');
                }
            });

            return deferred.promise;
        };

        /**
         * Do this function if validation valid
         * @param element
         */
        this.validCallback = null;

        /**
         * Do this function if validation invalid
         * @param element
         */
        this.invalidCallback = null;

        /**
         * Do this function when reset is performed
         * @param element
         */
        this.resetCallback = null;

        /**
         * reset the specific form
         * @param form
         */
        this.reset = function (form) {
            if (form === undefined) {
                console.error('This is not a regular Form name scope');
                return;
            }

            if (form.validationId) {
                $scope.$broadcast(form.$name + 'reset-' + form.validationId);
            } else if (form.constructor === Array) {
                for (var k in form) {
                    $scope.$broadcast(form[k].$name + 'reset-' + form[k].validationId);
                }
            } else {
                for (var i in form) {
                    if (i[0] !== '$' && form[i].hasOwnProperty('$dirty')) {
                        $scope.$broadcast(i + 'reset-' + form[i].validationId);
                    }
                }
            }
        };

        /**
         * Add Message Element in config phase
         * When you need custom your messageElement
         * NODE: this funtion & and `message-id` attribute, have similar purpose.
         * This function will help you add your `messageElement` automatically instead of pre-defined.
         * @param element
         */
        this.addMsgElement = function (element) {
            return element.after('<span></span>');
        };

        /**
         * Add Message Element in config phase
         * When you need custom your messageElement
         * NODE: this funtion & and `message-id` attribute, have similar purpose.
         * This function will help you add your `messageElement` automatically instead of pre-defined.
         * @param element
         */
        this.getMsgElement = function (element) {
            return element.next();
        };

        /**
         * $get
         * @returns {{setErrorHTML: *, getErrorHTML: Function, setSuccessHTML: *, getSuccessHTML: Function, setExpression: *, getExpression: Function, setDefaultMsg: *, getDefaultMsg: Function, checkValid: Function, validate: Function, reset: Function}}
         */
        this.$get = ['$injector', function ($injector) {
            setup($injector);
            return {
                setValidMethod: this.setValidMethod,
                getValidMethod: this.getValidMethod,
                setErrorHTML: this.setErrorHTML,
                getErrorHTML: this.getErrorHTML,
                setSuccessHTML: this.setSuccessHTML,
                getSuccessHTML: this.getSuccessHTML,
                setExpression: this.setExpression,
                getExpression: this.getExpression,
                setDefaultMsg: this.setDefaultMsg,
                getDefaultMsg: this.getDefaultMsg,
                showSuccessMessage: this.showSuccessMessage,
                showErrorMessage: this.showErrorMessage,
                checkValid: this.checkValid,
                validate: this.validate,
                validCallback: this.validCallback,
                invalidCallback: this.invalidCallback,
                resetCallback: this.resetCallback,
                reset: this.reset,
                addMsgElement: this.addMsgElement,
                getMsgElement: this.getMsgElement
            };
        }];
    }
}).call(this);

(function () {
    angular
        .module('validation.directive')
        .directive('validationReset', Reset);

    function Reset($injector) {
        var $validationProvider = $injector.get('$validation');
        var $timeout = $injector.get('$timeout');
        var $parse = $injector.get('$parse');
        return {
            link: function postLink(scope, element, attrs) {
                var form = $parse(attrs.validationReset)(scope);
                $timeout(function () {
                    element.on('click', function (e) {
                        e.preventDefault();
                        $validationProvider.reset(form);
                    });
                });
            }
        };
    }

    Reset.$inject = ['$injector'];
}).call(this);

(function () {
    angular
        .module('validation.directive')
        .directive('validationSubmit', Submit);

    function Submit($injector) {
        var $validationProvider = $injector.get('$validation');
        var $timeout = $injector.get('$timeout');
        var $parse = $injector.get('$parse');
        return {
            priority: 1, // execute before ng-click (0)
            require: '?ngClick',
            link: function postLink(scope, element, attrs) {
                var form = $parse(attrs.validationSubmit)(scope);
                $timeout(function () {
                    // Disable ng-click event propagation
                    element.off('click');
                    element.on('click', function (e) {
                        e.preventDefault();
                        $validationProvider.validate(form)
                            .success(function () {
                                $parse(attrs.ngClick)(scope);
                            });
                    });
                });
            }
        };
    }

    Submit.$inject = ['$injector'];
}).call(this);

(function () {
    angular
        .module('validation.directive')
        .directive('validator', Validator);

    function Validator($injector) {
        var $validationProvider = $injector.get('$validation');
        var $q = $injector.get('$q');
        var $timeout = $injector.get('$timeout');
        var $compile = $injector.get('$compile');
        var $parse = $injector.get('$parse');
        var groups = {};

        /**
         * Do this function if validation valid
         * @param element
         * @param validMessage
         * @param validation
         * @param callback
         * @param ctrl
         * @returns {}
         */
        var validFunc = function (element, validMessage, validation, scope, ctrl, attrs) {
            var messageToShow = validMessage || $validationProvider.getDefaultMsg(validation).success;
            var validCallback = $parse(attrs.validCallback);
            var messageId = attrs.messageId;
            var validationGroup = attrs.validationGroup;
            var messageElem;

            if (messageId || validationGroup) messageElem = angular.element(document.querySelector('#' + (messageId || validationGroup)));
            else messageElem = $validationProvider.getMsgElement(element);

            if (element.attr('no-validation-message')) {
                messageElem.css('display', 'none');
            } else if ($validationProvider.showSuccessMessage && messageToShow) {
                messageElem.html('').append($compile($validationProvider.getSuccessHTML(messageToShow, element, attrs))(scope));
                messageElem.css('display', '');
            } else {
                messageElem.css('display', 'none');
            }

            ctrl.$setValidity(ctrl.$name, true);
            validCallback(scope, {
                message: messageToShow
            });
            if ($validationProvider.validCallback) $validationProvider.validCallback(element);

            return true;
        };


        /**
         * Do this function if validation invalid
         * @param element
         * @param validMessage
         * @param validation
         * @param callback
         * @param ctrl
         * @returns {}
         */
        var invalidFunc = function (element, validMessage, validation, scope, ctrl, attrs) {
            var messageToShow = validMessage || $validationProvider.getDefaultMsg(validation).error;
            var invalidCallback = $parse(attrs.invalidCallback);
            var messageId = attrs.messageId;
            var validationGroup = attrs.validationGroup;
            var messageElem;

            if (messageId || validationGroup) messageElem = angular.element(document.querySelector('#' + (messageId || validationGroup)));
            else messageElem = $validationProvider.getMsgElement(element);

            if (element.attr('no-validation-message')) {
                messageElem.css('display', 'none');
            } else if ($validationProvider.showErrorMessage && messageToShow) {
                messageElem.html('').append($compile($validationProvider.getErrorHTML(messageToShow, element, attrs))(scope));
                messageElem.css('display', '');
            } else {
                messageElem.css('display', 'none');
            }

            ctrl.$setValidity(ctrl.$name, false);
            invalidCallback(scope, {
                message: messageToShow
            });
            if ($validationProvider.invalidCallback) $validationProvider.invalidCallback(element);

            return false;
        };

        /**
         * Verify whether there is one of the elements inside the group valid.
         * If so, it returns true, otherwise, it returns false
         *
         * @param validationGroup
         * @return {boolean}
         */
        var checkValidationGroup = function (validationGroup) {
            var group = groups[validationGroup];

            return Object.keys(group).some(function (key) {
                return group[key];
            });
        };

        /**
         * Set validity to all elements inside the given group
         *
         * @param scope
         * @param groupName
         * @param validity
         */
        function setValidationGroup(scope, validationGroup, validity) {
            var validationGroupElems = document.querySelectorAll('*[validation-group=' + validationGroup + ']');

            // Loop through all elements inside the group
            for (var i = 0, len = validationGroupElems.length; i < len; i++) {
                var elem = validationGroupElems[i];
                var formName = elem.form.name;
                var elemName = elem.name;
                scope[formName][elemName].$setValidity(elemName, validity);
            }
        }

        /**
         * collect elements for focus
         * @type {Object}
         ***private variable
         */
        var focusElements = {};

        /**
         * Get Validation Result Object
         * @param data
         * @returns {
     *    result: Boolean, // is success or error
     *    message: String  // tips
     * }
         */
        function getResultObj(data) {
            var res = {};
            if (data && data.length > 0) {
                res = data[0];
                if (!angular.isObject(res)) {
                    res = {
                        result: res,
                        message: ''
                    };
                }
            } else {
                res = {
                    result: false,
                    message: ''
                };
            }
            return res;
        }

        /**
         * Check Validation with Function or RegExp
         * @param scope
         * @param element
         * @param attrs
         * @param ctrl
         * @param validation
         * @param value
         * @returns {}
         */
        var checkValidation = function (scope, element, attrs, ctrl, validation, value) {
            var validators = validation.slice(0);
            var validatorExpr = validators[0].trim();
            var paramIndex = validatorExpr.indexOf('=');
            var validator = paramIndex === -1 ? validatorExpr : validatorExpr.substr(0, paramIndex);
            var validatorParam = paramIndex === -1 ? null : validatorExpr.substr(paramIndex + 1);
            var leftValidation = validators.slice(1);
            var successMessage = validator + 'SuccessMessage';
            var errorMessage = validator + 'ErrorMessage';
            var expression = $validationProvider.getExpression(validator);
            var validationGroup = attrs.validationGroup;
            var valid = {
                success: function (message) {
                    validFunc(element, message || attrs[successMessage], validator, scope, ctrl, attrs);
                    if (leftValidation.length) {
                        return checkValidation(scope, element, attrs, ctrl, leftValidation, value);
                    } else {
                        return true;
                    }
                },
                error: function (message) {
                    return invalidFunc(element, message || attrs[errorMessage], validator, scope, ctrl, attrs);
                }
            };

            if (expression === undefined) {
                console.error('You are using undefined validator "%s"', validator);
                if (leftValidation.length) return checkValidation(scope, element, attrs, ctrl, leftValidation, value);
                else return;
            }
            // Check with Function
            if (expression.constructor === Function) {
                return $q.all([$validationProvider.getExpression(validator)(value, scope, element, attrs, validatorParam)])
                    .then(function (data) {
                        var resultObj = getResultObj(data);
                        var message = resultObj.message;
                        if (resultObj.result) {
                            if (validationGroup) {
                                groups[validationGroup][ctrl.$name] = true;
                                setValidationGroup(scope, validationGroup, true);
                            }
                            return valid.success(message);
                        } else if (validationGroup) {
                            groups[validationGroup][ctrl.$name] = false;

                            // Whenever the element is invalid, we'll check whether one of the elements inside the its group valid or not.
                            // If there is a valid element, its invalid message won't be shown, Otherwise, shows its invalid message.
                            if (checkValidationGroup(validationGroup)) {
                                setValidationGroup(scope, validationGroup, true);
                            } else {
                                setValidationGroup(scope, validationGroup, false);
                                return valid.error(message);
                            }
                        } else return valid.error(message);
                    }, function () {
                        return valid.error();
                    });
            }

            // Check with RegExp
            else if (expression.constructor === RegExp) {
                // Only apply the test if the value is neither undefined or null
                if (value !== undefined && value !== null) {
                    if ($validationProvider.getExpression(validator).test(value)) {
                        if (validationGroup) {
                            groups[validationGroup][ctrl.$name] = true;
                            setValidationGroup(scope, validationGroup, true);
                        }
                        return valid.success();
                    } else if (validationGroup) {
                        groups[validationGroup][ctrl.$name] = false;

                        // Whenever the element is invalid, we'll check whether one of the elements inside the its group valid or not.
                        // If there is a valid element, its invalid message won't be shown, Otherwise, shows its invalid message.
                        if (checkValidationGroup(validationGroup)) {
                            setValidationGroup(scope, validationGroup, true);
                        } else {
                            setValidationGroup(scope, validationGroup, false);
                            return valid.error();
                        }
                    } else return valid.error();
                }
            } else return valid.error();
        };

        /**
         * generate unique guid
         */
        var s4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        var guid = function () {
            return (s4() + s4() + s4() + s4());
        };


        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                /**
                 * All attributes
                 */
                var useViewValue = attrs.useViewValue !== 'false';
                var validator = attrs.validator;
                var messageId = attrs.messageId;
                var validationGroup = attrs.validationGroup;
                var validMethod = attrs.validMethod;
                var ngModel = attrs.ngModel;

                /**
                 * watch
                 * @type {watch}
                 *
                 * Use to collect scope.$watch method
                 *
                 * use watch() to destroy the $watch method
                 */
                var watch = function () {
                };

                /**
                 * validator
                 * @type {Array}
                 *
                 * Convert user input String to Array
                 */
                var validation = validator.split(',');

                /**
                 * guid use
                 */
                var uid = ctrl.validationId = guid();

                /**
                 * to have a value to rollback to
                 */
                var originalViewValue = null;

                /**
                 * Set initial validity to undefined if no boolean value is transmitted
                 */
                var initialValidity = void 0;
                if (typeof attrs.initialValidity === 'boolean') {
                    initialValidity = attrs.initialValidity;
                }

                /**
                 * Observe validator changes in order to allow dynamically change it
                 */
                attrs.$observe('validator', function (value) {
                    validation = value.split(',');
                });

                /**
                 * Set up groups object in order to keep track validation of elements
                 */
                if (validationGroup) {
                    if (!groups[validationGroup]) groups[validationGroup] = {};
                    groups[validationGroup][ctrl.$name] = false;
                }

                /**
                 * Default Valid/Invalid Message
                 */
                if (!(messageId || validationGroup)) $validationProvider.addMsgElement(element);

                /**
                 * Set custom initial validity
                 * Usage: <input initial-validity="true" ... >
                 */
                ctrl.$setValidity(ctrl.$name, initialValidity);

                /**
                 * Reset the validation for specific form
                 */
                scope.$on(ctrl.$name + 'reset-' + uid, function () {
                    /**
                     * clear scope.$watch here
                     * when reset status
                     * clear the $watch method to prevent
                     * $watch again while reset the form
                     */
                    watch();

                    $timeout(function () {
                        ctrl.$setViewValue(originalViewValue);
                        ctrl.$setPristine();
                        ctrl.$setValidity(ctrl.$name, undefined);
                        ctrl.$render();
                        if (messageId || validationGroup) angular.element(document.querySelector('#' + (messageId || validationGroup))).html('');
                        else $validationProvider.getMsgElement(element).html('');

                        if ($validationProvider.resetCallback) $validationProvider.resetCallback(element);
                    });
                });

                /**
                 * Check validator
                 */
                validMethod = (angular.isUndefined(validMethod)) ? $validationProvider.getValidMethod() : validMethod;

                /**
                 * Click submit form, check the validity when submit
                 */
                scope.$on(ctrl.$name + 'submit-' + uid, function (event, index) {
                    var value = useViewValue ? ctrl.$viewValue : ctrl.$modelValue;
                    var isValid = false;

                    isValid = checkValidation(scope, element, attrs, ctrl, validation, value);

                    if (validMethod === 'submit') {
                        // clear previous scope.$watch
                        watch();
                        watch = scope.$watch(function () {
                            return scope.$eval(ngModel);
                        }, function (value, oldValue) {
                            // don't watch when init
                            if (value === oldValue) {
                                return;
                            }

                            // scope.$watch will translate '' to undefined
                            // undefined/null will pass the required submit /^.+/
                            // cause some error in this validation
                            if (value === undefined || value === null) {
                                value = '';
                            }

                            isValid = checkValidation(scope, element, attrs, ctrl, validation, value);
                        });
                    }

                    var setFocus = function (isValid) {
                        if (isValid) {
                            delete focusElements[index];
                        } else {
                            focusElements[index] = element[0];

                            $timeout(function () {
                                focusElements[Math.min.apply(null, Object.keys(focusElements))].focus();
                            }, 0);
                        }
                    };

                    if (isValid && isValid.constructor === Object) isValid.then(setFocus);
                    else setFocus(isValid);
                });

                /**
                 * Validate blur method
                 */
                if (validMethod === 'blur') {
                    element.bind('blur', function () {
                        var value = scope.$eval(ngModel);
                        scope.$apply(function () {
                            checkValidation(scope, element, attrs, ctrl, validation, value);
                        });
                    });

                    return;
                }

                /**
                 * Validate submit & submit-only method
                 */
                if (validMethod === 'submit' || validMethod === 'submit-only') {
                    return;
                }

                /**
                 * Validate watch method
                 * This is the default method
                 */
                scope.$watch(function () {
                    return scope.$eval(ngModel);
                }, function (value) {
                    /**
                     * dirty, pristine, viewValue control here
                     */
                    if (ctrl.$pristine && ctrl.$viewValue) {
                        // has value when initial
                        originalViewValue = ctrl.$viewValue || '';
                        ctrl.$setViewValue(ctrl.$viewValue);
                    } else if (ctrl.$pristine) {
                        // Don't validate form when the input is clean(pristine)
                        if (messageId || validationGroup) angular.element(document.querySelector('#' + (messageId || validationGroup))).html('');
                        else $validationProvider.getMsgElement(element).html('');
                        return;
                    }
                    checkValidation(scope, element, attrs, ctrl, validation, value);
                });

                $timeout(function () {
                    /**
                     * Don't showup the validation Message
                     */
                    attrs.$observe('noValidationMessage', function (value) {
                        var el;
                        if (messageId || validationGroup) el = angular.element(document.querySelector('#' + (messageId || validationGroup)));
                        else el = $validationProvider.getMsgElement(element);
                        if (value === 'true' || value === true) el.css('display', 'none');
                        else if (value === 'false' || value === false) el.css('display', 'block');
                    });
                });
            }
        };
    }

    Validator.$inject = ['$injector'];
}).call(this);

(function () {
    angular
        .module('validation.rule', ['validation'])
        .config(['$validationProvider', function ($validationProvider) {
            var expression = {
                required: function (value) {
                    return !!value;
                },
                url: function (value) {
                    var urlreg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
                    return !value || urlreg.test(value);
                },
                email: function (value) {
                    var mailreg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    return !value || mailreg.test(value);
                },
                number: function (value) {
                    var numberreg = /^\d+$/;
                    return !value || numberreg.test(value);
                },
                ip: function (value) {
                    var ipreg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    return !value || ipreg.test(value);
                },
                phone: function (value) {
                    var phonereg = /^1(3|4|5|7|8)\d{9}$/;
                    return !value || phonereg.test(value);
                },
                repassword: function (value, scope, element, attrs, param) {
                    return value && value === param;
                },
                minlength: function (value, scope, element, attrs, param) {
                    return value && value.length >= param;
                },
                maxlength: function (value, scope, element, attrs, param) {
                    return !value || value.length <= param;
                }
            };

            var defaultMsg = {
                ip: {
                    error: '这不是一个ip地址',
                    success: ''
                },
                phone: {
                    error: '手机号码格式不正确',
                    success: ''
                },

                required: {
                    error: '必填项',
                    success: ''
                },
                url: {
                    error: '这不是一个有效的url地址',
                    success: ''
                },
                email: {
                    error: '请输入有效的E_mail！',
                    success: ''
                },
                number: {
                    error: '只能填写数字',
                    success: ''
                },
                repassword: {
                    error: '两次密码不一致',
                    success: ''
                },
                minlength: {
                    error: '小于最小长度',
                    success: ''
                },
                maxlength: {
                    error: '大于最大长度',
                    success: ''
                }
            };
            $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
            $validationProvider.setValidMethod('blur');
            $validationProvider.showSuccessMessage = false; // or true(default)
            $validationProvider.showErrorMessage = true; // or true(default)

            $validationProvider.setErrorHTML(function (msg, element, attrs) {
                // remember to return your HTML
                // eg: return '<p class="invalid">' + msg + '</p>';
                // or using filter
                // eg: return '<p class="invalid">{{"' + msg + '"| lowercase}}</p>';
                // return '<p uib-tooltip="{{msg}}" tooltip-append-to-body="appendToBody" tooltip-is-open="true" tooltip-placement="top-right">'+ msg+'</p>'
                return '' +
                    '<div class="tooltip top-right" role="tooltip">' +
                    '<div class="tooltip-arrow"></div>' +
                    '<div class="tooltip-inner">' + msg +
                    '</div>' +
                    '</div>'
            });

            $validationProvider.setSuccessHTML(function (msg, element, attrs) {
                // eg: return '<p class="valid">' + msg + '</p>';
                // or using filter
                // eg: return '<p class="valid">{{"' + msg + '"| lowercase}}</p>';
            });
            angular.extend($validationProvider, {
                validCallback: function (element) {
                    $(element).parents('.form-group:first').removeClass('has-error');
                },
                invalidCallback: function (element) {
                    $(element).parents('.form-group:first').addClass('has-error');
                }
            });
        }]);
}).call(this);
