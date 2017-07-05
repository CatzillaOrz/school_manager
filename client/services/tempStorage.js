/**
 * Created by Administrator on 2017/4/10.
 */
'use strict';
/**
 * 此服务用于暂存数据，
 */
angular.module('dleduWebService')
    .factory('tempStorageService', function () {
        return {
            data:{},
            setter:function (data) {
                this.data=data;
            },
            getter:function () {
                return this.data;
            }
        }
    });