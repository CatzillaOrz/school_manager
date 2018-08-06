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
    .factory('AuthService', ['$rootScope', '$http', '$q', '$window', '$location', '$templateCache', function ($rootScope, $http, $q, $window, $location, $templateCache) {
        var _headerLink = {
            DEV: ['aizhixindev.com', 'em.aizhixindev.com', 'pt.aizhixindev.com', 'hy.aizhixindev.com', 'dd.aizhixindev.com', 'aizhixindev.com', 'learn.aizhixindev.com', 'sp.aizhixindev.com'],
            TEST: ['aizhixintest.com', 'em.aizhixintest.com', 'pt.aizhixintest.com', 'hy.aizhixintest.com', 'dd.aizhixintest.com', 'aizhixintest.com', 'learn.aizhixintest.com', 'sp.aizhixintest.com'],
            PDE: ['dlztc.com', 'em.dlztc.com', 'pt.dlztc.com', 'hy.dlztc.com', 'dd.dlztc.com', 'dlztc.com', 'learn.dlztc.com', 'sp.dlztc.com'],
            SDE: ['aizhixin.com', 'em.aizhixin.com', 'pt.aizhixin.com', 'hy.aizhixin.com', 'dd.aizhixin.com', 'aizhixin.com', 'learn.aizhixin.com', 'sp.aizhixin.com'],
            PRODUCT: ['zhixin', 'em', 'pt', 'hy', 'dd', 'school', 'learn', 'sp']
        };
        var AuthService = {
            setUser: function (user) {
                for (var _k in user) {
                    user[_k] == 'null' && (user[_k] = null);
                }
                user.userName = user.userName || user.name || user.shortName;
                // user.name = user.name || user.userName || user.shortName;
                user.avatar = user.avatar || 'https://s.aizhixin.com/default_profile.jpg';
                user.roleAll=user.roleNames;
                angular.forEach(user.roleNames, function (role) {
                    if (role == 'ROLE_STUDENT') {
                        if (!user.role) {
                            user.role = role;
                        } else if (user.role == 'ROLE_TEACHER') {
                            // //console.error('用户角色冲突，不能既是老师又是学生，请联系学院平台管理员查验数据。');
                        }
                    } else if (role == 'ROLE_TEACHER') {
                        if (!user.role) {
                            user.role = role;
                        } else if (user.role == 'ROLE_STUDENT') {
                            // //console.error('用户角色冲突，不能既是老师又是学生，请联系学院平台管理员查验数据。');
                        }
                    } else if (role == "ROLE_ORG_ADMIN") {
                        user.role = role;
                    }
                });
                var domain = $window.document.domain.split('.').reverse()[1];
                ////console.log(domain);
                if (domain) {
                    Cookies.set('user', user, {domain: '.' + domain + '.com'});
                    Cookies.set('authorize', true, {domain: '.' + domain + '.com'});
                } else {
                    Cookies.set('user', user);
                    Cookies.set('authorize', true);
                }
                $rootScope.user = user;
            },
            clearUser: function () {
                var domain = $window.document.domain.split('.').reverse()[1];
                if (domain) {
                    Cookies.remove('user', {domain: '.' + domain + '.com'});
                    Cookies.remove('authorize', {domain: '.' + domain + '.com'});
                } else {
                    Cookies.remove('user');
                    Cookies.remove('authorize');
                }
                $rootScope.user = undefined;
            },
            authority: function () {
                var user = AuthService.getUser();
                if (user) {
                    return (user.roleNames.toString().indexOf("ROLE_ADMIN") > -1 || user.roleNames.toString().indexOf("ROLE_ORG_ADMIN") != -1 || user.roleNames.toString().indexOf("ROLE_COLLEGE_ADMIN") != -1
                        || user.roleNames.toString().indexOf("ROLE_ORG_MANAGER") != -1 || user.roleNames.toString().indexOf("ROLE_ORG_DATAVIEW") != -1
                        || user.roleNames.toString().indexOf("ROLE_COLLEG_DATAVIEW") != -1 || user.roleNames.toString().indexOf("ROLE_ORG_EDUCATIONALMANAGER") != -1
                        || user.roleNames.toString().indexOf("ROLE_COLLEG_EDUCATIONALMANAGER") != -1 || user.roleNames.toString().indexOf("ROLE_FINANCE_ADMIN") != -1
                        || user.roleNames.toString().indexOf("ROLE_DORM_ADMIN") != -1 || user.roleNames.toString().indexOf("ROLE_ENROL_ADMIN") != -1);
                } else {
                    return false;
                }

            },
            toLogin: function (path) {
                var _path = path || "/schindex";
                var pathname = "/schoolLogin?redirectUrl=" + window.location.protocol + "//" + location.hostname + _path;
                var search = $location.search();
                if (("org" in search) && search.org) {
                    pathname = pathname + "?org=" + search.org;
                }else{
					 var orgCode = AuthService.getUser().orgDomainName;
					 if(orgCode){
						 pathname = pathname + "?org=" + orgCode; 
					 }
					
				}
                AuthService.navigation(0, pathname);
            },
            getUser: function () {
                // //console.log(Cookies.getJSON('user'));
                return Cookies.getJSON('user');
            },
            setSiginPosition: function () {
                var _this = this;
                var isCustomize = _this.isCustomize();
                var domain = $window.document.domain.split('.').reverse()[1];
                if (!isCustomize) {
                    ////console.log(domain);
                    if (domain) {
                        Cookies.set("setSiginPosition", "aizhixin", {domain: '.' + domain + '.com'});
                    } else {
                        Cookies.set("setSiginPosition", "aizhixin");
                    }

                } else {
                    if (domain) {
                        Cookies.set("setSiginPosition", "school", {domain: '.' + domain + '.com'});
                    } else {
                        Cookies.set("setSiginPosition", "school");
                    }
                }
            },
            clearSiginPosition: function () {
                var domain = $window.document.domain.split('.').reverse()[1];
                if (domain) {
                    Cookies.remove("setSiginPosition", {domain: '.' + domain + '.com'});
                } else {
                    Cookies.remove('setSiginPosition');
                }

            },
            getSiginPosition: function () {
                return Cookies.get("setSiginPosition");
            },
            signIn: function (username, password) {
                var deferred = $q.defer();
                $http.post("api/signin", {
                    username: username,
                    password: password
                })
                    .success(function (user) {
                        // //console.log(user);
                        if (!!user) {
                            AuthService.setUser(user);
                            AuthService.setSiginPosition();
                            deferred.resolve(user);
                            return user;
                        }
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            },
            //扫码登录
            qrcodeSignIn: function (token) {
                var deferred = $q.defer();
                $http.post("api/qrcodeSignIn", {
                    token: token
                })
                    .success(function (user) {
                        // //console.log(user);
                        if (!!user) {
                            AuthService.setUser(user);
                            AuthService.setSiginPosition();
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
                var siginPosition = AuthService.getSiginPosition();
                //1.判断是否定制化
                var isCustomize = AuthService.isCustomize();
                var orgCode = AuthService.getUser().orgDomainName;
                AuthService.clearUser();
                AuthService.clearSiginPosition();
                $http.post("api/account/signout");

                //2.如果是定制化，判断是否是开卷 若是开卷 退出首页为路由为schindex 否则 判断登录时入口 若是从知新登入的 退出知新首页 若是从学校登录 退出当前定制首页
                var modelReg = /\w*(\b\.em\b)|(\b\.pt\b)|(\b\.dd\b)|(\b\.learn\b)\w*/;
                var passportReg = /\w*\bpassport\b\w*/;
                var oneLevelReg = /^aizhixindev\.com$|^aizhixintest\.com$|^dlztc\.com$|^aizhixin\.com$/;
                if(oneLevelReg.test(location.hostname)){
                    //$window.location.href = "//" + location.hostname + "/schindex" + "?org=" + orgCode;
                    var domain = AuthService.getCurrentEnvDomain();
                    $window.location.href = "//" + orgCode + "." + domain[0] + "/index" + "?org=" + orgCode;
                }
                var twoLevelReg = /((^\bem\.\b)|(^\bpt\.\b)|(^\bdd\.\b)|(^\blearn\.\b)|(^\bpassport\.\b))((\baizhixindev\b)|(\baizhixintest\b)|(\bdlztc\b)|(\baizhixin\b))\b\.com\b$/
                if(!twoLevelReg.test(location.hostname)){
                    var url= AuthService.getCurrentEnvDomainByProduct("zhixin");
                    $window.location.href = "//"+orgCode +"."+ url ;
                }else {
                    var domain = AuthService.getCurrentEnvDomain();
                    $window.location.href = "//"  + orgCode + "." + domain[0] + "/index" + "?org=" + orgCode;
                    //$window.location.href = "//" + location.hostname + "/schindex" + "?org=" + orgCode;
                }

            },
            authorize: function () {
                return Cookies.getJSON('authorize');
            },
            isLogin: function () {
                return AuthService.authorize() && AuthService.getUser();
            },
            //判断环境
            getCurrentEvn: function () {
                var devReg = /(\b\w*\.\b)?aizhixindev\.com/;
                var testReg = /(\b\w*\.\b)?aizhixintest\.com/;
                var pdeReg = /(\b\w*\.\b)?dlztc\.com/;
                var sdeReg = /(\b\w*\.\b)?aizhixin\.com/;
                var _hostname = $window.location.hostname.replace('www.', '');
                if (devReg.test(_hostname)) {
                    return "DEV";
                } else if (testReg.test(_hostname)) {
                    return "TEST";
                } else if (pdeReg.test(_hostname)) {
                    return "PDE";
                } else if (sdeReg.test(_hostname)) {
                    return "SDE";
                }
            },
            //判断是否定制化 ture :为是
            /**
             * 登录前判断 域名 以及参数
             * 登录后 都为定制化
             * @returns {boolean}
             */
            isCustomize: function () {
                if (AuthService.isLogin()) {
                    return true;
                } else {
                    var oneLevelReg = /^aizhixindev\.com$|^aizhixintest\.com$|^dlztc\.com$|^aizhixin\.com$/;
                    var twoLevelReg = /((^\bem\.\b)|(^\bpt\.\b)|(^\bdd\.\b)|(^\blearn\.\b)|(^\bpassport\.\b))((\baizhixindev\b)|(\baizhixintest\b)|(\bdlztc\b)|(\baizhixin\b))\b\.com\b$/
                    var search = $location.search();
                    var _hostname = $window.location.hostname.replace('www.', '');
                    if (oneLevelReg.test(_hostname)) {
                        if (("org" in search) && search.org) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (twoLevelReg.test(_hostname)) {

                            if (("org" in search) && search.org) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }

                    }



                }
            },
            //获取当前环境下的所有域名
            getCurrentEnvDomain: function () {
                var env = AuthService.getCurrentEvn();
                return _headerLink[env];
            },
            /**
             *根据产品名获取当前环境下的产品对应的域名
             * @param product 为产品例如 zhixin em pt dd school
             * @returns {*} 所要获取的当前环境下产品域名 若输入若输入的产品不存在 返回undefined
             */
            getCurrentEnvDomainByProduct: function (product) {
                var domains = AuthService.getCurrentEnvDomain();
                var domainObj = {};
                angular.forEach(domains, function (domain, index) {
                    domainObj[_headerLink.PRODUCT[index]] = domain
                });
                return domainObj[product];
            },
            //根据当前域名查找当前环境下的所有域名 （不推荐使用）
            contrastDomain: function (host) {
                var _urlarr = [];
                for (var _k in _headerLink) {
                    angular.forEach(_headerLink[_k], function (obj) {
                        if (host == obj) {
                            _urlarr = _headerLink[_k];
                        }
                    })
                }
                return _urlarr;
            },//orgCode
            /**
             * 定制化修改document title
             */
            changeTile: function () {
                var isCustomize = AuthService.isCustomize();
                if (isCustomize) {
                    if ($rootScope.schoolInfo) {
                        document.title = $rootScope.schoolInfo.data.name;
                    }

                }
            },
            /**
             *
             * @param link 需要跳转到的项目主机域名 0：知新网 1：开卷 2：校场 3：慧眼 4：点点 5：学校管理
             * @param pathname 需要跳转到的具体功能模块
             */
            navigation: function (link, pathname) {
                //1.判断是否已登录
                var hasLogin = AuthService.isLogin();
                var _pathname = pathname || '/index';
                var _hostname = $window.location.hostname.replace('www.', '');
                var isCustomize = AuthService.isCustomize();
                var currentEnvUrls = AuthService.getCurrentEnvDomain();
                var loginReg = /\b\login\b\w*/;
                var schoolLoginReg = /\bschoolLogin\b\w*/;
                var loginRedirectUrlReg = /\bredirectUrl\b\w*/;
                var toLogin = loginReg.test(pathname);
                var toSchoolLogin = schoolLoginReg.test(pathname);
                var search = $location.search();
                if (hasLogin) {
                    if (pathname == "/userCenter" || pathname == "/account") {//账户类增加mycenter
                        var url = '//' + 'mycenter.' + currentEnvUrls[link] + _pathname;
                        window.open(url, '_blank');
                    } else {
                        if (link == 5 || link == 0) {
                            if (pathname == "/home") {
                                var toUrl = '//manager.' + currentEnvUrls[link] + _pathname;
                                window.open(toUrl, '_blank');
                            } else {
                                var url = '//' + AuthService.getUser().orgDomainName + '.' + currentEnvUrls[link] + _pathname;
                                window.open(url, '_blank');
                            }

                        } else {
                            window.open('//' + currentEnvUrls[link] + _pathname, '_blank');
                        }
                    }
                } else {
                    var oneLevelReg = /^aizhixindev\.com$|^aizhixintest\.com$|^dlztc\.com$|^aizhixin\.com$/;
                    var modelLevelReg = /((^\bem\.\b)|(^\bpt\.\b)|(^\bdd\.\b)|(^\blearn\.\b)|(^\bpassport\.\b))((\baizhixindev\b)|(\baizhixintest\b)|(\bdlztc\b)|(\baizhixin\b))\b\.com\b$/
                    var twoLevelReg = /\w\.(\baizhixindev\b|\baizhixintest\b|\bdlztc\b|\baizhixin\b)\.com$/;
                    if (modelLevelReg.test(_hostname)) {
                        var search = $location.search();
                        if (link == 5 && _pathname == "/") {
                            if(search&&search.org){
                                var url = '//' + search.org + '.' + currentEnvUrls[link] + _pathname;
                                window.open(url, '_blank');
                            }else {
                                var url = '//' + search.org + '.' + currentEnvUrls[link] + _pathname;
                                window.open(url, '_blank');
                            }

                        } else {
                            if (toLogin || toSchoolLogin) {//账户类增加passport
                                console.log("passport");
                                if(search.org){
                                    $window.location.href = '//' + 'passport.'  + currentEnvUrls[link] + _pathname + "&org=" + search.org;
                                    return ;
                                }else {
                                    $window.location.href = '//' + 'passport.'  + currentEnvUrls[link] + _pathname ;
                                    return ;
                                }

                            }
                            if (loginRedirectUrlReg.test(_pathname) && search.org) {
                                $window.location.href = '//' + currentEnvUrls[link] + _pathname + "&org=" + search.org;

                            } else {
                                $window.location.href = '//' + currentEnvUrls[link] + _pathname + location.search;
                            }

                        }

                    } else {
                        if (twoLevelReg.test(_hostname)) {
                            var twoLevel = $window.location.hostname.replace('www.', '').split(".")[0];
                            if (toLogin || toSchoolLogin) {//账户类增加passport
                                if (loginRedirectUrlReg.test(_pathname)) {
                                    $window.location.href = '//' + 'passport.' + currentEnvUrls[link] + _pathname + "&org=" + twoLevel;
                                } else {
                                    $window.location.href = '//' + 'passport.' + currentEnvUrls[link] + _pathname + "?org=" + twoLevel;
                                }

                            } else {
                                if (link == 5) {
                                    $window.location.href = '//' + twoLevel + '.' + currentEnvUrls[link] + _pathname;
                                } else {
                                    $window.location.href = '//' + currentEnvUrls[link] + _pathname + "?org=" + twoLevel;
                                }

                            }
                        } else {
                            if (toLogin || toSchoolLogin) {//账户类增加passport
                                $window.location.href = '//' + 'passport.' + currentEnvUrls[link] + _pathname
                            } else {
                                if (search.org) {
                                    if (link == 5) {
                                        $window.location.href = '//' + search.org + '.' + currentEnvUrls[link] + _pathname;
                                    } else {
                                        $window.location.href = '//' + currentEnvUrls[link] + _pathname + "?org=" + search.org;
                                    }

                                } else {
                                    $window.location.href = '//' + currentEnvUrls[link] + _pathname;
                                }

                            }

                        }

                    }
                }


            },
            /**
             * 存储学校信息
             */
            setSchoolInfoStore: function (schoolInfo) {
                var domain = $window.document.domain.split('.').reverse()[1];
                ////console.log(domain);
                if (domain) {
                    Cookies.set('schoolInfo', schoolInfo, {domain: '.' + domain + '.com'});
                } else {
                    Cookies.set('schoolInfo', schoolInfo);
                }
            },
            /**
             * 获取学校信息
             */
            getSchoolInfoStore: function () {
                return Cookies.getJSON("schoolInfo");
            },
            /**
             * 取学校信息，只有在定制化时才能起作用。
             */
            getSchoolInfo: function () {
                var deferred = $q.defer();
                var _this = this;
                var schoolDomian = AuthService.getCurrentEnvDomainByProduct('school');
                var modelLevelReg = /((^\bem\.\b)|(^\bpt\.\b)|(^\bdd\.\b)|(^\blearn\.\b)|(^\bpassport\.\b))((\baizhixindev\b)|(\baizhixintest\b)|(\bdlztc\b)|(\baizhixin\b))\b\.com\b$/
                // var twoLevelReg=/^\.(\baizhixindev\b)|(\baizhixintest\b)|(\bdlztc\b)|(\baizhixin\b)\b\.com\b$/;
                var _hostname = $window.location.hostname.replace('www.', '');
                var code = ""
                if (modelLevelReg.test(_hostname)) {
                    code = $location.search().org;
                } else {
                    code = $location.host().split('.')[0];
                }
                // code = "kjkf";
                if (code) {
                    var url = '//' + code + '.' + schoolDomian + '/api/school/getSchoolOra?domainname=' + code + "&callback=JSON_CALLBACK";
                    //url = '//lmcs.school.aizhixintest.com' + '/api/school/getSchoolOra?domainname=lmcs' + "&callback=JSON_CALLBACK";
                    $http({method: "JSONP", url: url, cache: $templateCache}).success(function (data) {
                        var schoolInfo = eval(data);
                        $rootScope.schoolInfo = schoolInfo;
                        AuthService.setSchoolInfoStore(schoolInfo);
                        deferred.resolve(schoolInfo);


                    }).error(function (err) {
                        deferred.reject(err);
                    })

                }
                return deferred.promise;
            },
            browser: {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    //console.log(u);
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
                        weixin: u.match(/MicroMessenger/i) == "MicroMessenger",
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            },
            init: function () {
                var _this = this;
                //如果是定制化 怎获取学校信息
                var isCustomize = AuthService.isCustomize();
                if (isCustomize) {
                    AuthService.getSchoolInfo().then(function () {
                        _this.changeTile();
                    });

                }

            }
        };
        AuthService.init();
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
            getLoadOptions: function (url, params, keyWord) {
                return {
                    url: url,
                    dataType: 'json',
                    //delay: 250,
                    data: function (query) {
                        params[keyWord] = query.term;
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
            //'       <div class="border-top"></div>' +
            '       <div class="nav-container">' +
            '           <div class="azxlogo"></div>' +
            // '           <div class="logo-split"></div>' +
            // '           <div class="logo-info">产教一体化学习管理<br/>配套解决方案</div>' +
            // '           <ul ng-if="headerFn.user" class="account">' +
            // '               <li uib-dropdown="uib-dropdown" uib-dropdown-toggle="uib-dropdown-toggle" class="user-menu">' +
            // '                   <span class="user-avatar">' +
            // '                       <img ng-src="{{headerFn.user.avatar}}" class="avatar-30 img-circle"/>' +
            // '                   </span>' +
            // '                   <span id="user-name" class="dropdown-toggle">' +
            // '                       <span>{{headerFn.user.name || headerFn.user.login | cutStr:8}}</span>' +
            // '                       <i class="caret"></i>' +
            // '                   </span>' +
            // '               <ul uib-dropdown-menu="uib-dropdown-menu" aria-labelledby="user-name" class="dropdown-menu">' +
            // '                   <li ng-repeat="anav in navigation.accountNav" class="{{anav.name}}" ng-if="headerFn.authority(anav)"><a ng-if="anav.name != \'split\'" ng-click="headerFn.navigate(anav.host,anav.path)"><i class="fa {{anav.icon}}"></i><span>{{anav.name}}</span></a></li>' +
            // // '                   <li><a ng-click="headerFn.navigate(0,\'/userCenter\')"><i class="fa fa-sun-o"></i><span>个人中心</span></a></li>' +
            // // '                   <li><a ng-click="headerFn.navigate(0,\'/account\')"><i class="fa fa-vcard-o"></i><span>账号设置</span></a></li>' +
            // // '                   <li class="split"></li>' +
            // '                   <li><a ng-click="headerFn.signOut()"><i class="fa fa-sign-out"></i><span>退出</span></a></li>' +
            // '               </ul>' +
            // '               </li>' +
            // // '               <li class="tool-bar"><span class="user-inbox"><i class="fa fa-inbox fa-2x"></i><span ng-if="true" class="badge">1</spanng-if></span></li>' +
            // '           </ul>' +
            '           <button class="btn-login" ng-click="headerFn.signIn()"> 学校登录</button>' +
            // '           <div class="nav-split"></div>' +
            '           <ul id="navigation" class="navigation">' +
            '<li ui-sref="index"  ng-class="{active:headerFn.currentTab==\'index\'}">首页' +
            '<div ng-if="headerFn.currentTab==\'index\'" class="keyline"></div>' +
            '</li>' +
            '<li ui-sref="products" ng-class="{active:headerFn.currentTab==\'products\'}">产品服务' +
            '<div ng-if="headerFn.currentTab==\'products\'" class="keyline"></div>' +
            '</li>' +
            '<li ui-sref="course" ng-class="{active:headerFn.currentTab==\'course\'}">精品课程' +
            '<div ng-if="headerFn.currentTab==\'course\'" class="keyline"></div>' +
            '</li>' +
            '<li  ui-sref="dd" ng-class="{active:headerFn.currentTab==\'dd\'}">APP下载' +
            '<div ng-if="headerFn.currentTab==\'dd\'" class="keyline"></div>' +
            '</li>' +

            '           </ul>' +
            '       </div>' +
            '   </div>' +
            // '       <div ng-if="headerFn.user && subnav" class="nav-sub">' +
            // '           <div class="nav-sub-container">' +
            // '               <ul>' +
            // '                   <li ng-click="headerFn.subNavigate(subItem.path)"  ng-repeat="subItem in subnav.navs">{{subItem.menu}}</li>' +
            // '               </ul>' +
            // '           </div>' +
            // '       </div>' +
            '</div>',
            scope: {
                redirectUrl: '@',
                subnav: '='
            },
            transclude: true,
            controller: function ($scope,$state, $rootScope, $timeout, AuthService, $window, $http) {
                $rootScope.user = AuthService.getUser();
                $scope.headerFn = {
                    user: $rootScope.user,
                    subnavArrow: '',
                    currentTab: "dd",
                    signOut: function () {
                        AuthService.signOut();
                    },
                    signIn: function () {
                        if(location.hostname){
                            $window.open("/login","_blank");
                        }else {
                            window.open("passport."+location.hostname+"/login","_blank");
                        }
                    },
                    authority: function (entity) {
                        var _this = this;
                        if (entity.role && entity.role == "admin") {
                            return (_this.user.roleNames.toString().indexOf("ROLE_ADMIN") > -1 || _this.user.roleNames.toString().indexOf("ROLE_ORG_ADMIN") != -1 || _this.user.roleNames.toString().indexOf("ROLE_COLLEGE_ADMIN") != -1
                                || _this.user.roleNames.toString().indexOf("ROLE_ORG_MANAGER") != -1 || _this.user.roleNames.toString().indexOf("ROLE_ORG_DATAVIEW") != -1
                                || _this.user.roleNames.toString().indexOf("ROLE_COLLEG_DATAVIEW") != -1 || _this.user.roleNames.toString().indexOf("ROLE_ORG_EDUCATIONALMANAGER") != -1
                                || _this.user.roleNames.toString().indexOf("ROLE_COLLEG_EDUCATIONALMANAGER") != -1);
                        } else {//
                            return true;
                        }
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
                            AuthService.navigation(nav.host, nav.spath);
                        }
                    },
                    currentActiveTabInit: function () {
                        this.currentTab = $state.$current.name;
                        console.log(this.currentTab);

                    },
                    subNavigate: function (path) {
                        $window.location.href = $window.location.protocol + '//' + $window.location.host + path;
                    },
                    emAdminRouter: function (entity) {
                        //ROLE_TEACHER
                        var _this = this;
                        if (entity.host == 1) {
                            if (_this.user && _this.user.role) {
                                // return true;
                                if (_this.user.role == "ROLE_TEACHER" || _this.user.role == "ROLE_STUDENT") {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return true;
                            }
                        } else {
                            return true;
                        }
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
                $scope.headerFn.currentActiveTabInit();
                if (AuthService.browser.versions.trident) {
                    $scope.navigation = {
                        "mainNav": [
                            {
                                "name": "首页",
                                "host": 0,
                                "spath": "/",
                                "tpath": "/"
                            },
                            {
                                "name": "课程中心",
                                "host": 1,
                                "spath": "/",
                                "tpath": "/"
                            },
                            {
                                "name": "实训中心",
                                "host": 2,
                                "spath": "/",
                                "tpath": "/"
                            },
                            // {
                            //     "name": "学情中心",
                            //     "host": 6,
                            //     "spath": "/",
                            //     "tpath": "/"
                            // },

                            {
                                "name": "掌上校园",
                                "host": 4,
                                "spath": "/",
                                "tpath": "/"
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
                                "name": "管理中心",
                                "host": 5,
                                "icon": "fa-id-card",
                                "path": "/home",
                                "role": "admin"
                            },
                            {
                                "name": "split"
                            }

                        ]
                    }
                } else {
                    $http({
                        method: 'GET',
                        url: 'https://s.aizhixin.com/api/navigation-test.json'
                    }).success(function (res) {
                        $scope.navigation = res;
                    });
                }
                $rootScope.$watch('user', function () {
                    // //console.log($rootScope.user);
                    $scope.headerFn.user = $rootScope.user;
                    $scope.headerFn.menuRoute();
                }, true);
            },
            link: function (scope, element, attr) {
                attr.fluid ? element.addClass('fluid') : element.removeClass('fluid');
                attr.inverse ? element.addClass('inverse-nav') : element.removeClass('inverse-nav');
                // attr.alphaLight ? element.addClass('alpha-light-nav') : element.removeClass('alpha-light-nav');
                attr.alphaDark ? element.addClass('alpha-dark-nav') : element.removeClass('alpha-dark-nav');
                attr.alphaDark ? element.addClass('alpha-dark-nav') : element.removeClass('alpha-dark-nav');

                function onScroll(e) {
                    if ($window.document.body.scrollTop > 50) {
                        element.addClass('fixed-nav');
                        $(".nav-fiexd-box").fadeIn();
                    } else if ($window.document.body.scrollTop > 50 && $window.document.body.scrollTop < 100) {
                        element.removeClass('fixed-nav');
                        $(".nav-fiexd-box").fadeOut();
                    } else {
                        $(".nav-fiexd-box").fadeIn();
                        element.find('.nav-fiexd-box').css('display', 'block');
                    }
                }

                // angular.element($window).bind('scroll', onScroll);
            }
        }
    }])
    /**
     * 学校定制化header
     */
    .directive('azxSchoolHeader', ['$window', function ($window) {
        return {
            restrict: 'EA',
            template: '' +
            '<div class="azx-school-header">' +
                '<div class="school-header">' +
                    '<div class="school-nav-bar">' +
                        '<div class="logo"><img id="logo" ng-src="{{indexFn.schoolLogo.logoUrl || \'https://s.aizhixin.com/lib/logo.png\' }}" class="logo"/></div>' +
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
            controller: function ($scope, $rootScope, $timeout, AuthService, $window, localStorageService, $location, $http, $interval, $templateCache) {
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
                        AuthService.signOut();
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
            '            <div azx-logo class="azx-logo-white"></div>' +
            '            <div class="footer-right">' +
            '               <div class="version">{{footerFn.connector}}{{product}} · ver.{{version}}</div>' +
            '               <div class="Copyright">Copyright © 2016-2018 北京知新树科技有限公司 aizhixin.com All Rights Reserved · <span>京ICP备160973号</span></div>' +
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
                    qrWeixin: $sce.trustAsHtml('<div class="barcode"><img src="https://s.aizhixin.com/QRcode_weixin.jpg"/></div>'),
                    qrQQ: $sce.trustAsHtml('<div class="barcode"><img src="https://s.aizhixin.com/QRcode_qq.png"/></div>'),
                    linksTop: [
                        {
                            "name": "世纪鼎利",
                            "href": "http://www.dingli.com/"
                        },
                        {
                            "name": "鼎利教育",
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
    }])

    /**
     * azxSchoolFooter directive
     * @data-product 各产品名称
     * @data-fiexd   默认false:没有滚动条时，自动向页面底部浮动; true:不会自动向页面底部浮动
     * @data-version 各产品版本
     * example：
     * <div azx-school-footer data-product='知新开卷' data-version='0.2.0'></div>
     */
    .directive('azxSchoolFooter', ['$window', '$sce', '$interval', '$rootScope', function ($window, $sce, $interval, $rootScope) {
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
            '<svg version="1.1" id="azxlogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-75 7 150 50" style="enable-background:new -75 7 150 50;" xml:space="preserve">' +
            '<g> <path class="st0" d="M-53,30.4c3.9,0,7.3,2.3,8.7,5.7c0.6-2.3,1.1-4.9,1.1-7.4c0-8.5-3.8-16-9.7-21c-5.9,5.1-9.7,12.6-9.7,21 c0,2.5,0.3,5.1,1.1,7.4C-60.3,32.7-56.9,30.4-53,30.4"/> <path class="st0" d="M-62.4,39.8c0-4.7,3.3-8.5,7.7-9.3c-0.4-0.7-0.8-1.5-1.4-2.2c-4.2-5.8-10.8-9-17.8-9.3 c-1.9,6.7-1.1,14,3.1,19.8c2.9,4.1,7,6.9,11.5,8.2C-61.1,45.2-62.4,42.7-62.4,39.8"/> <path class="st1" d="M-56.2,28.3c-1.6-2.3-3.6-4.1-5.9-5.6c-0.4,1.9-0.6,3.9-0.6,6c0,2.5,0.3,5.1,1.1,7.4c0-0.1,0.1-0.1,0.1-0.2 s0.1-0.2,0.1-0.2c0.1-0.1,0.1-0.3,0.2-0.4c0-0.1,0.1-0.1,0.1-0.2c0.1-0.2,0.2-0.4,0.3-0.5c0,0,0,0,0-0.1c0.3-0.4,0.6-0.8,1-1.2 c0,0,0,0,0.1-0.1c0.2-0.2,0.3-0.3,0.5-0.4c0,0,0.1,0,0.1-0.1c0.2-0.1,0.4-0.3,0.5-0.4l0,0c1.1-0.7,2.3-1.3,3.7-1.6 C-55.2,29.8-55.6,29-56.2,28.3"/> <path class="st0" d="M-32.4,19c-7,0.3-13.4,3.5-17.6,9.3c-0.5,0.7-1,1.5-1.4,2.2c4.4,0.7,7.8,4.7,7.8,9.3c0,2.9-1.3,5.4-3.3,7.1 c4.5-1.5,8.6-4.2,11.4-8.2C-31.3,32.8-30.4,25.7-32.4,19"/> <path class="st1" d="M-50,28.3c-0.5,0.7-1,1.5-1.4,2.2c1.7,0.3,3.2,1.1,4.4,2l0,0c0.2,0.2,0.4,0.3,0.5,0.5l0,0 c0.5,0.5,1.1,1.2,1.5,1.9c0,0,0,0.1,0.1,0.1c0.1,0.2,0.2,0.3,0.3,0.5c0,0.1,0.1,0.1,0.1,0.2s0.1,0.2,0.1,0.2 c0.6-2.3,1.1-4.9,1.1-7.4c0-2.1-0.2-4.1-0.6-6.1C-46.3,24.1-48.3,26-50,28.3"/> <path class="st0" d="M-48.2,39.9c0-2.6-2.1-4.9-4.9-4.9c-2.6,0-4.9,2.1-4.9,4.9c0,1.7,1,3.2,2.2,4.1v9.4c0,1.4,1.2,2.5,2.5,2.5 s2.5-1.2,2.5-2.5V44C-49.1,43.1-48.2,41.6-48.2,39.9"/> </g> <g> <g> <path class="st2" d="M22.7,11.6h-0.1c-2.9,0-5.2,2.1-5.6,4.9h0.1C19.8,16.5,22.3,14.3,22.7,11.6z"/> <path class="st3" d="M64.2,50c-0.7,0.5-1.7,0.6-2.5,0.5c0.1-0.8,0.5-1.6,1.3-2.1c0.7-0.5,1.7-0.6,2.5-0.5 C65.4,48.6,64.9,49.5,64.2,50"/> </g> <g> <path class="st4" d="M24.2,39.9v-6.8c0-0.2-0.2-0.4-0.4-0.4h-1.7c-0.2,0-0.4,0.2-0.4,0.4v6c0,1.8,1.5,3.2,3.2,3.2 c0.1,0,0.1,0,0.2,0s0-0.1,0-0.1C24.8,41.7,24.2,41,24.2,39.9z"/> <path class="st4" d="M74.5,17.2c-0.2,0-0.3,0-0.4,0c0,0,0,0-0.1,0c-0.1,0-0.2,0-0.4,0c-0.8,0-1.3-0.3-1.2-1.2v-2.9 c0-0.2-0.2-0.4-0.4-0.4h-1.7c-0.2,0-0.4,0.2-0.4,0.4v3c0,0.7-0.5,1.1-1.2,1.1h-3.1c-0.2,0-0.3,0.2-0.3,0.3v0.1 c0,0.2,0.2,0.3,0.3,0.3h3.1c0.7,0.1,1.1,0.4,1.2,1.1v23.1c0,0.2,0.2,0.4,0.4,0.4h1.7c0.2,0,0.4-0.2,0.4-0.4V19.2 c0-0.6,0.4-1.1,1.3-1.2c0.2,0,0.3,0,0.3,0s0,0,0.1,0c0.1,0,0.2,0,0.3,0c0.2,0,0.3-0.2,0.3-0.3v-0.2C74.9,17.3,74.7,17.2,74.5,17.2 z"/> <path class="st4" d="M-7.8,41.9c-3.5-1.9-4.8-9.8-5.6-12c-0.2-0.6-0.5-0.3-1-0.4C-15,29.4-15,28-14,28h5.3 c0.2,0,0.3-0.2,0.3-0.3v-0.1c0-0.2-0.2-0.3-0.3-0.3h-5.4c-0.2,0-0.4-0.1-0.4-0.4v-7.6c0-0.4,0.2-0.3,0.3-0.3h4.5 c0.2,0,0.3-0.2,0.3-0.3v-0.3c0-0.2-0.2-0.3-0.3-0.3h-8.9c-1.1,0,0.1-1.9,0.3-2.9l0.4-1.6c0-0.3-0.2-0.5-0.5-0.5h-1.5 c-0.3,0-0.6,0.2-0.7,0.5c-0.4,1.6-1,3.2-1.4,4.8c-0.1,0.3,0.1,0.5,0.4,0.5c1.4,0,2.6,0,4,0c0.1,0,0.3,0,0.3,0.4v7.5 c0,0.3-0.1,0.5-0.4,0.5H-24c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3h6.2c0.1,0,0.4-0.1,0.3,0.3 c-0.3,3.6-4.7,13-6.6,13.5c-0.3,0.1-0.3,0.6,0,0.6h1.8c3,0,4.3-5.3,6.1-9.5c0.3-0.7,0.8-0.6,1-0.1c1.3,5.3,2.7,9.9,7.4,9.6 C-7.3,42.4-7.4,42-7.8,41.9z"/> <path class="st4" d="M14.1,32.7h-1.7c-0.2,0-0.4,0.2-0.4,0.4v5.9v0.1c-0.1,1.2-1.1,2.1-2.3,2.1H8.1c-1.3,0-2.3-1.1-2.3-2.3v-7 v-7.2v-0.5v-4.7c0-1.8-1.5-3.2-3.2-3.2h-5.2c-0.8,0-1.6,0.3-2.1,0.8v-0.6c0-0.2-0.2-0.4-0.4-0.4h-1.7c-0.2,0-0.4,0.2-0.4,0.4v25.6 c0,0.2,0.2,0.4,0.4,0.4H-5c0.2,0,0.4-0.2,0.4-0.4V18.2c0.4-0.6,1.2-1.1,1.9-1.1h3.8c1.3,0,2.3,1.1,2.3,2.3V21v6.8V35v4.1l0,0 c0,1.3-1.1,2.3-2.3,2.3h-3.8c-0.4,0-0.7-0.1-1.1-0.2V42c0.4,0.1,0.7,0.2,1.3,0.2h5.2c0.7,0,1.5-0.2,2-0.7c0.5,0.4,1.3,0.7,2,0.7 c1.6,0,3.2,0,4.8,0c1.8,0,3.2-1.5,3.2-3.2V39v-3.5v-2.3C14.5,32.9,14.3,32.7,14.1,32.7z"/> <path class="st4" d="M15,22l-1.3-3.2c-0.1-0.2-0.3-0.3-0.4-0.3h-1.5c-0.2,0-0.2,0.1-0.2,0.3l0.7,2.5c0.7,2.3,2.4,2.6,4,2.6 c0.2,0,0.2-0.4,0.1-0.5C16,23.1,15.2,22.7,15,22z"/> <path class="st4" d="M22.8,18.6c-0.2,0-0.4,0.1-0.4,0.3l-1.3,3.2c-0.3,0.6-1.2,1.2-1.6,1.5c-0.1,0.1-0.1,0.5,0.1,0.5 c1.6,0,3.3-0.2,4-2.6l0.7-2.5c0.1-0.2,0-0.3-0.2-0.3H22.8z"/> <path class="st4" d="M10.1,17.4h15.4c0.2,0,0.3-0.2,0.3-0.3v-0.2c0-0.2-0.2-0.3-0.3-0.3h-6.4c-0.6,0.2-1.4,0.3-2.1,0.3 c-0.2,0-0.4,0-0.6,0c0-0.1,0-0.2,0-0.3H10c-0.2,0-0.3,0.2-0.3,0.3V17C9.7,17.2,9.9,17.4,10.1,17.4z"/> <path class="st4" d="M26.4,24.7h-7.6h-0.5H9.6c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3h6.3c0.7,0,0.8,0.2,0.8,0.7 v3.1c0,0.5-0.2,0.7-0.7,0.8h-5.7c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3H16c0.6,0.1,0.7,0.4,0.8,1V42 c0,0.2,0.2,0.4,0.4,0.4h1.1h0.5H19c0.2,0,0.4-0.2,0.4-0.4V32c0-0.5,0.2-0.8,0.8-1H26c0.2,0,0.3-0.2,0.3-0.3v-0.1 c0-0.2-0.2-0.3-0.3-0.3h-5.7c-0.6-0.1-0.7-0.3-0.7-0.8v-3.1c0-0.5,0.1-0.7,0.8-0.7h6.3c0.2,0,0.3-0.2,0.3-0.3v-0.1 C26.8,24.9,26.6,24.7,26.4,24.7z"/> <path class="st4" d="M45.7,20.4H44c-0.2,0-0.4,0.2-0.4,0.4V39v0.1c-0.1,1.2-1.1,2.1-2.3,2.1h-1.7c-1.3,0-2.3-1.1-2.3-2.3V27 c0-1.1,0.6-1.4,1.6-1.5H40c0.2,0,0.3-0.2,0.3-0.3v-0.1c0-0.2-0.2-0.3-0.3-0.3h-8.6c-1-0.1-1.3-0.4-1.4-1.5v-4.4 c0-3.5,3.7-2.5,5.5-2.6c1.6,0.1,3.4-0.2,3.8-1.4c0.3-0.7-0.2-0.7-0.5-0.7h-2.2c-0.5,0-0.6,0-1.3,0.5c-2.3,2.3-7.8-1.4-7.9,4.2 v23.5c0,0.2,0.2,0.4,0.4,0.4h1.7c0.2,0,0.4-0.2,0.4-0.4V27.2c-0.1-1.1,0.4-1.5,1.4-1.7h2c1,0,1.4,0.5,1.4,1.6v11.9 c0,1.8,1.5,3.2,3.2,3.2c1.6,0,3.3,0,4.9,0c1.8,0,3.2-1.5,3.2-3.2V39V20.8C46.1,20.6,45.9,20.4,45.7,20.4z"/> <path class="st4" d="M67.8,20.6h-1.7c-0.2,0-0.4,0.2-0.4,0.4v18.5c0,2.3-1.6,2.5-2.4,0.4l-3-9l3.5-11c0.5-1.7,0.1-2.7-2-2.7 H51.1c-0.8,0-1.3-0.3-1.2-1.2v-2.9c0-0.2-0.2-0.4-0.4-0.4h-1.7c-0.2,0-0.4,0.2-0.4,0.4v3c0,0.7-0.5,1.1-1.2,1.1h-3.1 c-0.2,0-0.3,0.2-0.3,0.3v0.1c0,0.2,0.2,0.3,0.3,0.3h3.1c0.7,0.1,1.1,0.4,1.2,1.1v23.1c0,0.2,0.2,0.4,0.4,0.4h1.7 c0.2,0,0.4-0.2,0.4-0.4V19.2c0-0.6,0.4-1.1,1.3-1.2h9.3c1.5,0,1.4,1.5,0.8,3.1l-2.1,6.3l-2-5.9C57,21.1,56.8,21,56.2,21h-0.7 c-0.3,0-0.5,0.2-0.4,0.6l3.1,9.4l-3,9c-0.2,0.5-0.4,1-0.6,1.3c-0.2,0.2-0.7,1.2-0.1,1.1c1.5-0.3,3-1.5,3.4-2.9l1.5-4.8l1.5,4.8 c1.1,3.6,7.5,3.6,7.5-0.6V21C68.2,20.8,68,20.6,67.8,20.6z"/> <path class="st4" d="M53,20.5h-1.3c-0.2,0-0.3,0.1-0.3,0.3c0,7.1,0,14.2,0,21.2c0,0.2,0.1,0.3,0.3,0.3H53 c0.2,0,0.3-0.1,0.3-0.3c0-7.1,0-14.2,0-21.2C53.3,20.6,53.2,20.5,53,20.5z"/> <path class="st4" d="M-16.1,48.1h1.1v1.1c0.3-0.5,0.6-0.8,0.8-1c0.3-0.2,0.6-0.3,0.9-0.3s0.7,0.1,1,0.3 l-0.6,0.9c-0.2-0.1-0.3-0.1-0.5-0.1c-0.3,0-0.6,0.2-0.9,0.5c-0.3,0.3-0.5,0.7-0.6,1.2c-0.1,0.5-0.2,1.4-0.2,2.7v2.6h-1.1V48.1z"/> <path class="st4" d="M-11.5,45.9c0-0.2,0.1-0.4,0.3-0.6c0.2-0.2,0.4-0.2,0.6-0.2c0.2,0,0.5,0.1,0.6,0.2 c0.2,0.2,0.3,0.4,0.3,0.6c0,0.2-0.1,0.4-0.3,0.6c-0.2,0.2-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2C-11.4,46.3-11.5,46.1-11.5,45.9 M-11.1,48.1h1.1v7.8h-1.1V48.1z"/> <rect x="-8" y="45.1" class="st4" width="1.1" height="10.8"/> <rect x="-4.9" y="45.1" class="st4" width="1.1" height="10.8"/> <path class="st4" d="M-2.2,45.9c0-0.2,0.1-0.4,0.3-0.6c0.2-0.2,0.4-0.2,0.6-0.2c0.2,0,0.4,0.1,0.6,0.2 c0.2,0.2,0.3,0.4,0.3,0.6c0,0.2-0.1,0.4-0.3,0.6c-0.2,0.2-0.4,0.2-0.6,0.2c-0.2,0-0.5-0.1-0.6-0.2C-2.1,46.3-2.2,46.1-2.2,45.9 M-1.8,48.1h1.1v7.8h-1.1V48.1z"/> <path class="st4" d="M31,56.1V45h5.2v0.9H32v3.8h3.6v0.9H32v5.5H31z"/> <path class="st4" d="M43.9,48.1v4.8c0,0.5,0,0.9-0.1,1.2c-0.1,0.6-0.5,1.2-1.1,1.6c-0.6,0.4-1.2,0.6-2,0.6 c-0.4,0-0.9-0.1-1.3-0.2c-0.4-0.2-0.7-0.4-1-0.6c-0.3-0.3-0.5-0.6-0.7-1c-0.1-0.4-0.2-0.9-0.2-1.5v-4.8h0.9v4.8c0,0.2,0,0.3,0,0.4 c0,0.1,0,0.3,0.1,0.5c0.1,0.5,0.4,0.9,0.7,1.1c0.4,0.3,0.9,0.4,1.4,0.4c1.5,0,2.2-0.8,2.2-2.5v-4.8H43.9z"/> <path class="st4" d="M57.9,48.1v4.8c0,0.5,0,0.9-0.1,1.2c-0.1,0.6-0.5,1.2-1.1,1.6c-0.6,0.4-1.2,0.6-2,0.6 c-0.4,0-0.9-0.1-1.3-0.2c-0.4-0.2-0.7-0.4-1-0.6c-0.3-0.3-0.5-0.6-0.7-1c-0.1-0.4-0.2-0.9-0.2-1.5v-4.8h0.9v4.8c0,0.2,0,0.3,0,0.4 c0,0.1,0,0.3,0.1,0.5c0.1,0.5,0.4,0.9,0.7,1.1c0.4,0.3,0.9,0.4,1.4,0.4c1.5,0,2.2-0.8,2.2-2.5v-4.8H57.9z"/> <path class="st4" d="M73.3,52.5h-6.9c0,0.9,0.3,1.6,0.9,2.2c0.6,0.6,1.3,0.8,2.2,0.8c1.3,0,2.3-0.6,2.9-1.9 l0.9,0.4c-0.4,0.8-0.9,1.3-1.5,1.7c-0.6,0.4-1.3,0.5-2.2,0.5c-1.2,0-2.2-0.4-2.9-1.1c-0.7-0.8-1.1-1.8-1.1-3 c0-1.2,0.4-2.3,1.1-3.1c0.8-0.8,1.7-1.2,2.9-1.2c1.1,0,2,0.4,2.8,1.1c0.7,0.8,1.1,1.7,1.1,2.9L73.3,52.5z M69.4,48.7 c-0.8,0-1.5,0.3-2,0.8c-0.5,0.5-0.9,1.2-1,2.1h5.9c0-0.9-0.3-1.6-0.8-2.1C70.9,49,70.3,48.7,69.4,48.7z"/> <path class="st4" d="M-24,45h2.2c1.2,0,2,0.2,2.7,0.7c0.6,0.4,0.9,1.3,0.9,2.1c0,0.5-0.1,1-0.4,1.4 c-0.2,0.4-0.6,0.7-1.1,0.9c0.8,0.2,1.3,0.6,1.7,1.1c0.4,0.5,0.6,1,0.6,1.7c0,0.9-0.3,1.6-1,2.2c-0.7,0.6-1.5,0.9-2.6,0.9H-24V45z M-22.9,46v3.7h0.6c1,0,1.7-0.1,2.2-0.4c0.5-0.3,0.7-0.9,0.7-1.5c0-1-0.7-1.8-2.2-1.8H-22.9z M-22.9,50.8v4h1.4 c0.8,0,1.4-0.1,1.8-0.2c0.4-0.2,0.7-0.4,0.9-0.7c0.2-0.3,0.4-0.6,0.4-1c0-0.3-0.1-0.6-0.2-0.9c-0.1-0.3-0.3-0.5-0.6-0.7 c-0.3-0.2-0.6-0.3-0.9-0.4c-0.4-0.1-1-0.1-2-0.1H-22.9z"/> <path class="st4" d="M60.8,48.1h1.1c0,0,0,3.8,0,5.1v2.6h-1.1V48.1z"/> <path class="st4" d="M9.9,48.1v7.7h-1v-1.3c-0.9,1.1-2,1.6-3.2,1.6c-1.2,0-2.2-0.4-3.1-1.2 c-0.8-0.8-1.2-1.8-1.2-2.9c0-1.1,0.4-2.1,1.3-2.9c0.8-0.8,1.8-1.2,3-1.2c1.3,0,2.4,0.5,3.3,1.6v-1.4H9.9z M8.9,52 c0-0.9-0.3-1.6-0.9-2.2c-0.6-0.6-1.4-0.9-2.3-0.9S4,49.1,3.4,49.8c-0.6,0.6-0.9,1.4-0.9,2.2c0,0.9,0.3,1.6,1,2.2 c0.6,0.6,1.4,0.9,2.3,0.9c0.9,0,1.7-0.3,2.3-0.9C8.6,53.7,8.9,52.9,8.9,52"/> <path class="st4" d="M12.3,48.1h1.1v1.4c0.8-1.1,1.9-1.6,3.1-1.6c0.6,0,1.2,0.2,1.7,0.5 c0.5,0.3,0.8,0.7,1,1.2c0.2,0.5,0.3,1.3,0.3,2.3v4h-1.1v-3.7c0-0.9,0-1.5-0.1-1.8c-0.1-0.3-0.2-0.6-0.4-0.8 c-0.2-0.2-0.4-0.4-0.7-0.5c-0.3-0.1-0.6-0.2-1-0.2c-0.4,0-0.8,0.1-1.2,0.3c-0.4,0.2-0.7,0.4-1,0.8c-0.3,0.3-0.4,0.7-0.5,1 c-0.1,0.3-0.1,1.1-0.1,2.1v2.8h-1.1V48.1z"/> <path class="st4" d="M23.7,54.6c0,0.3,0,0.4,0.1,0.5c0.1,0,0.3,0.1,0.6,0.1H25V56c-0.4,0.1-0.8,0.1-1,0.1 c-0.5,0-0.8-0.1-1-0.3c-0.2-0.2-0.3-0.6-0.3-1v-5.8h-1.5v-0.8h1.5v-3h1.1v3h1.7v0.8h-1.7V54.6z"/> <path class="st4" d="M48.1,54.6c0,0.3,0,0.4,0.1,0.5c0.1,0,0.3,0.1,0.6,0.1h0.6V56c-0.4,0.1-0.8,0.1-1,0.1 c-0.5,0-0.8-0.1-1-0.3c-0.2-0.2-0.3-0.6-0.3-1v-5.8h-1.5v-0.8h1.5v-3h1.1v3h1.7v0.8h-1.7V54.6z"/> </g> </g>' +
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
            if (input) {
                return input.getShortForm(len);
            } else {
                return input
            }
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
                //console.error('This is not a regular Form name scope');
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
                //console.error('This is not a regular Form name scope');
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
                //console.error('You are using undefined validator "%s"', validator);
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
                integergt0: function (value) {
                    var numberreg = /^\+?[1-9][0-9]*$/;
                    return !value || numberreg.test(value);
                },
                integer1to100: function (value) {
                    var numberreg =/^([1-9][0-9]{0,1}|100)$/;
                    return !value || numberreg.test(value);
                },
                workscore: function (value) {
                    var numberreg = /^(\d{1,2}?(\.\d{1,2})?|100)$/;
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
                integergt0: {
                    error: '只能填写大于0的整数',
                    success: ''
                },
                integer1to100: {
                    error: '只能填写1到100的整数',
                    success: ''
                },
                workscore: {
                    error: '请输入小数不超过2位的0-100的分数',
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
