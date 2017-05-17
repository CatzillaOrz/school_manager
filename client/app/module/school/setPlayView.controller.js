'use strict';

angular.module('dleduWebApp')
    .controller('SetPlayViewCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService,SchoolService) {
        $scope.bannerFn = {
            imgFile: null,
            isSetBanner: false,
            isSetIntroduce:false,
            currentObjIndex: {},
            params:{
                orgId: AuthService.getUser().orgId,
                userId:AuthService.getUser().id,
            },
            schoolIntroduce:"",//'西安工业大学简称”西安工大“，是中国西北地区唯一一所以兵工为特色，以工为主，理、文、经、管、法协调发展的教学研究型大学[1] ，原中华人民共和国兵器工业部直属的七所本科院校之一（“兵工七子”），是“十二五”期间陕西省重点建设的高水平教学研究型大学、陕西省人民政府与中国兵器工业集团[2] 、国家国防科技工业局共建高校[3] 、教育部“卓越工程师教育培养计划”试点高校、陕西省大学生创新能力培养综合改革试点学校。 学校创建于1955年，前身为西安第二工业学校，是国家“一五计划”156个重点建设项目的军工配套项目，具有鲜明的军工特色。1960年升格为西安仪器工业专科学校；1965年升格为西安工业学院，成为国家部署在西北地区唯一的一所兵工本科院校；2006年经教育部批准更名为西安工业大学。学校具有博士学位授予权。2011年被列为陕西省重点建设的高水平教学研究型大学。2012年陕西省人民政府、中国兵器工业集团共建西安工业大学，同年经陕西省武器装备科研生产单位保密资格审查认证委员会批准成为国家二级保密资格单位，正式成为一所以"军民结合，寓军于民"的国防科研高校。',
            bannerList: [],
            uploadImage: function ($event) {
                $event.target.disabled = true;
                //  $event.currentTarget.disabled=false;
                var _this = this;

                _this.loadingFlag = true;
                if (_this.imgFile) {
                        UploadService.blobUploadToQiNiu(_this.imgFile)
                            .then(function (resp) {
                                //resp.data.url
                                if(_.isNumber(_this.currentObjIndex)){
                                    var params=this.bannerList[_this.currentObjIndex];
                                    params.orgId=_this.params.orgId;
                                    params.imageUrl=resp.data.url;
                                    _this.updateShuffImage(params);
                                }else {
                                    var params=_this.params;
                                    params.imageUrl=resp.data.url;
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
                // _this.obj.src=_this.bannerList[_this.currentObjIndex].logo;
                _this.isSetBanner = !_this.isSetBanner;
            },
            addShuffImage:function (params) {
                SchoolService.addShuffImage(params).$promise
                    .then(function (data) {

                    })
                    .catch(function (error) {

                    })
            },
            getShuffImageList:function () {
                var _this=this;
                var params=_this.params;
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
                SchoolService.deleteShuffImage(params).$promise
                    .then(function (data) {

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
            },
            addSchoolInfo:function (params) {
                SchoolService.addSchoolInfo(params).$promise
                    .then(function (data) {

                    })
                    .catch(function (error) {

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
