'use strict';

angular.module('dleduWebApp')
.controller('apprenticeshipCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,CommonService,$location) {
  $scope.doweleft = true;
  $('.doweLeft').liMarquee(
    {
      circular:true,
      runshort:true,
      direction:'left'
    }
  );
  $('.doweRight').liMarquee(
    {
      circular:true,
      runshort:true,
      direction:'right'
    }
  );
  $scope.leftFn=function(){
    $scope.doweleft = true;
  }
  $scope.rihgtFn=function(){
    $scope.doweleft = false;
  }
});