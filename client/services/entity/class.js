/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('ClassService', function ($http, $q,$resource) {

        return {
            getClassList: function () {
                var classList = $resource('api/class/getClassList');
                return classList.get();
            },
        }

    });