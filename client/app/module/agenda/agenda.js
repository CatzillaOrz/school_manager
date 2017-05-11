'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('agenda', {
                abstract: true,
                parent: 'base'
            })
            .state('agendaWeek', {
                parent: 'agenda',
                url   : '/agenda/view/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'AgendaCtrl',
                        templateUrl: 'app/module/agenda/agendaView.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '排课管理'
                }
            })
    });
