/**
 * Created by Secmax on 2017/3/5.
 */
'use strict';
angular.module('dleduWebApp')
    .directive('ucRollCall', ['$window', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app/userCenter/dd/rollCall.html',
            controller: function ($scope, AuthService, DdService) {
                $scope.ddFn = {
                    userType: 0
                };
                $scope.star = {
                    fullstar: [],
                    halfstar: [],
                    emptystar: []
                };
                $scope.recordDD={
                    late:0,
                    truancy:0,
                    askforlevae:0,
                    leave:0,
                    normal:0,
                    waitAssess:0,
                    assessAvage:0
                };

                /**
                 * 跳转到点点考勤
                 */
                $scope.directDD = function(type){
                    if(type == 'eva'){//评教
                        if($scope.ddFn.userType){//教师
                            AuthService.navigation(4, '/content/teachereva');
                        }else{
                            AuthService.navigation(4, '/content/studenteva');
                        }
                    }else{//考勤
                        if($scope.ddFn.userType){//教师
                            AuthService.navigation(4, '/content/teachercall');
                        }else{
                            AuthService.navigation(4, '/content/studentcall');
                        }
                    }
                }
                var init = function () {
                    var _user = AuthService.getUser();
                    _user.role == 'ROLE_TEACHER' ? $scope.ddFn.userType = 1 : $scope.ddFn.userType = 0;
                    if($scope.ddFn.userType){
                        DdService.getAttendanceTea({})
                            .success(function(data){
                                $scope.recordDD = data;
                            })
                            .error(function(e){

                            });
                    }else{
                        DdService.getAttendanceStu({})
                            .success(function(data){
                                $scope.recordDD = data;
                            })
                            .error(function(e){

                            });
                    }

                };


                init();
            },
            link: function (scope, element, attr) {

            }
        }
    }]);
