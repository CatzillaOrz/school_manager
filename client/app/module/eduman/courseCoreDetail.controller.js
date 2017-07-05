/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('CourseScoreDetailCtrl', function ($scope, $stateParams, AuthService, CourseService) {
        $scope.cSDFn={
            show:1,
            //课程信息
            course: null,
            //课程评教信息
            content: null,
            params: {
                id: $stateParams.id,
                averageScore: $stateParams.averageScore,
                teachingClassCode:$stateParams.teachingClassCode,
                courseName:$stateParams.courseName,
                teacherName: $stateParams.teacherName,
                pitch: ""
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
                params.id=that.params.id;
                CourseService.getCsdInfo(params).$promise
                    .then(function(data) {
                        that.course = data.pageData.data;
                        that.page = data.pageData.page;
                    })
                    .catch(function(error) {

                    })
            },

            //按条件查询课程信息
            findCsdByPage:function(){
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.id=that.params.id;
                CourseService.getCsdInfo(params).$promise
                    .then(function(data) {
                        that.course = data.pageData.data;
                        that.page.totalElements = data.pageData.page.totalElements;
                        that.page.totalPages = data.pageData.page.totalPages;
                    })
                    .catch(function(error) {

                    })
            },

            //获取课程评教信息
            getDetailInfo:function(){
                var that = this;
                that.show = 2;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.id=that.params.id;
                params.pitch = that.pitch;
                CourseService.getDetailInfo(params).$promise
                    .then(function(data) {
                        that.content = data.data;
                        that.page = data.page;
                    })
                    .catch(function(error) {

                    })
            },

            //按需求查询课程评教信息
            findDetailByPage:function(){
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.id=that.params.id;
                params.pitch = that.pitch;
                CourseService.getDetailInfo(params).$promise
                    .then(function(data) {
                        that.content = data.data;
                        that.page.totalElements = data.page.totalElements;
                        that.page.totalPages = data.page.totalPages;
                    })
                    .catch(function(error) {

                    })
            },

            init:function () {
                var that=this;
                that.getCsdInfo();
            },
        }
        $scope.cSDFn.init();
    });