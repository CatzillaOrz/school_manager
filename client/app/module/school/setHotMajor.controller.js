'use strict';

angular.module('dleduWebApp')
    .controller('SetHotMajorCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService,$timeout,SchoolService,CollegeService) {
        $scope.hotMajorFn = {
            editorid: 'introduce',
            editor: {},
            editorConf: {
                autoHeight: false,
                autoHeightEnabled: false,
                autoFloatEnabled: false,
                initialFrameWidth: '100%',
                initialFrameHeight: '100%'
            },
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
            currentMajor:{},
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            hotMajorList:[],
            params:{
                collegeId:"",
                specialtyId:"",
                inUrl:"",
                templateShow:1,
                introduction:"",
                orgId: AuthService.getUser().orgId,
                userId:AuthService.getUser().id,
            },
            findParams:{
                name:""
            },
            //学院下拉列表配置
            select2CollegeOptions:function(){
                var _this=this;
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
                                collegeId:_this.collegeId,

                            }
                            params.name=query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            // _this.collegeDropList=data.data;
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
                var _this=this;
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
                                collegeId:_this.collegeId,

                            }
                            params.name=query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            //_this.majorDropList=data.data;
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
                var _this=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: 100
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        _this.collegeDropList=data.data;
                    })
                    .catch(function (error) {
                    })
            },
            //专业下拉列表查询
            getMajorDropList:function () {
                var _this=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: 100
                }
                params.collegeId=_this.collegeId;
                MajorService.getMajorDropList(params).$promise
                    .then(function (data) {
                        _this.majorDropList=data.data;

                    })
                    .catch(function (error) {
                    })
            },
            setMajorToggle:function () {
                var _this=this;
                if(!_this.isSetMajor){
                    _this.resetParams();
                }
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
            addHotMajor:function (params) {
                var _this=this;
                SchoolService.addHotMajor(params).$promise
                    .then(function (data) {
                        messageService.openMsg("添加成功");
                        _this.getHotMajorList();
                        _this.isSetMajor=false;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("设置热门专业失败！");

                        }else {
                            messageService.openMsg(error.data);

                        }
                    })
            },
            resetParams:function () {
                this.params={
                    collegeId:"",
                    specialtyId:"",
                    inUrl:"",
                    templateShow:1,
                    introduction:"",
                    orgId: AuthService.getUser().orgId,
                    userId:AuthService.getUser().id,
                };
                this.collegeId="";
                this.majorId="";
            },
            updateHotMajor:function (params) {
                var _this=this;
                SchoolService.updateHotMajor(params).$promise
                    .then(function (data) {
                        messageService.openMsg("修改成功");
                        _this.getHotMajorList();
                        _this.isSetMajor=false;
                    })
                    .catch(function (error) {

                    })
            },
            getHotMajorList:function () {
                var _this=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 10
                };
                params.name=_this.findParams.name;
                SchoolService.getHotMajorList(params).$promise
                    .then(function (data) {
                        _this.page=data.page;
                        _this.hotMajorList=data.data;
                    })
                    .catch(function (error) {

                    })
            },

            //根据名称查询
            findHotMajorByPage: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                params.name=_this.findParams.name;
                SchoolService.getHotMajorList(params).$promise
                    .then(function (data) {
                        _this.hotMajorList = data.data;
                        _this.page.totalElements=data.page.totalElements;
                        _this.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {

                    })
            },
            submit:function () {
                var _this=this;
                var params=_this.params;
                params.collegeId=_this.collegeId;
                params.specialtyId=_this.majorId;
                params.userId=AuthService.getUser().id;
                if(!params.collegeId){
                    messageService.openMsg("请选择院系！");
                    return;
                }
                if(!params.specialtyId){
                    messageService.openMsg("请选择专业！");
                    return;
                }
                if(_this.params.id){
                    _this.updateHotMajor(params);
                }else {
                    _this.addHotMajor(params);
                }


            },
            editHotMajor:function (entity) {
                var _this=this;
                _this.isSetMajor=true;
                _this.params=entity;
                _this.collegeId=entity.collegeId;
                _this.majorId=entity.specialtyId;


                $timeout(function () {
                    var collegeSelect2 = $("#collegeSelect2").select2();
                    collegeSelect2.val(_this.collegeId).trigger("change");
                    var majorSelect2 = $("#majorSelect2").select2();
                    majorSelect2.val(_this.majorId).trigger("change");
                },500)
            },
            //删除
            deleteHotMajor: function () {
                var _this = $scope.hotMajorFn;
                var params = {
                    id: _this.currentMajor.id,
                    userId: AuthService.getUser().id,
                }
                SchoolService.deleteHotMajor(params).$promise
                    .then(function (data) {
                        messageService.openMsg("专业删除成功！");
                        _this.findHotMajorByPage();
                    })
                    .catch(function (error) {
                        messageService.openMsg("专业删除失败！");
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                this.currentMajor = entity;
                messageService.getMsg("您确定要删除此热门专业吗？", this.deleteHotMajor)
            },
            init:function () {
                var _this=this;
                _this.getCollegeDropList();
                _this.getHotMajorList();
            }
        };
        $timeout(function () {
            $scope.hotMajorFn.init();
            $scope.$watch('hotMajorFn.collegeId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.hotMajorFn.getMajorDropList();
                }
            });
            // $scope.$watch('hotMajorFn.majorId', function(newValue, oldValue) {
            //     if (newValue!=oldValue){
            //         $scope.hotMajorFn.getClassDropList();
            //     }
            // });
        })
    })