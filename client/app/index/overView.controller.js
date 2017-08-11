'use strict';

angular.module('dleduWebApp')
    .controller('overViewCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,CommonService,$sce) {
        $scope.overViewFn={
            schoolInfo:{},
            introduction:null,
            schoolLogo:'',
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

//logo
            getLogoList:function () {
                var _this=this;
                var params={
                    orgId:_this.params.orgId
                };
                SchoolService.getLogoList(params).$promise
                    .then(function (data) {
                        angular.forEach(data.data,function (temp) {
                            if(temp.logoSort==1){
                                _this.schoolLogo=temp;
                            }
                        })
                    })
                    .catch(function (error) {

                    })
            },


            init:function () {
                var _this=this;
                _this.schoolInfo=  CommonService.getSchool();
                console.log(_this.schoolInfo);
                _this.params.orgId=_this.schoolInfo.id;
                _this.getSchoolInfo();
                _this.getLogoList();
            }
        };
        var height = document.documentElement.clientHeight - 50 - 100;
        $(".content-container").css("min-height", height + "px")
        $timeout(function () {

            $scope.overViewFn.init();

        })

    });