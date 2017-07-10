/**
 * Created by Administrator on 2017/7/7.
 */
angular.module('dleduWebApp')
    .controller('CourseSingleDetailCtrl', function ($scope, $stateParams, AuthService, CourseService) {
        $scope.singleListFn={
         
            //课程评教信息
            content: null,

            //查询参数
            params: {
                scheduleId: $stateParams.scheduleId,
            },
            
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },

            //获取课程评教信息
            getDetailInfo:function(){
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.scheduleId = that.params.scheduleId;
                CourseService.getDetailInfo(params).$promise
                    .then(function(data) {
                        that.content = data.data;
                        that.page = data.page;
                    })
                    .catch(function(error) {

                    })
            },

            init:function () {
                var that=this;
                that.getDetailInfo();
            },
        }
        $scope.singleListFn.init();
    });