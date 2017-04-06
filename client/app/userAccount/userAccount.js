'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userAccount', {
                parent: 'base',
                abstract: true,
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        templateUrl: 'app/userAccount/userAccount.html',
                        controller : 'UserAccountCtrl'
                    }
                }
            })
            .state('userProfile', {
                parent: 'userAccount',
                url   : '/account',
                access: {requiredLogin: true},
                active:'个人资料',
                views : {
                    'profileContent@userAccount': {
                        templateUrl: 'app/userAccount/userProfile.html',
                        controller : 'UserProfileCtrl'
                    }
                }
            })
            .state('userAvatar', {
                parent: 'userAccount',
                url   : '/account/userAvatar',
                access: {requiredLogin: true},
                active:'个人资料',
                views : {
                    'profileContent@userAccount': {
                        templateUrl: 'app/userAccount/userAvatar.html',
                        controller : 'UserProfileCtrl'
                    }
                }
            })
            .state('userSafe', {
                parent: 'userAccount',
                url   : '/account/userSafe',
                access: {requiredLogin: true},
                active:'安全设置',
                data:{},
                views : {
                    'profileContent@userAccount': {
                        templateUrl: 'app/userAccount/userSafe.html',
                        controller : 'UserSafeCtrl'
                    }
                }
            })
            .state('userSetPassword', {
                parent: 'userAccount',
                url   : '/account/userSetPassword',
                access: {requiredLogin: true},
                active:'安全设置',
                data:{
                    page:'修改密码',
                    tips:'',
                    steps: [
                        {title: '获取验证码'},
                        {title: '修改密码'},
                        {title: '修改成功'}
                    ],
                    onStep:1,
                    cpMessage:{
                        active:false,
                        title:'恭喜您，已成功修改密码！',
                        content:'<p>您可以使用新的密码来登录,请妥善保存好您的密码。</p>',
                        link:{
                            name:'返回安全设置',
                            state:'userSafe'
                        }
                    },
                    hpMessage:{
                        active:true,
                        title:'没收到验证码？',
                        content:'<ol>1.网络通信异常可能导致电话/短信丢失或延迟，请耐心等待或重新获取</ol> <ol>2.请核实是否手机欠费，或第三方软件屏蔽了系统短信</ol>'
                    }
                },
                views : {
                    'profileContent@userAccount': {
                        templateUrl: 'app/userAccount/userSafeStep.html',
                        controller : 'UserSafeCtrl'
                    }
                }
            })
            .state('userBindPhone', {
                parent: 'userAccount',
                url   : '/account/userBindPhone',
                access: {requiredLogin: true},
                active:'安全设置',
                data:{
                    page:'绑定手机',
                    tips:'绑定手机成功后，您可使用手机号码进行身份验证和找回密码，请勿随意泄露手机号，以免造成个人损失。',
                    steps: [],
                    onStep:1,
                    cpMessage:{
                        active:false,
                        title:'恭喜您，已成功绑定手机!',
                        content:'<p>您可以使用手机号码来登录、找回密码和身份验证。</p>',
                        link:{
                            name:'返回安全设置',
                            state:'userSafe'
                        }
                    },
                    hpMessage:{
                        active:true,
                        title:'没收到验证码？',
                        content:'<ol>1.网络通信异常可能导致电话/短信丢失或延迟，请耐心等待或重新获取</ol> <ol>2.请核实是否手机欠费，或第三方软件屏蔽了系统短信</ol>'
                    }
                },
                views : {
                    'profileContent@userAccount': {
                        templateUrl: 'app/userAccount/userSafeStep.html',
                        controller : 'UserSafeCtrl'
                    }
                }
            })
            .state('userChangePhone', {
                parent: 'userAccount',
                url   : '/account/userChangePhone',
                access: {requiredLogin: true},
                active:'安全设置',
                data:{
                    page:'修改手机',
                    tips:'修改手机成功后，您可使用新手机号码进行身份验证和找回密码，请勿随意泄露手机号，以免造成个人损失。',
                    steps: [
                        {title: '验证身份'},
                        {title: '填写新手机'},
                        {title: '修改成功'}
                    ],
                    onStep:1,
                    cpMessage:{
                        active:false,
                        title:'恭喜您，已成功修改手机！',
                        content:'<p>您可以使用新的手机号码来登录、找回密码和身份验证。</p>',
                        link:{
                            name:'返回安全设置',
                            state:'userSafe'
                        }
                    },
                    hpMessage:{
                        active:true,
                        title:'没收到验证码？',
                        content:'<ol>1.网络通信异常可能导致电话/短信丢失或延迟，请耐心等待或重新获取</ol> <ol>2.请核实是否手机欠费，或第三方软件屏蔽了系统短信</ol>'
                    }
                },
                views : {
                    'profileContent@userAccount': {
                        templateUrl: 'app/userAccount/userSafeStep.html',
                        controller : 'UserSafeCtrl'
                    }
                }
            })
            .state('userBindMail', {
                parent: 'userAccount',
                url   : '/account/userBindMail',
                access: {requiredLogin: true},
                active:'安全设置',
                data:{
                    page:'绑定邮箱',
                    tips:'绑定邮箱后，您可以用邮箱登录，以及通过邮箱接收验证码来进行安全验证。',
                    steps: [],
                    onStep:1,
                    cpMessage:{
                        active:false,
                        title:'恭喜您，已成功绑定邮箱！',
                        content:'<p>您可以使用邮箱账号来登录、身份验证和找回密码。</p>',
                        link:{
                            name:'返回安全设置',
                            state:'userSafe'
                        }
                    },
                    hpMessage:{
                        active:true,
                        title:'没收到邮件？',
                        content:'<ol>1.网络通信异常可能导致邮件延迟，请耐心等待或重新获取</ol> <ol>2.请查看垃圾邮箱</ol>'
                    }
                },
                views : {
                    'profileContent@userAccount': {
                        templateUrl: 'app/userAccount/userSafeStep.html',
                        controller : 'UserSafeCtrl'
                    }
                }
            })
            .state('userChangeMail', {
                parent: 'userAccount',
                url   : '/account/userChangeMail',
                access: {requiredLogin: true},
                active:'安全设置',
                data:{
                    page:'修改邮箱',
                    tips:'',
                    steps: [
                        {title: '验证身份'},
                        {title: '填写新邮箱'},
                        {title: '修改成功'}
                    ],
                    onStep:1,
                    cpMessage:{
                        active:false,
                        title:'恭喜您，已成功修改邮箱！',
                        content:'<p>您可以使用新邮箱账号来登录、身份验证和找回密码。</p>',
                        link:{
                            name:'返回安全设置',
                            state:'userSafe'
                        }
                    },
                    hpMessage:{
                        active:true,
                        title:'没收到邮件？',
                        content:'<ol>1.网络通信异常可能导致邮件延迟，请耐心等待或重新获取</ol> <ol>2.请查看垃圾邮箱</ol>'
                    }
                },
                views : {
                    'profileContent@userAccount': {
                        templateUrl: 'app/userAccount/userSafeStep.html',
                        controller : 'UserSafeCtrl'
                    }
                }
            })
    });
