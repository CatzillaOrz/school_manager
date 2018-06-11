'use strict';

angular.module('dleduWebService')
    .directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .factory('CommonService', function ($window, ngDialog,AuthService, $http, localStorageService, SchoolService, $location, $state) {
        return {
            product: {
                name: '知新网综合平台',
                version: '0.0.9.3'
            },
            isMSIE789: function () {
                return navigator.appName == 'Microsoft Internet Explorer' && /MSIE [7-9]/.test(navigator.appVersion);
            },
            browser: {
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
            },
            msgDialog: function (message, type) {
                var _class = 'text-info';
                if (type == 1) {
                    _class = 'text-success';
                } else if (type == 2) {
                    _class = 'text-warning';
                } else if (type == 3) {
                    _class = 'text-danger';
                } else {
                    _class = 'text-info';
                }
                ngDialog.open({
                    template: '<span class="' + _class + '">' + message + '</span>',
                    plain: true
                });
                setTimeout(function () {
                    ngDialog.closeAll();
                }, 1500);
            },
            getSchool: function () {
                var school = localStorageService.get('school');
                var _this = this;
                if (school) {
                    return school;
                } else {
                    var domain = $location.host();
                    var code = domain.split('.')[0];
                    var ipReg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ ;
                    var isIp=ipReg.test(domain);
                   // if (domain != "localhost"&&!isIp) {
                        var params = {
                           domainname: code
                           // domainname: "sjdr"
                        };
                    if(AuthService.getUser()){
                        params.domainname=AuthService.getUser().orgDomainName;
                    }
                        SchoolService.getSchoolByDomain(params).$promise
                            .then(function (data) {
                                school = data;
                                document.title = school.name;

                                _this.setSchool(school);
                                return school;
                            })
                            .catch(function (error) {

                            })
                   // }
                }
            },
            setSchool: function (school) {
                localStorageService.set("school", school)
            },
            strCut: function (strs, len) {
                var str_length = 0;
                if (strs != null) {
                    var str = strs.replace(/<img.+?>/ig, '');
                    var str_len = str.length;
                    var text;
                    var cut = [];
                    str = str.replace(/(\n)/g, "");
                    str = str.replace(/(\t)/g, "");
                    str = str.replace(/(\r)/g, "");
                    str = str.replace(/<\/?[^>]*>/g, "");
                    str = str.replace(/\s*/g, "");
                    str = str.replace(/<[^>]*>/g, "");
                    str = str.replace(/&nbsp;/g, "");
                    if (len) {
                        if (str_len < len) {
                            return str;
                        }
                    }
                    for (var i = 0; i < str_len; i++) {
                        text = str.charAt(i);
                        cut = cut.concat(text);
                        str_length++;
                        if (len) {
                            if (str_length >= len) {
                                cut = cut.concat('...');
                                return cut.join('');
                            }
                        }
                    }
                    return cut.join('');
                }
            },
            /**
             * api调用异常提示
             * @param error api错误返回值
             * @param defualt 默认提示
             * @returns {*}
             */
            exceptionPrompt: function (error, defualt) {
                var re = /[^\u4e00-\u9fa5]/;
                var errorMessage = error.data.replace(/\d+/g, '');
                errorMessage = errorMessage.replace(/[a-zA-Z]/g, '');
                errorMessage = errorMessage.replace('[', '');
                errorMessage = errorMessage.replace(']', '');
                errorMessage = errorMessage.replace('【', '');
                errorMessage = errorMessage.replace('】', '');
                errorMessage = errorMessage.replace('，', '');
                errorMessage = errorMessage.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
                if (re.test(errorMessage)) {
                    return defualt
                } else {
                    if(error.data && error.data == ''){
                        return defualt
                    }
                    return errorMessage;
                }
            },

            /**
             *
             * @param status 是否隐藏
             * @param type 添加类型 part局部添加 all整个添加
             */
            addLoading: function (status, type) {

            },

            /**
             *
             * @param obj 要处理的对象。全是属性
             */
            delEmptyProperty: function (obj) {
                for (var property in obj) {
                    if (!obj[property] || obj[property] == '') {
                        delete obj[property];
                    }
                }
            },
            /**
             *
             * @param status 是否隐藏
             * @param type 添加类型 part局部添加 all整个添加
             */
            curtainLayoutFn: function(status, type) {
                var divParent = '.show-container', imgSub = 'show-loading-img';
                if(type == 'part'){
                    divParent = '.show-container-part';
                    imgSub = 'show-loading-imgsub';
                }
                var html = '<div class="show-curtain"><img class="' + imgSub + '" src="https://s.aizhixin.com/loading.gif"></div>';
                $('body').append('<div class="show-container"></div>');
                if (status) {
                    if ($(divParent + ' .show-curtain').length === 0) {
                        $(divParent).append(html);
                    }
                } else {
                    $(divParent + ' .show-curtain').remove();
                    $(".show-container").remove();
                }
            }
        }
    });
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}