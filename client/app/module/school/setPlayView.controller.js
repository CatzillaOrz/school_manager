'use strict';

angular.module('dleduWebApp')
    .controller('SetPlayViewCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService,SchoolService,$sce) {
        $scope.bannerFn = {
            editorid: 'introduce',
            editor: {},
            editorConf: {
                autoHeight: false,
                autoHeightEnabled: false,
                autoFloatEnabled: false,
                initialFrameWidth: '100%',
                initialFrameHeight: '500px'
            },
            imgFile: null,
            isSetBanner: false,
            isSetIntroduce:false,
            currentObjIndex: {},
            buttonView:"设置",
            obj: {src: "", selection: [], thumbnail: true},
            params:{
                orgId: AuthService.getUser().orgId,
                userId:AuthService.getUser().id,
                href:""
            },
            schoolIntroduce:"",//'西安工业大学简称”西安工大“，是中国西北地区唯一一所以兵工为特色，以工为主，理、文、经、管、法协调发展的教学研究型大学[1] ，原中华人民共和国兵器工业部直属的七所本科院校之一（“兵工七子”），是“十二五”期间陕西省重点建设的高水平教学研究型大学、陕西省人民政府与中国兵器工业集团[2] 、国家国防科技工业局共建高校[3] 、教育部“卓越工程师教育培养计划”试点高校、陕西省大学生创新能力培养综合改革试点学校。 学校创建于1955年，前身为西安第二工业学校，是国家“一五计划”156个重点建设项目的军工配套项目，具有鲜明的军工特色。1960年升格为西安仪器工业专科学校；1965年升格为西安工业学院，成为国家部署在西北地区唯一的一所兵工本科院校；2006年经教育部批准更名为西安工业大学。学校具有博士学位授予权。2011年被列为陕西省重点建设的高水平教学研究型大学。2012年陕西省人民政府、中国兵器工业集团共建西安工业大学，同年经陕西省武器装备科研生产单位保密资格审查认证委员会批准成为国家二级保密资格单位，正式成为一所以"军民结合，寓军于民"的国防科研高校。',
            bannerList: [],
            uploadImage: function () {
                var _this = this;
                var _cropParamsStr = [];
                var actionParams = {
                    "offsetX": _this.obj.selection[0],
                    "offsetY": _this.obj.selection[1],
                    "width": _this.obj.selection[4],
                    "height": _this.obj.selection[5]
                };
                _this.loadingFlag = true;
                if (_this.imgFile) {
                    ImageService.convertFileToImage(_this.imgFile, function (image) {
                        var cutImage=ImageService.getCutImage(image, actionParams, 1000, 400);
                        UploadService.blobUploadToQiNiu(cutImage)
                            .then(function (resp) {
                                //resp.data.url
                                if(_.isNumber(_this.currentObjIndex)){
                                    var params=_this.bannerList[_this.currentObjIndex];
                                    params.orgId=_this.params.orgId;
                                    params.href=_this.params.href;
                                    params.imageUrl=resp.data.url;
                                    _this.updateShuffImage(params);
                                }else {
                                    var params=_this.params;
                                    params.imageUrl=resp.data.url;
                                    params.href=_this.params.href;
                                    _this.addShuffImage(params);

                                }
                                _this.isSetBanner=false;
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
                    })

                } else {
                    CommonService.msgDialog('您没有选择文件！！', 2);

                }
            },
            trustAsHtml:function (str) {
                return $sce.trustAsHtml(str);
            },
            selectFile: function ($file) {
                var _this = this;
                _this.imgFile = $file;
            },
            setToggle: function (entity) {
                var _this=this;
                _this.obj.src=null;
                _this.imgFile=null;
               if(entity!=undefined){
                   _this.currentObjIndex = entity;
                   _this.params.href=_this.bannerList[entity].href;
               }
                // _this.obj.src=_this.bannerList[_this.currentObjIndex].logo;
                _this.isSetBanner = !_this.isSetBanner;
            },
            addShuffImage:function (params) {
                var _this=this;
                SchoolService.addShuffImage(params).$promise
                    .then(function (data) {
                        _this.getShuffImageList();
                    })
                    .catch(function (error) {

                    })
            },
            getShuffImageList:function () {
                var _this=this;
                var params={
                        orgId: AuthService.getUser().orgId,
                        userId:AuthService.getUser().id,
                    }
                SchoolService.getShuffImageList(params).$promise
                    .then(function (data) {
                        _this.bannerList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            deleteShuffImage:function (params) {
                SchoolService.deleteShuffImage(params).$promise
                    .then(function (data) {

                    })
                    .catch(function (error) {

                    })
            },
            updateShuffImage:function (params) {
                var _this=this;
                SchoolService.deleteShuffImage(params).$promise
                    .then(function (data) {
                        _this.getShuffImageList();
                    })
                    .catch(function (error) {

                    })
            },
            removeBanner:function (index) {
                var _this=this;
                var params={
                    id:_this.bannerList[index].schoolShuffImageId
                }
                _this.deleteShuffImage(params)
                _this.bannerList.splice(index,1);

            },
            setIntroduceToggle: function (entity) {
                var _this=this;

                if(_this.isSetIntroduce){
                    var params=_this.params;
                    params.introduction=_this.schoolIntroduce;
                    _this.addSchoolInfo(params);
                }
                _this.isSetIntroduce = !_this.isSetIntroduce;
                if(_this.isSetIntroduce){
                    _this.buttonView="保存";
                }else {
                    _this.buttonView="设置";
                }
            },
            addSchoolInfo:function (params) {
                var _this=this;
                SchoolService.addSchoolInfo(params).$promise
                    .then(function (data) {
                        messageService.openMsg("设置学校简介成功！");
                        _this.getSchoolInfo();
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("设置学校简介失败！");

                        }else {
                            messageService.openMsg(error.data);

                        }
                    })
            },
            getSchoolInfo:function () {
                var _this=this;
                var params=_this.params;
                SchoolService.getSchoolInfo(params).$promise
                    .then(function (data) {
                        _this.schoolIntroduce=data.data.introduction;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("设置学校简介失败！");

                        }else {
                           // messageService.openMsg(error.data);

                        }
                    })
            },
            init:function () {
                var _this=this;
                _this.getShuffImageList();
                _this.getSchoolInfo();
            }
        };
        $scope.bannerFn.init();
    })
    .config(function (ngJcropConfigProvider) {

        ngJcropConfigProvider.setPreviewStyle('upload', {
            // 'width': '120px',
            // 'height': '120px',
            'overflow': 'hidden',
            'margin-left': '80px'
        });

        ngJcropConfigProvider.setJcropConfig('block', {
            bgColor: 'black',
            bgOpacity: .4,
            aspectRatio: 1/1
            // maxWidth: 250,
            // maxHeight: 250
        });
        ngJcropConfigProvider.setJcropConfig('longBlock', {
            bgColor: 'black',
            bgOpacity: .4,
            aspectRatio: 10/4
            // maxWidth: 250,
            // maxHeight: 250
        });
    });