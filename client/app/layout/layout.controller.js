/**
 * Created by Secmax on 16/6/7.
 */
'use strict';

angular.module('dleduWebApp')
    .controller('LayoutCtrl', function ($scope,CommonService,$rootScope,AuthService) {
        $scope.subnav = CommonService.subnav;
        $scope.product = CommonService.product;
        $rootScope.user = AuthService.getUser();
        $scope.headerFn = {
            user: $rootScope.user,
            subnavArrow: '',
            signOut: function () {
                AuthService.signOut();
            },
            signIn: function () {
                var _pathName = '';
                if (!!$scope.redirectUrl && $scope.redirectUrl.indexOf("http://") >= 0) {
                    _pathName = '/login?redirectUrl=' + $scope.redirectUrl;
                } else if (!!$scope.redirectUrl && $scope.redirectUrl.indexOf("http://") == -1) {
                    _pathName = '/login?redirectUrl=' + $window.location.protocol + '//' + $window.location.host + $scope.redirectUrl;
                } else {
                    _pathName = '/login';
                }
                AuthService.navigation(0, _pathName);
            },
            navigate: function (host, path) {
                AuthService.navigation(host, path);
            },
            mainNavigate: function (nav) {
                var that = this;
                if (that.user && that.user.role == 'ROLE_TEACHER') {
                    AuthService.navigation(nav.host, nav.tpath);
                } else if (that.user && that.user.role == 'ROLE_STUDENT') {
                    AuthService.navigation(nav.host, nav.spath);
                } else {
                    AuthService.navigation(nav.host);
                }
            },
            subNavigate: function (path) {
                $window.location.href = $window.location.protocol + '//' + $window.location.host + path;
            },
            menuRoute: function () {
                var that = this;
                if ($scope.subnav && that.user) {
                    angular.forEach($scope.subnav.navs, function (nav) {
                        if (that.user.role == 'ROLE_TEACHER') {
                            nav.menu = nav.tMenu || nav.menu;
                            nav.path = nav.tPath || nav.path;
                        } else if (that.user.role == 'ROLE_STUDENT') {
                            nav.menu = nav.sMenu || nav.menu;
                            nav.path = nav.sPath || nav.path;
                        } else {
                            nav.menu = nav.menu || '';
                            nav.path = nav.path || '/';
                        }
                    });
                }
            }
        };
    });
