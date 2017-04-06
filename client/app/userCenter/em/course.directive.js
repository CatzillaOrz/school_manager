/**
 * Created by Secmax on 2017/3/5.
 */
'use strict';
angular.module('dleduWebApp')
    .directive('ucCourse', ['$window', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app/userCenter/em/course.html',
            controller: function ($scope, AuthService,EmService) {
                $scope.courseFn = {
                    userType: 0,
                    user:null,
                    /*courses:[
                        {
                            img:'assets/images/temp/_0000_1.jpg',
                            title:'Android基础知识-传感器、无线传输与媒体硬件功能开发',
                            url:''
                        },
                        {
                            img:'assets/images/temp/_0001_2.jpg',
                            title:'Android',
                            url:''
                        },
                        {
                            img:'assets/images/temp/_0002_3.jpg',
                            title:'Android',
                            url:''
                        },
                        {
                            img:'assets/images/temp/_0003_4.jpg',
                            title:'Android',
                            url:''
                        },
                        {
                            img:'assets/images/temp/_0004_5.jpg',
                            title:'Android',
                            url:''
                        },
                        {
                            img:'assets/images/temp/_0005_6.jpg',
                            title:'Android',
                            url:''
                        }
                    ],*/
                    courses:[],
                    toCourse:function(id){
                        this.userType == 1 ? AuthService.navigation(1,'/teacherCourse/startTeaching/'+ id) : AuthService.navigation(1,'/teacherCourse/startTeaching/'+ id);
                    },
                    getCourse:function(){
                        var that = this;

                        var params={
                            pageSize:6
                        };
                        if(that.userType == 1){
                            params.teacherId=that.user.id;
                            EmService.getCourseT(params)
                                .success(function(data){
                                    console.log(data);
                                    that.courses = data.data;
                                })
                                .error(function(e){

                                });
                        }else{
                            params.isFinish = false;
                            EmService.getCourseS(params)
                                .success(function(data){
                                    console.log(data);
                                    that.courses = data.data;
                                })
                                .error(function(e){

                                });
                        }
                    },
                    init : function () {
                        this.user = AuthService.getUser();
                        this.user.role == 'ROLE_TEACHER' ? this.userType = 1 : this.userType = 0;
                        this.getCourse();
                    }
                };
                $scope.courseFn.init();
            },
            link: function (scope, element, attr) {

            }
        }
    }]);