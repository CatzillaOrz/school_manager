'use strict';

angular.module('dleduWebApp')
    .controller('ForgotPasswordCtrl', function ($scope, $state, $interval, ngDialog, ForgetPasswordService, AccountService) {
        //用户名，验证码
        $scope.form = {
            forget: {}
        };

        $scope.validMessge = null;
        var securityCode_path = '/securityCode';
        $scope.securityCode = '';

        $scope.refreshSecurityCode = function () {
            $scope.securityCode = securityCode_path + "?r" + Math.random();
            $scope.form.forget.securityCode = '';
        };


        //再次获取验证码
        $scope.againCaptchaBtn = 59;
        $scope.captchaDisbled = false;
        $scope.againCaptcha = function () {
            $scope.captchaDisbled = true;
            $scope.againCaptchaBtn = 59;
            $scope.phoneCodeBtn = $scope.againCaptchaBtn + '秒后再次发送验证码';
            var CAPInterval = $interval(function () {
                if ($scope.againCaptchaBtn > 0) {
                    $scope.againCaptchaBtn--;
                    $scope.phoneCodeBtn = $scope.againCaptchaBtn + '秒后再次发送验证码';
                } else {
                    $scope.againCaptchaBtn = 59;
                    $scope.phoneCodeBtn = '发送验证码到手机';
                    $scope.captchaDisbled = false;
                    $scope.$broadcast('interval.Complete');
                }
            }, 1000);
            $scope.$on('interval.Complete', function () {
                $interval.cancel(CAPInterval);
            })
        };

        //用户手机，邮箱
        $scope.seekWay = {
            phone: '',
            email: '',
            type: ''
        };
        var steps = ['accountForm', 'seek', 'reset', 'complete'];
        $scope.goStep = function (step) {
            //$scope.step = _.contains(steps, step) ? step : 'accountForm';
            $scope.step = step ? step : 'accountForm';
            if ($scope.step == 'reset') {
                if ($scope.validAvenue == 'mail') {
                    checkEmailValidCode('mail');
                } else {
                    checkEmailValidCode('phone');
                }
            } else if ($scope.step == 'accountForm') {
                //$scope.refreshSecurityCode();
            } else if ($scope.step == 'email') {
                $scope.seekWay.type = 'email';
            } else if ($scope.step == 'phone') {
                $scope.seekWay.type = 'phone';
            }
        };
        $scope.goStep($state.params.setup);

        $scope.checkAccountProcessing = false;

        $scope.validAccount = function () {
            //验证用户名英文字母开头不少于4位 或者 手机号码 11位数字 或者邮箱
            var reg = /^([A-z]\w{3,}|1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}|\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
            if (!$scope.form.forget.account || !reg.test($scope.form.forget.account)) {
                $scope.validMessge = "请填写有效账号";
                return;
            } else {
                $scope.validMessge = null;
            }
            var _params = {
                account: $scope.form.forget.account
                //securityCode: $scope.form.forget.securityCode
            };
            $scope.checkAccountProcessing = true;
            //$scope.goStep('phone');
            ForgetPasswordService.validAccount(_params)
                .success(function (data) {
                    $scope.checkAccountProcessing = false;
                    if (data.code && data.code == 40413018) {
                        $scope.validMessge = data.message;
                    } else if (data.phone) {
                        $scope.seekWay.phone = data.phone;
                        $scope.goStep('phone');
                    } else if (data.email) {
                        $scope.seekWay.email = data.email;
                        setEmailGate();
                        $scope.sendEmailValid(data.email);
                        $scope.goStep('email');
                    } else {
                        ngDialog.open({
                            template: '<span class="text-warning">您还没有绑定过手机和邮箱,请用初始密码登录。</span>',
                            plain: true
                        });
                    }
                })
                .error(function (err) {
                    $scope.checkAccountProcessing = false;
                    ngDialog.open({
                        template: '<span class="text-warning">' + err.message + '</span>',
                        plain: true
                    });
                    $scope.refreshSecurityCode();
                });
        };
        $scope.sendEmailValid = function (email) {
            ForgetPasswordService.sendEmailValid(email);
            $scope.againCaptcha();
        };

        // pre_reset_status in ['processing', 'ok', 'fail']
        $scope.pre_reset_status = 'processing';
        function checkEmailValidCode(param) {
            if (param && param == 'phone') {
                $scope.pre_reset_status = 'ok';
                return
            }
            $scope.pre_reset_status = 'processing';
            var _code = $state.params.code;
            if (!_code) {
                $scope.pre_reset_status = 'fail';
                return;
            }
            ForgetPasswordService.checkEmailValidCode(_code)
                .success(function (data) {
                    $scope.pre_reset_status = 'ok';
                })
                .error(function (err) {
                    $scope.pre_reset_status = 'fail';
                });
        }

        $scope.resetPwdProcessing = false;
        $scope.resetPwd = function () {
            $scope.resetPwdProcessing = true;
            var _code = $state.params.code;
            var params = {
                code: $scope.phoneCode,
                password: $scope.form.reset.password
            };
            if ($scope.seekWay.type == 'phone') {
                ForgetPasswordService.findAndSetPwd(params)
                    .success(function (data) {
                        console.log(data);
                        $scope.resetPwdProcessing = false;
                        $scope.goStep('complete');
                    })
                    .error(function (err) {
                        console.log(err);
                        $scope.resetPwdProcessing = false;
                        ngDialog.open({
                            template: '<span class="text-warning">' + err.message + '</span>',
                            plain: true
                        });
                    });
            } else if ($scope.seekWay.type == 'email') {
                ForgetPasswordService.resetPwd(_code, $scope.form.reset.password)
                    .success(function (data) {
                        $scope.resetPwdProcessing = false;
                        $scope.goStep('complete');
                    })
                    .error(function (err) {
                        $scope.resetPwdProcessing = false;
                        ngDialog.open({
                            template: '<span class="text-warning">' + err.message + '</span>',
                            plain: true
                        });
                    });
            }
        };

        $scope.emailGates = {};
        function setEmailGate() {
            var _emailDomain = $scope.seekWay.email.split("@").pop();
            $scope.seekWay.emailGate = $scope.emailGates[_emailDomain] ? $scope.emailGates[_emailDomain] : '//mail.' + _emailDomain;
        }

        ForgetPasswordService.getEmailGates()
            .success(function (data) {
                $scope.emailGates = data;
                if ($scope.seekWay.email) {
                    setEmailGate();
                }
            });


        $scope.phoneCodeBtn = '发送验证码到手机';
        $scope.sendMessageCode = function (phoneNum) {
            ForgetPasswordService.sendMessageCode(phoneNum)
                .success(function (data) {
                    $scope.resetPwdProcessing = false;
                    $scope.againCaptcha();
                })
                .error(function (err) {
                    $scope.resetPwdProcessing = false;
                    ngDialog.open({
                        template: '<span class="text-warning">' + err.message + '</span>',
                        plain: true
                    });
                });
        };
        $scope.validPhoneCode = function (phoneNumber, code) {
            ForgetPasswordService.validPhoneCode(phoneNumber, code)
                .success(function (data) {
                    $scope.resetPwdProcessing = false;

                    $scope.goStep('reset');
                })
                .error(function (err) {
                    $scope.resetPwdProcessing = false;
                    ngDialog.open({
                        template: '<span class="text-warning">' + err.message + '</span>',
                        plain: true
                    });
                });
        };
        $scope.$watch('step', function () {
            $scope.step == 'accountForm' && ($scope.stepProgress = 0);
            $scope.step == 'seek' && ($scope.stepProgress = 33);
            $scope.step == 'phone' && ($scope.stepProgress = 33);
            $scope.step == 'email' && ($scope.stepProgress = 33);
            $scope.step == 'reset' && ($scope.stepProgress = 66);
            $scope.step == 'complete' && ($scope.stepProgress = 100);
        })
    })

    .directive('pwCheck', function () {
        return {
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {

                ctrl.$validators.pwCheck = function (val) {
                    console.log( val === scope.resetForm.password.$modelValue);
                    return val === scope.resetForm.password.$modelValue;
                };
            }
        };
    });