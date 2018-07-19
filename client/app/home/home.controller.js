'use strict';

angular.module('dleduWebApp')
    .controller('HomeCtrl', function ($scope, $state) {
        $scope.homeFn={
            year:"",
            month:"",
            day:"",
            week:"",
            init:function () {
                var date=new Date();
                var weekday=new Array(7)
                weekday[0]="星期天"
                weekday[1]="星期一"
                weekday[2]="星期二"
                weekday[3]="星期三"
                weekday[4]="星期四"
                weekday[5]="星期五"
                weekday[6]="星期六"
                this.year=date.getFullYear();
                this.month=date.getMonth()+1;
                this.day=date.getDate();
                this.week=weekday[date.getDay()];
            }
        },
            $scope.homeFn.init();
    });