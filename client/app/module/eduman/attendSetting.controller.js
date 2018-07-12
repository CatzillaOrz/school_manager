/**
 * Created by Administrator on 2017/6/21.
 * 到课率设置
 */
angular.module('dleduWebApp')
    .controller('AttendSettingCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
                                            ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService,
                                            ngDialog, RoleAuthService) {

        //控制按钮权限
        $scope.isUseAuth = function(type){
            return RoleAuthService.isUseAuthority(type);
        };

        //设置到课率
        $scope.attendSettingFn = {
            settingList: [],
            params: {
                arithmetic: ""
            },
            getAttendacneSettingList: function () {
                var _this = this;
                EduManService.getAttendacneSettingList().$promise
                    .then(function (data) {
                        _this.settingList = _this.dataFormat(data.data);
                        _this.params.arithmetic = data.key;
                    })
                    .catch(function (error) {

                    })
            },
            ///api/web/v1/organ/attentionUpdate
            updateAttendacne: function () {
                var _this = this;
                EduManService.updateAttendacne(_this.params).$promise
                    .then(function (data) {
                        messageService.openMsg("到课率设置成功！");
                    })
                    .catch(function (error) {
                        messageService.openMsg("到课率设置失败！");
                    })
            },
            dataFormat: function (list) {
                var result = [];
                list = eval(list);
                angular.forEach(list, function (entity) {
                    _.mapKeys(entity, function (value, key) {
                        var obj = {
                            key: key,
                            value: value
                        }
                        result.push(obj);
                    });
                });
                return result;
            },
            //分页参数
            init: function () {
                this.getAttendacneSettingList();
            }
        };
        $scope.attendSettingFn.init();
    });