'use strict';

angular.module('dleduWebService')
  .factory('ForgetPasswordService', function ($http, localStorageService) {
    return {
      validAccount: function (params) {
        return $http({
          method: 'get',
          url: "api/account/forget/validAccount",
          params: params
        });
      },
      sendEmailValid: function(email){
        return $http.post("api/account/forget/sendEmailValid",{email:email});
      },
      checkEmailValidCode: function(code){
        return $http({
          method: 'get',
          url: "api/account/forget/checkEmailValidCode",
          params: {
            code: code
          }
        });
      },
      resetPwd: function(code, password){
        return $http.put("api/account/forget/resetPwd", {
          code: code,
          password: password
        });
      },
      getEmailGates: function(){
        return $http.get('assets/data/email_gate.json');
      },
      sendMessageCode: function(phoneNumber){
        return $http.post("api/account/forget/sendMessageCode", {phone:phoneNumber});
      },
      validPhoneCode: function(phoneNumber, code){
        return $http({
          method: 'get',
          url: "api/account/forget/validPhoneCode",
          params: {
            phone: phoneNumber,
            code: code
          }
        });
      },
      findAndSetPwd: function(params){
        return $http.post("api/account/forget/findAndSetPwd", params);
      }
    }
  });
