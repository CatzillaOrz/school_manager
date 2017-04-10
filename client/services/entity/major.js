/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('MajorService', function ($http, $q,$resource) {

        return {
            getMajorList: function () {
                var majorList = $resource('api/major/getMajorList');
                return majorList.get();
            },
        }

    });