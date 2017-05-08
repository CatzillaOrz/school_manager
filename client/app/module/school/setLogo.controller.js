'use strict';

angular.module('dleduWebApp')
    .controller('SetLogoCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService) {
        $scope.logoFn = {
            imgFile: null,
            isSetLogo: false,
            currentObjIndex: {},
            obj: {src: "", selection: [], thumbnail: true},
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
                $event.target.disabled = true;
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
                    ImageService.convertFileToImage(_this.imgFile, function (image) {
                        var cutImage = ImageService.getCutImage(image, actionParams, 150, 150);
                        UploadService.blobUploadToQiNiu(cutImage)
                            .then(function (resp) {
                                //resp.data.url
                                _this.logoList[_this.currentObjIndex].logo = resp.data.url;
                                _this.isSetLogo=false;
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
                    });
                    //

                } else {
                    CommonService.msgDialog('您没有选择文件！！', 2);
                    $event.target.disabled = false;
                }
            },
            selectFile: function ($file) {
                var _this = this;
                _this.imgFile = $file;
            },
            setToggle: function (entity) {
                var _this=this;
                _this.currentObjIndex = entity;
               // _this.obj.src=_this.logoList[_this.currentObjIndex].logo;
                _this.isSetLogo = !this.isSetLogo;
            }
        }
    })
    .config(function (ngJcropConfigProvider) {

        ngJcropConfigProvider.setPreviewStyle('upload', {
            'width': '120px',
            'height': '120px',
            'overflow': 'hidden',
            'margin-left': '80px'
        });

        ngJcropConfigProvider.setJcropConfig('upload', {
            bgColor: 'black',
            bgOpacity: .4,
            aspectRatio: 1
            // maxWidth: 250,
            // maxHeight: 250
        });
    });