'use strict';

angular.module('dleduWebApp')
    .controller('IndexSchoolCtrl', function ($scope, $rootScope, $location, $window, AuthService, $timeout, $state,
                                             CollegeService, messageService, SchoolService, CommonService, ngDialog) {
        $scope.template1Fn={
            singinType: true,
            product:CommonService.product,
            schoolInfo:{},
            params:{orgId:215},
            badgeWhiteLogo:null,
            badgeAndFontWhiteLogo:null,
            QrTimeOut: true,
            QrCode: false,
            signInError: '',
            qrcode: null,
            socket: null,
            baseUrl: {
                mobileUrl: "",
                socketIoUrl: ""
            },
            form: {
                username: '',
                password: ''
            },
            getLogoList:function () {
                var _this=this;
                var params={
                    orgId:_this.params.orgId
                };
                SchoolService.getLogoList(params).$promise
                    .then(function (data) {
                        console.log(data);
                        angular.forEach(data.data,function (temp) {
                            if(temp.logoSort==3){
                                _this.badgeWhiteLogo=temp;
                            }
                            if(temp.logoSort==4){
                                _this.badgeAndFontWhiteLogo=temp;
                            }
                        })
                        $("#logo").attr('src', _this.badgeAndFontWhiteLogo.logoUrl);
                        $("#badge").attr('src', _this.badgeWhiteLogo.logoUrl);
                        $(".logo").css("display","inline-block")
                        $("#badge").css("display","inline-block")
                    })
                    .catch(function (error) {

                    })
            },
            getSchoolInfo:function () {
                var _this=this;
                var domain = $location.host();
                var code = domain.split('.')[0];
                var params = {
                    domainname: code
                };
                if(AuthService.getUser()){
                    params.domainname=AuthService.getUser().orgDomainName;
                }
                SchoolService.getSchoolByDomain(params).$promise
                    .then(function (data) {
                        _this.schoolInfo=data;
                        _this.params.orgId=data.id;
                        _this.getLogoList();
                    })
                    .catch(function (error) {

                    })
            },

	        /**
             * 新生激活
             */
            toActive: function(){
                //window.location.href = "http://passport.aizhixintest.com/userActiveOfficialDef?org=lmcs" ;
                var domain = location.hostname.split(".")[0];
                if(domain.length == 4){
                    var url =  '//' + "passport"+location.hostname.replace(domain, "") + "/userActiveOfficialDef?org=" + domain;
                    window.open(url, '_blank');
                }
            },

	        /**
             * 忘记密码
             */
            forgotPassword:function(){
                //window.location.href = 'http://passport.aizhixintest.com/account/forgotpassworddef?org=lmcs';
                /*if (("org" in search) && search.org) {
                    //window.location.href = "//" + location.hostname + "//account/forgotpassworddef?org=" + search.org;
                 window.open("passport."+location.hostname+"/login","_blank");
                } else {
                    window.location.href = "//" + location.hostname + "//account/forgotpassword"
                }*/
                var domain = location.hostname.split(".")[0];
                if(domain.length == 4){
                    var url =  '//' + "passport"+location.hostname.replace(domain, "") + "/account/forgotpassworddef?org=" + domain;
                    window.open(url, '_blank');
                }
            },

            isLogin: function(){
                return AuthService.isLogin();
            },

            //二维码和账号登录切换
            singinToggle: function () {
                this.singinType = !this.singinType;
                this.generateQRCode();
            },
            redirectURL: null,
            keyPressHandle: function ($event) {
                var that = this;
                if ($event.keyCode == 13) {
                    if (that.form.username && that.form.password) {
                        that.signIn();
                    }
                }
            },

            /**
             * 用户名密码登录
             */
            signIn: function () {
                var that = this;
                that.signInError = '';
                var flag=that.form.username=='' ||that.form.username==undefined||that.form.password==''||that.form.password==undefined;
                if(flag){
                    CommonService.msgDialog("用户名密码不能为空！",3);
                    return;
                }
                //this.isShowCourse = false;
                AuthService.signIn(that.form.username, that.form.password)
                    .then(function (user) {
                        var isCustomize = AuthService.isCustomize();
                        // if (isCustomize) {
                        //     var code = $location.host().split('.')[0];
                        //     if (user.orgCode == code) {
                        //         that.toRedirectUrl();
                        //     } else {
                        //         CommonService.msgDialog("非本校成员，禁止登录!", 2);
                        //         $timeout(function () {
                        //             AuthService.clearUser();
                        //             //AuthService.signOut();
                        //         }, 1500);
                        //     }
                        // } else {
                        //     that.toRedirectUrl();
                        // }
                    })
                    .catch(function (err) {
                        that.signError(err);
                    });
            },
            /**
             * 扫码登录
             * @param token
             */
            qrcodeSignIn: function (token) {
                var that = this;
                that.signInError = '';
                AuthService.qrcodeSignIn(token)
                    .then(function (user) {
                        var isCustomize = AuthService.isCustomize();
                        // if (isCustomize) {
                        //     var code = $location.host().split('.')[0];
                        //     if (user.orgCode == code) {
                        //         that.toRedirectUrl();
                        //     } else {
                        //         CommonService.msgDialog("非本校成员，禁止登录!", 2);
                        //         $timeout(function () {
                        //             AuthService.clearUser();
                        //             //AuthService.signOut();
                        //         }, 1500);
                        //     }
                        // } else {
                        //     that.toRedirectUrl();
                        // }
                        that.toRedirectUrl();
                    })
                    .catch(function (err) {
                        var error = {
                            message: "扫码登录失败"
                        }
                        that.signError(error);
                    });
            },
            signError: function (err) {
                $scope.processing = false;
                $scope.signInError = err.message;
                ngDialog.open({
                    template: '<span class="text-warning">' + err.message + '</span>',
                    plain: true
                });
                setTimeout(function () {
                    ngDialog.closeAll();
                }, 1500);
            },
            toRedirectUrl: function () {
                AuthService.navigation(5, '/');
            },

            toIndex: function () {
                AuthService.navigation(0, '/');
            },
            createQRCode: function (url, id, time) {
                var _this = this;
                _this.qrcode.clear(); // clear the code.
                var url = url + "?soketId=" + id + "&createTime=" + time + "&Identification=azxpcsingin"
                _this.qrcode.makeCode(url);
                _this.timeOut();
            },
            initQrCode: function () {
                this.qrcode = new QRCode(document.getElementById("qrcode"), {
                    text: "init",
                    // render: "table",
                    width: 120,
                    height: 120,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                var margin = ($("#qrcode").height() - $("#qrcode-logo").height()) / 2;

                $("#qrcode-logo").css("margin", margin);
            },
            //计时器
            timeOut: function () {
                var _this = this;
                $timeout(function () {
                    _this.QrTimeOut = true;
                    _this.socket.on('disconnect', function () {
                    });
                }, 60000)
            },
            getUrl: function () {
                var _this = this;
                return SchoolService.getUrl().$promise
                    .then(function (data) {
                        _this.baseUrl = data;
                    });
            },
            /**
             * 创建socket
             */
            createSocket: function () {
                var _this = this;
                _this.socket = io(_this.baseUrl.socketIoUrl);
                _this.socket.on('connect', function (data) {
                    SchoolService.getTimestamp().$promise
                        .then(function (data) {
                            // console.log(data)
                            _this.createQRCode(_this.baseUrl.mobileUrl, _this.socket.id, data.timestamp);
                        });

                });
                _this.socket.on('connect_error', function (data) {
                    // console.log("socket链接失败")
                    _this.createQRCode("error", 9527);
                    _this.socket.close();
                });
                _this.socket.on('ready', function (data) {
                    //console.log(data);
                    if (data == "success") {
                        $scope.$apply(function () {
                            _this.QrCode = true;
                        })

                    }

                });
                _this.socket.on('success', function (data) {
                    // console.log(data);
                    alert();
                    var temp = data.split(" ")
                    _this.qrcodeSignIn(temp[1]);
                    _this.socket.on('disconnect', function () {
                    });
                });

            },
            /**
             * 创建长连接同时生成二维码
             */
            generateQRCode: function () {
                var _this = this;
                if (_this.QrTimeOut) {
                    if (!this.singinType) {
                        _this.QrTimeOut = false;
                        _this.createSocket();
                        $timeout(function () {
                            $("#qrcode").removeAttr("title");
                        }, 500)
                    }
                }
            },
            /**
             * 二维码刷新
             */
            refreshQRCode: function () {
                var _this = this;
                _this.generateQRCode();
            },
            toSchoolIndex: function () {
                AuthService.navigation(5, "/");
            },

	        /**
	         * 点击去往不同的功能
             */
            goPage: function(host, path){
                if(!AuthService.isLogin() && (host!=3 && host != 4)){
                    messageService.openMsg("请先登录！")
                    return;
                }
                if(host == '6'){
                    if(!this.showLearn){
                        messageService.openMsg("请没有访问权限！")
                        return;
                    }
                    var role = AuthService.getUser().roleNames.join("");
                    if(role == 'ROLE_STUDENT'){
                        path = '/student/list';
                    }else{
                        path = '/monitor';
                    }
                }
                AuthService.navigation(host, path);
            },

            /**
             *是否显示学情
             */
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

            init:function () {
                var that=this;
                that.schoolInfo=  CommonService.getSchool();
                this.isShowCourse = true;
                console.log(that.schoolInfo);
                if(that.schoolInfo){
                    that.params.orgId=that.schoolInfo.id;
                    that.getLogoList();
                }else {
                    that.getSchoolInfo();
                }
                that.initQrCode();
                that.getUrl();
                var _urlparam = $window.location.search;
                if (_urlparam.indexOf("?redirectUrl=") != -1 && _urlparam.indexOf("?redirectUrl=") == 0) {
                    that.redirectURL = decodeURI(_urlparam.substr(13));
                } else if ($window.document.referrer.length > 0) {
                    that.redirectURL = $window.document.referrer;
                } else {
                    try {
                        if (that.redirectURL.length == 0 && $window.opener.location.href.length > 0) {
                            that.redirectURL = $window.opener.location.href;
                        }
                    } catch (e) {
                        // console.log(e);
                    }
                }

                that.isShowLearn();
            }
        }
        $scope.template1Fn.init();
    });