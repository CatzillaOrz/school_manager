'use strict';

angular.module('dleduWebApp')
    .controller('SetHotMajorCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService) {
        $scope.hotMajorFn = {
            isSetMajor:false,
            setMajorToggle:function () {
              var _this=this;
              _this.isSetMajor=!_this.isSetMajor;
            },

        }
    })
