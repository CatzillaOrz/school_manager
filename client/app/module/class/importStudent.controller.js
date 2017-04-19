'use strict';

angular.module('dleduWebApp')
    .controller('ImportStudentCtrl', function ($scope,$state, ClassService,AuthService,messageService) {
        $scope.importStudentFn={
            classes:{},
            params:{
                id:0
            },
            classTeacherList:[],
            getClassById: function () {
                var that = this;
                var params = {
                    id: that.params.id
                }
                ClassService.getClassById(params).$promise
                    .then(function (data) {
                        that.classes=data;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            init:function () {
                var _this=this;
                _this.params.id = $state.params.id;
                _this.getClassById();
            }
        };
        $scope.importStudentFn.init();

    });
