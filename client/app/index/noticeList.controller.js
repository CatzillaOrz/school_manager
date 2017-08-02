'use strict';

angular.module('dleduWebApp')
    .controller('noticeListCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,CommonService,NoticeService) {
        $scope.noticeListFn={
            schoolInfo:{},
            params:{
               organId:"",
                pageNumber:1,
                pageSize: 10 ,
                published:1
            },
            noticeList:[],
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            //精品课程查询
            getNoticeList:function () {
                var _this=this;
                var params = _this.params;
                params.pageNumber= _this.page.pageNumber,
                params.pageSize= _this.page.pageSize

                NoticeService.getNoticeList(params).$promise
                    .then(function (data) {
                        _this.page.totalElements=data.totalCount;
                        _this.page.totalPages=data.pageCount;
                        _this.page.pageNumber=data.offset;
                        _this.noticeList=data.data;
                       // _this.page.pageNumber+=_this.page.pageNumber;
                    })
                    .catch(function (error) {

                    })
            },
            getHtmlFirstImg:function (html) {
                var matches = /src="(.*?)"/gi;
                var  results=null;
                results=matches.exec(html);
                if(results){
                    if(results.length>0){
                        return results[0].replace("src=","").replace(/\042/gi,"");
                    };
                }
                return "";

            },
            formatDate:function (date,format) {
                var arr=date.split("-");
                if(format=="yyyy-MM"){
                    return arr[0]+"-"+ arr[1];
                }else {
                    return arr[2];
                }
            },
            cutHtml:function (str,len) {
                return CommonService.strCut(str,len)
            },

            init:function () {
                var _this=this;
                _this.schoolInfo=  CommonService.getSchool();
                _this.params.organId=_this.schoolInfo.id;
                _this.getNoticeList();
            }
        };
        $timeout(function () {

            $scope.noticeListFn.init();
        })

    });