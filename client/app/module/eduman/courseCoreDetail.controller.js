/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('CourseScoreDetailCtrl', function ($scope, $stateParams, AuthService, CourseService) {
        $scope.gradeListFn={
            show:1,

            //课程信息
            course: null,

            //课程评教信息
            content: null,

            //查询参数
            params: {
                teachingClassId: $stateParams.teachingClassId,
                //semesterName: $stateParams.semesterName,
                averageScore: $stateParams.averageScore
                //teachingClassCode:$stateParams.teachingClassCode,
                //courseName:$stateParams.courseName,
                //teacherName: $stateParams.teacherName
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

            //获取课程评教信息
            getDetailInfo:function(scheduleId){
                var that = this;
                that.show = 2;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.scheduleId = scheduleId;
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
                that.getCsdInfo();
            },
        }
        $scope.gradeListFn.init();
    });