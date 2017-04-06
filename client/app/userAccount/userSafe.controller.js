'use strict';

angular.module('dleduWebApp')
    .controller('UserSafeCtrl', function ($scope, $rootScope, AuthService, $state, $interval,UserAccountService,ngDialog) {

        var _user = {
            activated: true,
            avatar: "http://oli56k5b0.bkt.clouddn.com/default_profile.jpg",
            collegeId: 403,
            collegeName: "经济管理系",
            createDate: 1472606801000,
            gender: "",
            id: 130430,
            login: "sjdr9130",
            mail: "123123@s222s.com",
            mailActivated: false,
            mailActivatedTime: null,
            name: "曹兴平",
            orgCode: "sjdr",
            orgDomainName: "sjdr",
            orgId: 243,
            orgLogo: "http://7xpscc.com1.z0.glb.clouddn.com/876ddb7e-8658-4ad1-8d0b-330708f60f0a.jpg",
            orgLptLogo: "http://7xpscc.com1.z0.glb.clouddn.com/169a445d-36e7-41b2-be6c-685d39a69b74.png",
            orgName: "电商",
            orgPtLogo: "http://7xpscc.com1.z0.glb.clouddn.com/ce5bb7a1-fe2b-486d-96c3-0c7869b5e031.png",
            phone: "13391218616",
            phoneActivated: true,
            phoneActivatedTime: null,
            role: "ROLE_TEACHER",
            roleNames: [],
            userGroup: "B",
            userName: "曹兴平",
            workNo: "9130"
        };
        var _interval;
        $scope.usFn = {
            user: null,
            level: '低',
            vilded: false,
            vildTime:60,
            vildBtn: '获取验证码',
            submit: false,
            alert:null,
            status: '',
            idata: {
                page: '',
                tips: '',
                steps: [],
                onStep: 1,
                cpMessage: {},
                hpMessage: {}
            },
            passForm: {
                password: '',
                repassword: '',
                code:''
            },
            phoneForm: {
                phone: '',
                vild: ''
            },
            mailForm: {
                mail: '',
                vild: ''
            },
            vildState: function () {
                var that = this;
                if ($state.current.data.page == '修改密码') {
                    console.log(that.user.phoneActivated);
                    that.user.phoneActivated ? that.phoneForm = { phone: that.user.phone, vild: ''} : that.phoneForm = { phone: '', vild: ''};
                    // that.status = 'setPass';
                    that.status = 'vildPhone';
                } else if ($state.current.data.page == '绑定手机') {
                    that.phoneForm = { phone: '', vild: ''};
                    that.status = 'vildPhone';
                } else if ($state.current.data.page == '修改手机') {
                    that.phoneForm = { phone: that.user.phone, vild: ''};
                    that.status = 'vildPhone';
                } else if ($state.current.data.page == '绑定邮箱') {
                    that.mailForm = { mail: '', vild: ''};
                    that.status = 'vildMail';
                } else if ($state.current.data.page == '修改邮箱') {
                    that.mailForm = { mail: that.user.mail, vild: ''};
                    that.status = 'vildMail';
                }
            },
            putPassword: function () {
                var that = this;
                var params={};
                that.submit = true;
                if(that.user.phoneActivated){
                    params={
                        password:that.passForm.password,
                        code:that.passForm.code
                    };
                    UserAccountService.updatePassword(params)
                        .success(function (data) {
                            console.log(data);
                            that.submit = false;
                            that.status = 'sucess';
                            that.nextStep();
                        })
                        .error(function (res) {
                            console.log(res);
                            that.submit = false;
                            that.alert = { type: 'danger', msg: res.message };
                        })
                }else{
                    params={
                        phone:that.phoneForm.phone,
                        password:that.passForm.password,
                        code:that.passForm.code
                    };
                    UserAccountService.updatePasswordBindPhone(params)
                        .success(function (data) {
                            console.log(data);
                            $rootScope.user.phoneActivated = true;
                            $rootScope.user.phone = that.phoneForm.phone;
                            AuthService.refreshUser();
                            that.submit = false;
                            that.status = 'sucess';
                            that.nextStep();
                        })
                        .error(function (res) {
                            console.log(res);
                            that.submit = false;
                            that.alert = { type: 'danger', msg: res.message };
                        })
                }
            },
            vildPhone: function () {
                var that = this;
                var params = {};
                that.submit = true;

                if ($state.current.data.page == '修改密码') {
                    params = {
                        sign:'updatepassword',
                        code:that.phoneForm.vild
                    };
                    UserAccountService.vildCode(params)
                        .success(function (data) {
                            that.passForm.code = that.phoneForm.vild;
                            that.submit = false;
                            that.status = 'setPass';
                            that.nextStep();
                        })
                        .error(function (res) {
                            console.log(res);
                            that.submit = false;
                            that.alert = { type: 'danger', msg: res.message };
                        });
                }else if(that.user.phoneActivated && $state.current.data.page == '修改手机') {
                    //
                    params = {
                        sign:'unbindingphone',
                        code:that.phoneForm.vild
                    };
                    console.log(params);
                    UserAccountService.vildCode(params)
                        .success(function (data) {
                            console.log(data);
                            that.vilded = false;
                            that.phoneForm.unbindingCode = that.phoneForm.vild;
                            $scope.user.phoneActivated = false;
                            that.phoneForm.phone = '';
                            that.phoneForm.vild = '';
                            that.status = 'vildPhone';
                            that.nextStep();
                        })
                        .error(function (res) {
                            console.log(res);
                            that.submit = false;
                            that.alert = { type: 'danger', msg: res.message };
                        });
                }else if (!that.user.phoneActivated && $state.current.data.page == '修改手机') {
                    //
                    params = {
                        phone:that.phoneForm.phone,
                        bindingCode:that.phoneForm.vild,
                        unbindingCode:that.phoneForm.unbindingCode
                    };
                    UserAccountService.changePhone(params)
                        .success(function (data) {
                            console.log(data);
                            $rootScope.user.phoneActivated = true;
                            $rootScope.user.phone = that.phoneForm.phone;
                            AuthService.refreshUser();
                            that.vilded = false;
                            that.status = 'sucess';
                            that.nextStep();
                        })
                        .error(function (res) {
                            console.log(res);
                            that.submit = false;
                            that.alert = { type: 'danger', msg: res.message };
                        });
                }else if ($state.current.data.page == '绑定手机') {
                    //
                    params = {
                        phone:that.phoneForm.phone,
                        code:that.phoneForm.vild
                    };
                    UserAccountService.bindPhone(params)
                        .success(function (data) {
                            console.log(data);
                            $rootScope.user.phoneActivated = true;
                            $rootScope.user.phone = that.phoneForm.phone;
                            AuthService.refreshUser();
                            that.vilded = false;
                            that.status = 'sucess';
                            that.nextStep();
                        })
                        .error(function (res) {
                            console.log(res);
                            that.submit = false;
                            that.alert = { type: 'danger', msg: res.message };
                        });
                }
            },
            vildMail: function () {
                var that = this;
                var params = {};
                that.submit = true;
                if (that.user.mailActivated && $state.current.data.page == '修改邮箱') {
                    //
                    params = {
                        code:that.mailForm.vild
                    };
                    UserAccountService.unBindMail(params)
                        .success(function (data) {
                            console.log(data);
                            $rootScope.user.mailActivated = false;
                            AuthService.refreshUser();
                            that.vilded = false;
                            that.mailForm = { mail: '', vild: ''};
                            that.status = 'vildMail';
                            that.nextStep();
                        })
                        .error(function (res) {
                            console.log(res);
                            that.submit = false;
                            that.alert = { type: 'danger', msg: res.message };
                        });
                } else {
                    //
                    params = {
                        mail:that.mailForm.mail,
                        code:that.mailForm.vild
                    };
                    console.log('==================');
                    UserAccountService.bindMail(params)
                        .success(function (data) {
                            console.log(data);
                            $rootScope.user.mailActivated = true;
                            $rootScope.user.mail = that.mailForm.mail;
                            AuthService.refreshUser();
                            that.vilded = false;
                            that.status = 'sucess';
                            that.nextStep();
                        })
                        .error(function (res) {
                            console.log(res);
                            that.submit = false;
                            that.alert = { type: 'danger', msg: res.message };
                        });
                }
            },
            nextStep: function () {
                var that = this;
                that.submit = false;
                that.idata.onStep++;
                that.vildTime = 60;
                that.vildBtn = '获取验证码';
                $interval.cancel(_interval);
            },
            getVcode: function (type) {
                var that = this;
                var params = {};
                that.vilded = true;
                if(type == 'phone'){
                    params = {
                        phone : that.phoneForm.phone
                    };
                    if (that.user.phoneActivated && $state.current.data.page == '修改密码') {
                        UserAccountService.sendPhoneCode()
                            .success(function (data) {
                                console.log(data);
                                that.intervalVcode();
                            })
                            .error(function (res) {
                                console.log(res);
                                that.vilded = false;
                                that.alert = { type: 'danger', msg: res.message };
                            })
                    }else if (!that.user.phoneActivated && $state.current.data.page == '修改密码') {
                        UserAccountService.sendBindPhoneCode(params)
                            .success(function (data) {
                                console.log(data);
                                that.intervalVcode();
                            })
                            .error(function (res) {
                                console.log(res);
                                that.vilded = false;
                                that.alert = { type: 'danger', msg: res.message };
                            })
                    }else if ($state.current.data.page == '绑定手机') {
                        UserAccountService.sendBindPhoneCode(params)
                            .success(function (data) {
                                console.log(data);
                                that.intervalVcode();
                            })
                            .error(function (res) {
                                console.log(res);
                                that.vilded = false;
                                that.alert = { type: 'danger', msg: res.message };
                            })
                    }else if (that.user.phoneActivated && $state.current.data.page == '修改手机') {
                        UserAccountService.sendUnBindPhoneCode(params)
                            .success(function (data) {
                                console.log(data);
                                that.intervalVcode();
                            })
                            .error(function (res) {
                                console.log(res);
                                that.vilded = false;
                                that.alert = { type: 'danger', msg: res.message };
                            })
                    }else if (!that.user.phoneActivated && $state.current.data.page == '修改手机') {
                        UserAccountService.sendBindPhoneCode(params)
                            .success(function (data) {
                                console.log(data);
                                that.intervalVcode();
                            })
                            .error(function (res) {
                                console.log(res);
                                that.vilded = false;
                                that.alert = { type: 'danger', msg: res.message };
                            })
                    }
                }else if(type == 'mail'){
                    params = {
                        mail : that.mailForm.mail
                    };
                    if ($state.current.data.page == '绑定邮箱') {
                        UserAccountService.sendBindMailCode(params)
                            .success(function (data) {
                                console.log(data);
                                that.intervalVcode();
                            })
                            .error(function (res) {
                                console.log(res);
                                that.vilded = false;
                                that.alert = { type: 'danger', msg: res.message };
                            })
                    }else if (that.user.mailActivated && $state.current.data.page == '修改邮箱') {
                        UserAccountService.sendUnBindMailCode(params)
                            .success(function (data) {
                                console.log(data);
                                that.intervalVcode();
                            })
                            .error(function (res) {
                                console.log(res);
                                that.vilded = false;
                                that.alert = { type: 'danger', msg: res.message };
                            })
                    }else if (!that.user.mailActivated && $state.current.data.page == '修改邮箱') {
                        UserAccountService.sendBindMailCode(params)
                            .success(function (data) {
                                console.log(data);
                                that.intervalVcode();
                            })
                            .error(function (res) {
                                console.log(res);
                                that.vilded = false;
                                that.alert = { type: 'danger', msg: res.message };
                            })
                    }
                }
            },
            intervalVcode:function(){
                var that = this;
                that.submit = false;
                _interval=$interval(function(){
                    if (that.vildTime <= 0) {
                        that.vildTime = 60;
                        that.vilded = false;
                        that.vildBtn = '获取验证码';
                    } else {
                        that.vildTime--;
                        // console.log(that.vildTime);
                        that.vildBtn = that.vildTime + '秒后重新获取';
                    }
                },1000,61);
            },
            btnChangePass:function(){
                var that = this;
                if(!that.user.phoneActivated){
                    ngDialog.open({
                        template:'<div><i class="fa fa-fw fa-info-circle text-muted"></i><span>修改密码需要绑定手机号码！</span></div>',
                        plain: true
                    });
                }else{
                    $state.go('userSetPassword');
                }
            },
            assessLevel:function(){
                var that = this;
                if (that.user.mailActivated && that.user.phoneActivated) {
                    that.level = '高'
                } else if (!that.user.mailActivated && !that.user.phoneActivated) {
                    that.level = '低'
                } else {
                    that.level = '中'
                }
            },
            init: function () {
                var that = this;
                that.user = $rootScope.user = AuthService.getUser();
                // that.user = _user;
                that.idata = $state.current.data;
                that.vildState();
            }
        };
        $scope.usFn.init();
        $scope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {

            console.log(toState.data);
            toState.data ? $scope.usFn.idata = toState.data : $scope.usFn.idata = {
                page: '',
                tips: '',
                steps: [],
                onStep: 1,
                cpMessage: {},
                hpMessage: {}
            };
            $scope.usFn.idata.onStep = 1;
            console.log($scope.usFn.idata);
            $scope.usFn.vildState();
        });
        $rootScope.$watch('user', function () {
            $scope.usFn.user = $rootScope.user;
            $scope.usFn.assessLevel();
        }, true);
    });
