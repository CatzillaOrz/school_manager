/**
 * Created by Secmax on 2017/3/5.
 */
'use strict';
angular.module('dleduWebApp')
    .directive('ucEx', ['$window', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app/userCenter/em/ex.html',
            controller: function ($scope, AuthService,EmService) {
                $scope.exFn = {
                    userType: 0
                };

                var init = function () {
                    var _user = AuthService.getUser();
                    _user.role == 'ROLE_TEACHER' ? $scope.exFn.userType = 1 : $scope.exFn.userType = 0;
                }
            },
            link: function (scope, element, attr) {

            }
        }
    }]);