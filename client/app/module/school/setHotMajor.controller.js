'use strict';

angular.module('dleduWebApp')
    .controller('SetHotMajorCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService,$timeout,Select2LoadOptionsService) {
        $scope.hotMajorFn = {
            isSetMajor:false,
            imgFile: null,
            //学院id
            collegeId:0,
            //专业id
            majorId:0,
            //学院下拉列表
            collegeDropList:[],
            //专业下拉列表
            majorDropList:[],
            params:{
                image:"",
                templateId:1
            },
            //学院下拉列表配置
            select2CollegeOptions:function(){
                var that=this;
                return {
                ajax:{
                    url: "api/college/getCollegeDropList",
                    dataType: 'json',
                    //delay: 250,
                    data: function (query) {
                        var params={
                            orgId: AuthService.getUser().orgId,
                            pageNumber: 1,
                            pageSize: 100,
                            collegeId:that.collegeId,

                        }
                        params.name=query.term;
                        return params;
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;
                        that.collegeDropList=data.data;
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
                }
            }},
            //专业下拉列表配置
            select2MajorOptions:function(){
                var that=this;
                return {
                    ajax: {
                        url: "api/major/getMajorDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params={
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                collegeId:that.collegeId,

                            }
                            params.name=query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            that.majorDropList=data.data;
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
            //学院下拉列表查询
            getCollegeDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList=data.data;
                    })
                    .catch(function (error) {
                    })
            },
            //专业下拉列表查询
            getMajorDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                params.collegeId=that.collegeId;
                MajorService.getMajorDropList(params).$promise
                    .then(function (data) {
                        that.majorDropList=data.data;
                        if(!that.isInit&& $state.current.name=="studentEdit"){
                            that.getMajorById(that.majorId);
                        }

                    })
                    .catch(function (error) {
                    })
            },
            setMajorToggle:function () {
              var _this=this;
              _this.isSetMajor=!_this.isSetMajor;
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
        };
        $timeout(function () {
           // $scope.hotMajorFn.init();
            $scope.$watch('handleFn.collegeId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.hotMajorFn.getMajorDropList();
                }
            });
            $scope.$watch('hotMajorFn.majorId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.hotMajorFn.getClassDropList();
                }
            });
        })
    })
