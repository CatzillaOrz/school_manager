'use strict';

angular.module('dleduWebApp')
    .controller('SetBoutiqueCourseCtrl', function ($scope, MajorService, AuthService, messageService, ImageService, UploadService, CommonService) {
        $scope.boutiqueCourseFn = {
            isSetBoutique:false,
            setBoutiqueToggle:function () {
                var _this=this;
                _this.isSetBoutique=!_this.isSetBoutique;
            },

        }
    })
