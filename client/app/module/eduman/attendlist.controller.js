/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('AttendListCtrl', function ($scope,$state) {
        $scope.attendFn={
            //初始化
            init:function () {
                var _this=this;
                _this.getSchoolYearList();
                _this.getPeriodList();
                if($state.params.position==2){
                    $("#myTab  a:last").tab("show");
                }


            },
		}

	});