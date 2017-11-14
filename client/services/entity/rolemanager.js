/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
	.factory('RoleManagerService', function ($http, $q, $resource) {

		return {
			getDistedRoleList: function (params) {
				var roleManger = $resource('api/rolemanger/getDistedRoleList');
				return roleManger.get(params);
			},
			distRole: function (params) {
				var roleManger = $resource('api/rolemanger/distRole');
				return roleManger.save(params);
			},
			cancleRole: function (params) {
				var roleManger = $resource('api/rolemanger/cancleRole');
				return roleManger.remove(params);
			},
		}

	});