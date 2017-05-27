'use strict';

angular.module('dleduWebApp')
    .controller('SetBoutiqueCourseCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService,SchoolService,CourseService,$timeout) {
        $scope.boutiqueCourseFn = {
            isSetBoutique:false,
            courseDropList:[],
            imgFile:"",

            params:{
                courseId:"",
                inUrl:"",
                templateShow:"",
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
            boutiqueCourseList:[],
            currentEntity:{},
            findParams:{
                name:""
            },
            //课程下拉搜索
            select2CourseOptions:function(){
                var that=this;
                return {
                    ajax: {
                        url: "api/school/getBoutiqueCourseDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params={
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,

                            }
                            params.name=query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            that.courseDropList=data.data;
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
            setBoutiqueToggle:function () {
                var _this=this;
                if(!_this.isSetBoutique){
                    _this.resetParams();
                }
                _this.isSetBoutique=!_this.isSetBoutique;
            },
            getCourseDropListOrg:function () {
                var _this=this;
                var params={
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 10000,

                }
                CourseService.getCourseDropListOrg(params).$promise
                    .then(function (data) {
                        _this.courseDropList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //从开卷获取
            getBoutiqueCourseDropList:function () {
                var _this=this;
                var params={
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 10000,

                }
                SchoolService.getBoutiqueCourseDropList(params).$promise
                    .then(function (data) {
                        _this.courseDropList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            addBoutiqueCourse:function (params) {
                var _this=this;
                SchoolService.addBoutiqueCourse(params).$promise
                    .then(function (data) {
                        messageService.openMsg("添加成功");
                        _this.getBoutiqueCourseList();
                        _this.isSetBoutique=false;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("设置精品课程失败！");

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
            updateBoutiqueCourse:function (params) {
                var _this=this;
                SchoolService.updateBoutiqueCourse(params).$promise
                    .then(function (data) {
                        messageService.openMsg("修改成功");
                        _this.getBoutiqueCourseList();
                        _this.isSetBoutique=false;
                    })
                    .catch(function (error) {

                    })
            },
            getBoutiqueCourseList:function () {
                var _this=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                params.courseName=_this.findParams.name;
                SchoolService.getBoutiqueCourseList(params).$promise
                    .then(function (data) {
                        _this.page=data.page;
                        _this.boutiqueCourseList=data.data;
                    })
                    .catch(function (error) {

                    })
            },

            //根据名称查询
            findBoutiqueCourseByPage: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                params.courseName=_this.findParams.name;
                SchoolService.getBoutiqueCourseList(params).$promise
                    .then(function (data) {
                        _this.boutiqueCourseList = data.data;
                        _this.page=data.page;
                        _this.page.pageNumber+=_this.page.pageNumber;
                    })
                    .catch(function (error) {

                    })
            },
            submit:function () {
                var _this=this;
                var params=_this.params;
                if(!params.courseId){
                    messageService.openMsg("请选择课程！");
                    return;
                }
                params.userId=AuthService.getUser().id;
                if(_this.params.id){
                    _this.updateBoutiqueCourse(params);
                }else {
                    _this.addBoutiqueCourse(params);
                }


            },
            editBoutiqueCourse:function (entity) {
                var _this=this;
                _this.isSetBoutique=true;
                _this.params=entity;
               $timeout(function () {
                   var $ddd = $("#select2").select2();
                   $ddd.val(_this.params.courseId).trigger("change");
               })

            },
            //删除
            deleteBoutiqueCourse: function () {
                var _this =$scope.boutiqueCourseFn;
                var params = {
                    id: _this.currentEntity.id,
                    userId: AuthService.getUser().id,
                }
                SchoolService.deleteBoutiqueCourse(params).$promise
                    .then(function (data) {
                        messageService.openMsg("精品课程删除成功！");
                        _this.getBoutiqueCourseList();
                    })
                    .catch(function (error) {
                        messageService.openMsg("精品课程删除失败！");
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                this.currentEntity = entity;
                messageService.getMsg("您确定要删除此精品课程吗？", this.deleteBoutiqueCourse)
            },
            selected:function (list) {
               // var resultList=[];
                var _this=this;
               angular.forEach(list,function (data) {
                   if(data.id==_this.params.courseId){
                       data.selected="selected";
                   }
               })
            },
            init:function () {
                var _this=this;
                _this.getBoutiqueCourseList();
                //_this.getCourseDropListOrg();
                _this.getBoutiqueCourseDropList();
            }
        };
        $scope.boutiqueCourseFn.init();
    })
