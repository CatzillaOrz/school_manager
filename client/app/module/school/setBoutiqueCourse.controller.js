'use strict';

angular.module('dleduWebApp')
    .controller('SetBoutiqueCourseCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService) {
        $scope.boutiqueCourseFn = {
            isSetBoutique:false,
            courseDropList:[],
            imgFile:"",
            params:{
                courseId:"",
                templateId:1,
                image:""
            },
            //课程下拉搜索
            select2CourseOptions:function(){
                var that=this;
                return {
                    ajax: {
                        url: "api/course/getCourseDropListOrg",
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

                            _this.params.image=resp.data.url;

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
                _this.isSetBoutique=!_this.isSetBoutique;
            },

        }
    })
