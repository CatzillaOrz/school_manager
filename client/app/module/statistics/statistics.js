/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
            .state('teachingSummary', {
                parent: 'base',
                url   : '/teachingSummary',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/teachingSummary.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践教学汇总'
                }
            })
	});
