'use strict';

angular.module('dleduWebService')
    .factory('CommonService', function ($window, ngDialog, $http, localStorageService, SchoolService, $location, $state) {
        return {
            product: {
                name: '知新网综合平台',
                version: '0.0.5.4'
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
                    var url = $location.host().split('.')[0];
                    // url = "sjlb";
                    var params = {
                        domainname: url
                    };
                    SchoolService.getSchoolByDomain(params).$promise
                        .then(function (data) {
                            school = data;
                            document.title = school.name;

                            _this.setSchool(school);
                            return school;
                        })
                        .catch(function (error) {

                        })
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
                    if(len){
                        if (str_len < len) {
                            return str;
                        }
                    }
                    for (var i = 0; i < str_len; i++) {
                        text = str.charAt(i);
                        cut = cut.concat(text);
                        str_length++;
                        if(len){
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
            exceptionPrompt:function (error,defualt) {
                var re = /[^\u4e00-\u9fa5]/;
                var errorMessage=error.data.replace(/\d+/g,'');
                errorMessage=errorMessage.replace(/[a-zA-Z]/g,'');
                errorMessage=errorMessage.replace('[','');
                errorMessage=errorMessage.replace(']','');
                errorMessage=errorMessage.replace('，','');
                errorMessage=errorMessage.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"");
                if(re.test(errorMessage)){
                   return defualt
                }else {
                    return errorMessage;

                }
            },

			/**
			 *
             * @param status 是否隐藏
             * @param type 添加类型 part局部添加 all整个添加
             */
            addLoading: function(status, type) {

            },

            /**
             *
             * @param obj 要处理的对象。全是属性
             */
            delEmptyProperty: function(obj) {
                for (var property in obj) {
                    if (!obj[property] || obj[property] == '') {
                        delete obj[property];
                    }
                }
            }
        }
    });
