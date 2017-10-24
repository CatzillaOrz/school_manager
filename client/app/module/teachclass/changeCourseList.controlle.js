'use strict';

angular.module('dleduWebApp')
    .controller('ChangeCourseListctrl', function ($scope, $state, TeachClassService, AuthService, messageService, $timeout) {
        var today=new Date().Format("yyyy-MM-dd");
        $scope.changeCourseListFn={
            params:{
                orgId:AuthService.getUser().orgId,
                teacher:null,
                adjustType:null,
                startDate:null,
                endDate:null,

            },
            changeCourseList:[],
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            checkDateZone:function (startDate,endDate) {
                var star=new Date(startDate).getTime();
                var end=new Date(endDate).getTime();
                if(star<=end){
                    return true;
                }else{
                    return false;
                }

            },
            getTeacherChangeCourseList:function () {
                var _this=this;
                var params=_this.params;
                if(params.startDate&&params.endDate){
                    var flag=_this.checkDateZone(params.startDate,params.endDate)
                    if(!flag){
                        messageService.openMsg("开始时间小于结束时间！");
                        return ;
                    }
                }
                params.pageNumber=_this.page.pageNumber;
                params.pageSize=_this.page.pageSize;
                TeachClassService.getTeacherChangeCourseList(params).$promise
                    .then(function (data) {
                        _this.changeCourseList=data.data;
                        _this.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            init:function () {
                this.getTeacherChangeCourseList();
            }
        };
        $scope.changeCourseListFn.init();
    });