/**
 * Created by Secmax on 2017/3/5.
 */
'use strict';
angular.module('dleduWebApp')
    .directive('ucTeam', ['$window', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app/userCenter/pt/team.html',
            controller: function ($scope, AuthService, PtService) {
                $scope.teamFn = {
                    userType: 0,
                    user: null,
                    teams: [],
                    /*teams:[
                     {
                     teamLogo:'assets/images/temp/20111219141953420.jpg',
                     teamName:'XenicsStormXenicsStormXenicsStormXenics StormXenics StormXenics Storm',
                     description:'什么是团队呢?团队就是不要让团队的任何一个人失败。不要让团队的任何一个人失败。不要让团队的任何一个人失败。不要让团队的任何一个人失败。',
                     homePage:'http://www.163.comwww.163.comwww.163.comwww.163.comwww.163.comwww.163.comwww.163.comwww.163.comwww.163.com',
                     teamId:''
                     },
                     {
                     teamLogo:'assets/images/temp/024f78f0f736afc316008bf7bb19ebc4b7451217.jpg',
                     teamName:'异度首创',
                     description:'当你仅有的一把工具是锤子，所有的东西看起来都像是钉子',
                     homePage:'http://www.163.com',
                     teamId:''
                     }
                     ],*/
                    goTeam: function (id) {
                        AuthService.navigation(2, '/team/list/teamDetails/teamId=' + id);
                    },
                    getTeams: function () {
                        var that = this;
                        var params = {
                            limit:3
                        };
                        PtService.getTeams(params)
                            .success(function (data) {
                                console.log(data);
                                that.teams = data;
                            })
                            .error(function (e) {

                            });
                    },
                    init: function () {
                        this.user = AuthService.getUser();
                        this.user.role == 'ROLE_TEACHER' ? this.userType = 1 : this.userType = 0;
                        this.getTeams();
                    }
                };
                $scope.teamFn.init();
            },
            link: function (scope, element, attr) {

            }
        }
    }]);