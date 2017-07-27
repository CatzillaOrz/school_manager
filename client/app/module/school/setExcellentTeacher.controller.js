'use strict';

angular.module('dleduWebApp')
    .controller('SetExcellentTeacherCtrl', function ($scope,$q, MajorService, AuthService, messageService, ImageService, UploadService,TeacherService, $timeout,CommonService,SchoolService) {
        $scope.excellentTeacherFn = {
            editorid: 'introduce',
            editor: {},
            editorConf: {
                autoHeight: false,
                autoHeightEnabled: false,
                autoFloatEnabled: false,
                initialFrameWidth: '100%',
                initialFrameHeight: '100%'
            },
            obj: {src: "", selection: [], thumbnail: true},
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
                          //  that.teacherDropList=data.data;
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
                var deferred = $q.defer();
                var _this = this;
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
                        var cutImage = null;
                         cutImage = ImageService.getCutImage(image, actionParams, 150, 150);
                        UploadService.blobUploadToQiNiu(cutImage)
                            .then(function (resp) {
                                //resp.data.url

                                _this.params.inUrl = resp.data.url;
                                deferred.resolve(resp);
                                // $event.currentTarget.disabled=true;

                            }, function (resp) {
                                console.log('Error status: ' + resp.status);
                                if (resp.status == '500' || resp.status == '404') {
                                    _this.loadingFlag = false;
                                };
                                deferred.reject(resp);
                            }, function (evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

                            })
                    })

                } else {
                    CommonService.msgDialog('您没有选择文件！！', 2);
                }
                return deferred.promise;
            },
            selectFile: function ($file) {
                var _this = this;
                _this.imgFile = $file;
               // _this.uploadImage();
            },
            setMajorToggle:function () {
                var _this=this;
                if(!_this.isSetExcellent){
                    _this.resetParams();
                    _this.obj.src="";
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
                        _this.page.totalElements=data.page.totalElements;
                        _this.page.totalPages=data.page.totalPages;
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
                // if(!params.inUrl){
                //     messageService.openMsg("您还没有上传介绍图片！");
                //     return;
                // }
                params.userId=AuthService.getUser().id;
                if(_this.params.id){
                    _this.uploadImage().then(function () {
                        _this.updateExcellentTeacher(params);
                    })

                }else {
                    _this.uploadImage().then(function () {
                        _this.addExcellentTeacher(params);
                    })
                }


            },
            editExcellentTeacher:function (entity) {
                var _this=this;
                _this.isSetExcellent=true;
                _this.params=entity;
                _this.obj.src=entity.inUrl;
                getBase64(entity.inUrl)
                    .then(function(base64){
                        _this.imgFile=convertBase64UrlToBlob(base64);
                    },function(err){
                        console.log(err);
                    });
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
        function convertBase64UrlToBlob(urlData){

            var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
            var mime = urlData.split(',')[0].match(/:(.*?);/)[1];
            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            return new Blob( [ab] , {type : mime,name:'temp.jpg'});
        }

        function getBase64(img){//传入图片路径，返回base64
            function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
                var canvas = document.createElement("canvas");
                canvas.width = width ? width : img.width;
                canvas.height = height ? height : img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img,0, 0, canvas.width, canvas.height);
                var dataURL = canvas.toDataURL();
                return dataURL;
            }
            var image = new Image();
            image.crossOrigin = '';
            image.src = img;
            var deferred=$.Deferred();
            if(img){
                image.onload =function (){
                    deferred.resolve(getBase64Image(image));//将base64传给done上传处理
                }
                return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
            }
        }
    }).config(function (ngJcropConfigProvider) {

    ngJcropConfigProvider.setPreviewStyle('upload', {
        // 'width': '120px',
        // 'height': '120px',
        'overflow': 'hidden',
        'margin-left': '80px'
    });

    ngJcropConfigProvider.setJcropConfig('block', {
        bgColor: 'black',
        bgOpacity: .4,
        aspectRatio: 1 / 1
        // maxWidth: 250,
        // maxHeight: 250
    });
})



var imgSrc = "https://img.alicdn.com/bao/uploaded/TB1qimQIpXXXXXbXFXXSutbFXXX.jpg";
//    var imgSrc = "img/1.jpg";