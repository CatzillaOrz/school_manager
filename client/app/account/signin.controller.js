'use strict';

angular.module('dleduWebApp')
    .controller('SignInCtrl', function ($scope, $state, $window, AuthService, ngDialog,CommonService,messageService) {
        $scope.signinFn = {
            product:CommonService.product,
            signInError: '',
            form: {
                username: '',
                password: ''
            },
            redirectURL: "home",
            keyPressHandle: function ($event) {
                var that = this;
                if ($event.keyCode == 13) {
                    if (that.form.username && that.form.password) {
                        that.signIn();
                    }
                }
            },
            inputOnFocus:function(){
                $('input[name = username]').removeClass('empty-input');
                $('input[name = password]').removeClass('empty-input');
            },
            signIn: function () {
                var that = this;
                that.signInError = '';
                if(that.form.username == ''){
                    $('input[name = username]').addClass('empty-input');
                    return;
                }else if(that.form.password == ''){
                    $('input[name = password]').addClass('empty-input');
                    return;
                }
                AuthService.signIn(that.form.username, that.form.password)
                    .then(function (user) {
                         //$state.go('index');
                        if(user.roleNames){
                            if(user.roleNames.toString().indexOf("ROLE_ORG_ADMIN") != -1 || user.roleNames.toString().indexOf("ROLE_COLLEGE_ADMIN") != -1
                                || user.roleNames.toString().indexOf("ROLE_ORG_MANAGER") != -1 || user.roleNames.toString().indexOf("ROLE_ORG_DATAVIEW") != -1
                                || user.roleNames.toString().indexOf("ROLE_COLLEG_DATAVIEW") != -1 || user.roleNames.toString().indexOf("ROLE_ORG_EDUCATIONALMANAGER") != -1
                                || user.roleNames.toString().indexOf("ROLE_COLLEG_EDUCATIONALMANAGER") != -1){//
                                that.toRedirectUrl();
                            }else {
                                messageService.openMsg("您没有管理员权限！")
                            }
                        }else{
                            messageService.openMsg("没有找到roleNames属性！")
                        }

                    })
                    .catch(function (err) {
                        that.signError(err);
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
                }, 1000);
            },
            toRedirectUrl: function () {
                var that = this;
                var domain = $window.location.hostname.toString();
                var subdomain = domain.split('.')[1];
                var locaUrl = $window.location.protocol + '//' + $window.location.host + $window.location.pathname;

                if (decodeURIComponent(that.redirectURL) != locaUrl) {
                    if (subdomain == 'aizhixin' || domain == 'localhost' || domain == 'dlztc') {
                        $window.location.href = decodeURIComponent(that.redirectURL);
                    } else {
                        $state.go('home');
                    }
                }else{
                    $state.go('home');
                }
            },
            init: function () {
                var that = this;
                var _urlparam = $window.location.search;
                if (_urlparam.indexOf("?redirectUrl=") != -1 && _urlparam.indexOf("?redirectUrl=") == 0) {
                    that.redirectURL = decodeURI(_urlparam.substr(13));
                } else if ($window.document.referrer.length > 0) {
                    that.redirectURL = $window.document.referrer;
                }else{
                    try {
                        if (that.redirectURL.length == 0 && $window.opener.location.href.length > 0) {
                            that.redirectURL = $window.opener.location.href;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                /*
                 //for localhost test
                 var domain =$window.location.hostname.toString();
                 var subdomain = domain.split('.')[1];
                 console.log(domain);
                 console.log(subdomain);
                 */
            },
            toIndex:function(){
                AuthService.navigation(0,'/');
            }
        };
        $scope.signinFn.init();
    });
