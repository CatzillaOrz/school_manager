/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('AttendDetailCtrl', function ($scope,$state,EduManService,tempStorageService) {
        $scope.attendDetailFn={
            show:1,
            classStudentList:[],
            teachClassStudentList:[],
            selected:{},
            params:{
                classId:"",
                teachClassId:""
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            //通过教学班id查询学生考勤
            getStudentAttendByTeachClassId:function () {
                var _this = this;
                var params = {
                    classId: _this.params.teachClassId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                EduManService.getStudentAttendByTeachClassId(params).$promise
                    .then(function (data) {
                        _this.teachClassStudentList = data.data;
                        _this.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //通过行政班级查询学生考勤
            getStudentAttendByClassId:function () {
                var _this=this;
                var params = {
                    classId: _this.params.classId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                EduManService.getStudentAttendByClassId(params).$promise
                    .then(function (data) {
                        _this.classStudentList = data.data;
                        _this.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //教学班考勤详情记录导出
            teachClassAttendInfoExport:function () {
                var _this = this;
                var params = {
                    classId: _this.params.teachClassId

                };
                EduManService.teachClassAttendInfoExport(params).$promise
                    .then(function (data) {
                        location.href=data.message;
                    })
                    .catch(function (error) {

                    })
            },
            //行政班考勤详情记录导出
            classAttendInfoExport:function () {
                var _this = this;
                var params = {
                    classId: _this.params.classId
                };
                EduManService.classAttendInfoExport(params).$promise
                    .then(function (data) {
                        location.href=data.message;
                    })
                    .catch(function (error) {

                    })
            },
            //初始化
            init:function () {
                var _this=this;
                if($state.params.classes==2){
                    _this.show=2;
                    _this.params.classId=$state.params.id;
                    _this.selected=tempStorageService.getter();
                    _this.getStudentAttendByClassId();
                }else {
                    _this.params.teachClassId=$state.params.id;
                    _this.selected=tempStorageService.getter();
                    _this.getStudentAttendByTeachClassId();
                }
            },
        }
        $scope.attendDetailFn.init();
    });