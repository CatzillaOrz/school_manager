'use strict';

angular.module('dleduWebService')
  .factory('UserAccountService', function ($http) {
    return {
        updateUser: function (params) {
            return $http.post("api/user/updateUser", params);
        },
        updatePassword: function (params) {
            return $http.put("api/user/updatePassword", params);
        },
        updatePasswordBindPhone: function (params) {
            return $http.put("api/user/updatePasswordBindPhone", params);
        },
        sendPhoneCode:function(){
            return $http.put("api/user/sendPhoneCode");
        },
        sendBindPhoneCode:function(params){
            return $http.put("api/user/sendBindPhoneCode", params);
        },
        sendUnBindPhoneCode:function(){
            return $http.put("api/user/sendUnBindPhoneCode");
        },
        bindPhone:function(params){
            return $http.put("api/user/bindPhone", params);
        },
        unBindPhone:function(params){
            return $http.put("api/user/unBindPhone", params);
        },
        sendBindMailCode:function(params){
            return $http.put("api/user/sendBindMailCode", params);
        },
        sendUnBindMailCode:function(){
            return $http.put("api/user/sendUnBindMailCode");
        },
        bindMail:function(params){
            return $http.put("api/user/bindMail", params);
        },
        unBindMail:function(params){
            return $http.put("api/user/unBindMail", params);
        },
        vildCode:function(params){
            return $http({
                method: 'get',
                url: "api/user/vildCode",
                params: params
            });
        },
        changePhone:function(params){
            return $http.put("api/user/changePhone", params);
        }
    }
  });
