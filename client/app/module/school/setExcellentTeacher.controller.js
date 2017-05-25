'use strict';

angular.module('dleduWebApp')
    .controller('SetExcellentTeacherCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService,TeacherService, $timeout,CommonService,SchoolService) {
        $scope.excellentTeacherFn = {
            isSetExcellent:false,
            teacherDropList:[],
            imgFile:"",
            params:{
                teacherId:"",
                inUrl:"",
                templateShow:"1",
                introduction:"",
                orgId: AuthService.getUser().orgId,
                userId:AuthService.getUser().id,
            },
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            excellentTeacherList:[],
            currentEntity:{},
            findParams:{
                name:""
            },
            //课程下拉搜索
            select2TeacherOptions:function(){
                var that=this;
                return {
                    ajax: {
                        url: "api/teacher/getTeacherDropListOrg",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params={
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 10000,

                            }
                            params.name=query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            that.teacherDropList=data.data;
                            return {
                                results: data.data,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: true
                    },
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                        }

                        return data.name;
                    }}
            },
            uploadImage: function () {
                //  $event.currentTarget.disabled=false;
                var _this = this;

                _this.loadingFlag = true;
                if (_this.imgFile) {
                    UploadService.blobUploadToQiNiu(_this.imgFile)
                        .then(function (resp) {
                            //resp.data.url

                            _this.params.inUrl=resp.data.url;

                            // $event.currentTarget.disabled=true;

                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                            if (resp.status == '500' || resp.status == '404') {
                                _this.loadingFlag = false;
                            }
                        }, function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                        })
                    //

                } else {
                    CommonService.msgDialog('您没有选择文件！！', 2);
                }
            },
            selectFile: function ($file) {
                var _this = this;
                _this.imgFile = $file;
                _this.uploadImage();
            },
            setMajorToggle:function () {
                var _this=this;
                if(!_this.isSetExcellent){
                    _this.resetParams();
                }
                _this.isSetExcellent=!_this.isSetExcellent;
            },
            getTeacherDropListOrg:function () {
                var _this=this;
                var params={
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 10000,

                }
                TeacherService.getTeacherDropListOrg(params).$promise
                    .then(function (data) {
                        _this.teacherDropList=data.data;
                    })
                    .catch(function (error) {

                    })

            },
            addExcellentTeacher:function (params) {
                var _this=this;
                SchoolService.addExcellentTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("添加成功");
                        _this.getExcellentTeacherList();
                        _this.isSetExcellent=false;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("设置优秀老师失败！");

                        }else {
                            messageService.openMsg(error.data);

                        }
                    })
            },
            resetParams:function () {
                this.params={
                    teacherId:"",
                    inUrl:"",
                    templateShow:"",
                    introduction:"",
                    orgId: AuthService.getUser().orgId,
                    userId:AuthService.getUser().id,
                };
            },
            updateExcellentTeacher:function (params) {
                var _this=this;
                SchoolService.updateExcellentTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("修改成功");
                        _this.getExcellentTeacherList();
                        _this.isSetExcellent=false;
                    })
                    .catch(function (error) {

                    })
            },
            getExcellentTeacherList:function () {
                var _this=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                params.teacherName=_this.findParams.name;
                SchoolService.getExcellentTeacherList(params).$promise
                    .then(function (data) {
                        _this.page=data.page;
                        _this.excellentTeacherList=data.data;
                    })
                    .catch(function (error) {

                    })
            },

            //根据名称查询
            findExcellentTeacherByPage: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                params.teacherName=_this.findParams.name;
                SchoolService.getExcellentTeacherList(params).$promise
                    .then(function (data) {
                        _this.excellentTeacherList = data.data;
                        _this.page=data.page;
                        _this.page.pageNumber+=_this.page.pageNumber;
                    })
                    .catch(function (error) {

                    })
            },
            submit:function () {
                var _this=this;
                var params=_this.params;
                if(!params.teacherId){
                    messageService.openMsg("请选择教师");
                    return;
                }
                if(!params.inUrl){
                    messageService.openMsg("您还没有上传介绍图片！");
                    return;
                }
                params.userId=AuthService.getUser().id;
                if(_this.params.id){
                    _this.updateExcellentTeacher(params);
                }else {
                    _this.addExcellentTeacher(params);
                }


            },
            editExcellentTeacher:function (entity) {
                var _this=this;
                _this.isSetExcellent=true;
                _this.params=entity;
                $timeout(function () {
                    var $ddd = $("#select2").select2();
                    $ddd.val(_this.params.teacherId).trigger("change");
                })
            },
            //删除
            deleteExcellentTeacher: function () {
                var _this =$scope.excellentTeacherFn;
                var params = {
                    id: _this.currentEntity.id,
                    userId: AuthService.getUser().id,
                }
                SchoolService.deleteExcellentTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("优秀老师删除成功！");
                        _this.getExcellentTeacherList();
                    })
                    .catch(function (error) {
                        messageService.openMsg("优秀老师删除失败！");
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                this.currentEntity = entity;
                messageService.getMsg("您确定要删除此优秀老师吗？", this.deleteExcellentTeacher)
            },
            init:function () {
                var _this=this;
                _this.getExcellentTeacherList();
                _this.getTeacherDropListOrg();
            }
        };
        $scope.excellentTeacherFn.init();
    })
