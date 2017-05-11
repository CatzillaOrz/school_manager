'use strict';

angular.module('dleduWebApp')
    .controller('SetExcellentTeacherCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService) {
        $scope.excellentTeacherFn = {
            isSetExcellent:false,
            setMajorToggle:function () {
                var _this=this;
                _this.isSetExcellent=!_this.isSetExcellent;
            },

        }
    })
