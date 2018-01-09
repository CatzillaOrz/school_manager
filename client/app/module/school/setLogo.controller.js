'use strict';

angular.module('dleduWebApp')
    .controller('SetLogoCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService,SchoolService) {
        $scope.logoFn = {
            imgFile: null,
            isSetLogo: false,
            logoUrl:"",
            currentObjIndex: {},
            obj: {src: "", selection: [], thumbnail: true},
            jcropType:"block",
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                userId:AuthService.getUser().id,
            },
            logoList: [
                {
                    logo: "http://7xpscc.com1.z0.glb.clouddn.com/2010082184033657.JPG"
                },
                {
                    logo:"http://7xpscc.com1.z0.glb.clouddn.com/2010082184033657.JPG"
                },
                {
                    logo:"http://7xpscc.com1.z0.glb.clouddn.com/2010082184033657.JPG"
                },
                {
                    logo:"http://7xpscc.com1.z0.glb.clouddn.com/2010082184033657.JPG"
                }
            ],
            uploadImage: function ($event) {

                //  $event.currentTarget.disabled=false;
                var _this = this;
                var _cropParamsStr = [];
                var actionParams = {
                    "offsetX": _this.obj.selection[0],
                    "offsetY": _this.obj.selection[1],
                    "width": _this.obj.selection[4],
                    "height": _this.obj.selection[5]
                };
                _this.loadingFlag = true;
                for (var key in actionParams) {
                    _cropParamsStr.push(key + '=' + actionParams[key]);
                }
                if (_this.imgFile) {
                    // ImageService.convertFileToImage(_this.imgFile, function (image) {
                    //     var cutImage=null;
                    //     if(_this.currentObjIndex==0|| _this.currentObjIndex==0){
                    //         cutImage = ImageService.getCutImage(image, actionParams, actionParams.width, actionParams.height);
                    //     }else {
                    //         cutImage = ImageService.getCutImage(image, actionParams, actionParams.width, actionParams.height);
                    //     }
                        UploadService.fileUploadToQiNiu(_this.imgFile)
                            .then(function (resp) {
                                //resp.data.url 80*400  150*150
                                _this.logoUrl=resp.data.url;
                                var params;
                                if(_this.logoList[_this.currentObjIndex]){
                                    //更新
                                    params=_this.logoList[_this.currentObjIndex];
                                    params.logoUrl=resp.data.url;
                                    params.userId=_this.params.userId;
                                    params.logoSort=_this.currentObjIndex+1;

                                }else {
                                    //增加
                                    params=_this.params;
                                    params.logoUrl=resp.data.url;
                                    params.logoSort=_this.currentObjIndex+1;
                                }
                                _this.addLogo(params)
                                // $event.currentTarget.disabled=true;

                            }, function (resp) {
                                CommonService.msgDialog('上传失败！！', 2);
                            }, function (evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                            })
                    // });
                    //

                } else {
                    CommonService.msgDialog('您没有选择文件！！', 2);
                }
            },
            addLogo:function (params) {
                var _this=this;
                SchoolService.addLogo(params).$promise
                    .then(function (data) {
                        messageService.openMsg("更新成功");
                        _this.getLogoList();
                        _this.isSetLogo=false;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("更新失败");
                        }
                    })
            },
            getLogoList:function () {
                var _this=this;
                var params={
                    orgId:_this.params.orgId
                };
                SchoolService.getLogoList(params).$promise
                    .then(function (data) {
                        _this.logoList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            selectFile: function ($file) {
                var _this = this;
                _this.imgFile = $file;
            },
            setToggle: function (entity) {
                var _this=this;
                _this.logoUrl="";
                _this.obj.src=null;
                _this.imgFile=null;
                if(entity==0){
                    _this.jcropType="block";
                }else {
                    _this.jcropType="long";
                }
                _this.currentObjIndex = entity;
                _this.isSetLogo = !this.isSetLogo;
            },
            init:function () {
                var _this=this;
                _this.getLogoList();
            }
        };
        $scope.logoFn.init();
    })
    .config(function (ngJcropConfigProvider) {
        ngJcropConfigProvider.setPreviewStyle('long',{
            'width': '392px',
            'height': '80px',
           // 'overflow': 'hidden',
            'margin-left': '50px'
        });
        ngJcropConfigProvider.setPreviewStyle('block',{
            'width': '50px',
            'height': '50px',
            'overflow': 'hidden',
            'margin-left': '50px'
        });
        // ngJcropConfigProvider.setPreviewStyle('upload', {
        //     // 'width': '120px',
        //     // 'height': '120px',
        //     'overflow': 'hidden',
        //     'margin-left': '80px'
        // });

        ngJcropConfigProvider.setJcropConfig('block', {
            bgColor: 'black',
            bgOpacity: .4,
            aspectRatio: 1 / 1,
            // maxWidth: 250,
            // maxHeight: 250
            trueSize: [50, 50]
        });
        ngJcropConfigProvider.setJcropConfig('long', {
            bgColor: 'black',
            bgOpacity: .4,
             aspectRatio:11 / 2.2,
            maxWidth: 420,
            maxHeight: 60,
            trueSize: [392, 80]
        });
    });