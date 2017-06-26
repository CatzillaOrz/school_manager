/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('CourseScoreDetailCtrl', function ($scope) {
        $scope.cSDFn={
            show:1,
            //初始化
            showDetail:function () {
                var _this=this;
                _this.show=2;
            },
            init:function () {
                var _this=this;
            },
        }
        $scope.cSDFn.init();
    });