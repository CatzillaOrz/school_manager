'use strict';

angular.module('dleduWebService')
  .factory('AccountService', function ($http) {
    return {
      signIn: function (username, password) {
        return $http.post("api/signin", {
          username: username,
          password: password
        });
      },
      signOut: function () {
        return $http.post("api/account/signout");
      },
      getUserInfo: function () {
        return $http.get("api/account");
      },
      validEmail :function(code) {
        if(( typeof code != "string") || !code) {
          code = "";
        }
        return $http(
        {
          method: 'PUT',
          url: 'api/account/validemail',
          params: {
            code: code
          }
        });
      },
      sendPhoneCode: function(phoneNumber){
        return $http.post('api/account/signup_send_phone_code', {
          phoneNumber: phoneNumber
        });
      },
      validPhoneCode: function(phoneNumber, code){
        return $http({
          method: 'GET',
          url: 'api/account/signup_valid_phone_code',
          params: {
            phoneNumber: phoneNumber,
            code: code
          }
        });
      }
    }
  });
