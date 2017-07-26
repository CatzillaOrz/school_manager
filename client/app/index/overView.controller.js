'use strict';

angular.module('dleduWebApp')
    .controller('overViewCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,CommonService,$sce) {
        $scope.overViewFn={
            schoolInfo:{},
            introduction:null,
            params:{
                orgId: ""
            },
            getSchoolInfo:function () {
                var _this=this;
                var params = _this.params;

                SchoolService.getSchoolInfo(params).$promise
                    .then(function (data) {
                        _this.introduction=$sce.trustAsHtml(data.data.introduction);
                    })
                    .catch(function (error) {

                    })
            },




            init:function () {
                var _this=this;
                _this.schoolInfo=  CommonService.getSchool();
                _this.params.orgId=_this.schoolInfo.id;
                _this.getSchoolInfo();
            }
        };
        $timeout(function () {

            $scope.overViewFn.init();
        })

    });