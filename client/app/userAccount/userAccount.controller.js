'use strict';

angular.module('dleduWebApp')
    .controller('UserAccountCtrl', function ($scope, $rootScope,$state, AuthService, ngDialog) {
        $scope.uaFn = {
            user: null,
            goLink: function (host, path) {
                AuthService.navigation(host, path);
            },
            //根据路由激活当前菜单项
            activeMenu    : function (state) {
                return state == $state.current.active;
            },
            init: function () {
                var that = this;
                that.user = $rootScope.user ;
            },
            changeAvatar:function () {
                $state.go("userAvatar")
            }
        };
        $scope.uaFn.init();
        // console.log($scope.uaFn.getUserInfo());

        $rootScope.$watch('user', function () {
            $scope.uaFn.user = $rootScope.user;
        }, true);
    });
