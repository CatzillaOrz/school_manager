/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('AttendDetailCtrl', function ($scope,$state) {
        $scope.attendFn={
            show:1,
            //初始化
            init:function () {
                var _this=this;

                if($state.params.classes==2){
                    _this.show=2;
                }
            },
        }
        $scope.attendFn.init();
    });