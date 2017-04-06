'use strict';

angular.module('dleduWebApp')
    .controller('UserProfileCtrl', function ($scope, $rootScope, AuthService,$timeout, UserAccountService,CommonService,UploadService,ImageService) {
        $scope.upFn = {
            user: null,
            userType: 0,
            submit:false,
            copyUser:null,
            goLink: function (host, path) {
                AuthService.navigation(host, path);
            },
            imgFile: null,
            obj: {src: "", selection: [], thumbnail: true},
            uploadImage: function ($event) {
                $event.target.disabled =true;
              //  $event.currentTarget.disabled=false;
                var that = this;
                var _cropParamsStr = [];
                var actionParams = {
                    "offsetX": that.obj.selection[0],
                     "offsetY": that.obj.selection[1],
                     "width"  : that.obj.selection[4],
                     "height" : that.obj.selection[5]
                };
                that.loadingFlag = true;
                for (var key in actionParams) {
                    _cropParamsStr.push(key + '=' + actionParams[key]);
                }
                if (that.imgFile) {
                    ImageService.convertFileToImage(that.imgFile,function (image) {
                        var cutImage=ImageService.getCutImage(image,actionParams,150,150);
                        UploadService.blobUploadToQiNiu(cutImage)
                            .then(function (resp) {
                                that.copyUser.avatar=resp.data.url;
                                that.updateUser($event);

                              // $event.currentTarget.disabled=true;

                            }, function (resp) {
                                console.log('Error status: ' + resp.status);
                                if (resp.status == '500' || resp.status == '404') {
                                    that.loadingFlag = false;
                                }
                            }, function (evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                            })
                    });
                   //

                }else {
                    CommonService.msgDialog( '您没有选择文件！！',2);
                    $event.target.disabled =false;
                }
            },
            selectFile:function ($file) {
                var that=this;
                that.imgFile=$file;
            },
            updateUser    : function ($event) {
                var that = this;
                that.submit = true;
                var params ={
                    id:that.copyUser.id,
                    login:that.copyUser.login,
                    name :that.copyUser.name,
                    phoneNumber:that.copyUser.phone,
                    email:that.copyUser.mail,
                    avatar:that.copyUser.avatar
                };
                UserAccountService.updateUser(params)
                    .success(function (data) {
                        that.submit = false;
                        AuthService.refreshUser();
                        if(data.code=='4210001') {
                            CommonService.msgDialog(data.cause + '<br/> 信息修改失败！！',3);
                            $event.target.disabled =false;
                        }else{
                            CommonService.msgDialog('个人信息修改成功！！',1);
                            $event.target.disabled =false;
                        }
                    })
            },
            init: function () {
                var that = this;
                that.user = $rootScope.user = AuthService.getUser();
                console.log(that.user);
                that.user.role == 'ROLE_TEACHER' ? that.userType = 1 : that.userType = 0;
                that.copyUser = angular.copy($scope.user);
            }
        };
        $scope.upFn.init();

        $rootScope.$watch('user', function () {
            $scope.upFn.user = $rootScope.user;
        }, true);

    })
    // .config(function (ngJcropConfigProvider) {
    //
    //     ngJcropConfigProvider.setPreviewStyle('upload', {
    //         'width': '120px',
    //         'height': '120px',
    //         'overflow': 'hidden',
    //         'margin-left': '80px'
    //     });
    //
    //     ngJcropConfigProvider.setJcropConfig('upload', {
    //         bgColor: 'black',
    //         bgOpacity: .4,
    //         aspectRatio: 1,
    //         maxWidth: 250,
    //         maxHeight: 250
    //     });
    // });
