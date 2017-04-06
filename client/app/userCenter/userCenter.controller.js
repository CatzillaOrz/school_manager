'use strict';

angular.module('dleduWebApp')
    .controller('UserCenterCtrl', function ($scope,$rootScope, AuthService) {
        $scope.ucFn = {
            user:null,
            calendar:{
                date:'',
                day:'',
                year:''
            },
            goLink:function(host,path){
                AuthService.navigation(host,path);
            },
            init:function(){
                var that =this;
                that.user = $rootScope.user = AuthService.getUser();
                var _date = new Date();
                that.calendar.date = _date.getDate();
                that.calendar.year = _date.getFullYear() + '年' + (_date.getMonth() + 1) + '月';
                if(_date.getDay() == 0){
                    that.calendar.day = '星期日'
                }else if(_date.getDay() == 1){
                    that.calendar.day = '星期一'
                }else if(_date.getDay() == 2){
                    that.calendar.day = '星期二'
                }else if(_date.getDay() == 3){
                    that.calendar.day = '星期三'
                }else if(_date.getDay() == 4){
                    that.calendar.day = '星期四'
                }else if(_date.getDay() == 5){
                    that.calendar.day = '星期五'
                }else if(_date.getDay() == 6){
                    that.calendar.day = '星期六'
                }else{
                    that.calendar.day = null;
                }
            }
        };
        $scope.ucFn.init();
        console.log($scope.ucFn.user);
    });
