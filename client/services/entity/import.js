/**
 * Created by wangjun on 2016/11/23.
 * 导入基础信息和课表
 */
'use strict';

angular.module('dleduWebService')
    .factory('ImpService', function ($http, $q,$resource) {

        return {
            getNormalImpResult: function (params) {
                var result = $resource('api/batchimp/getNormalImpResult');
                return result.get(params);
            },
            getTimetableImpResult: function (params) {
                var result = $resource('api/batchimp/getTimetableImpResult');
                return result.get(params);
            }
        }

    });
