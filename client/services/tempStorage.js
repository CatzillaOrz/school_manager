/**
 * Created by Administrator on 2017/4/10.
 */
'use strict';
/**
 * 此服务用于暂存数据，
 */
angular.module('dleduWebService')
    .factory('tempStorageService', function ($window) {
        return {
            data:{},
            setter:function (data) {
                this.data=data;
            },
            getter:function () {
                return this.data;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);//将对象以字符串保存
            },        //读取对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');//获取字符串并解析成对象
            },
            removeObject: function(key){
                $window.localStorage.removeItem(key);
            }
        }
    });