/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('CourseScoreDetailCtrl', function ($scope, $stateParams, AuthService, CourseService) {
        $scope.gradeListFn={

            //课程信息
            course: null,

            //查询参数
            params: {
                teachingClassId: $stateParams.teachingClassId,
                averageScore: $stateParams.averageScore
            },
            
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },

            //获取课程信息
            getCsdInfo:function(){
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.teachingClassId=that.params.teachingClassId;
                CourseService.getCsdInfo(params).$promise
                    .then(function(data) {
                        that.course = data.data;
                        that.page = data.page;
                    })
                    .catch(function(error) {

                    })
            },

            init:function () {
                var that=this;
                that.getCsdInfo();
            },
        }
        $scope.gradeListFn.init();
    });