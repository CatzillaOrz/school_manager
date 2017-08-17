'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('news', {
                abstract: true,
                parent: 'base'
            })
            .state('newslist', {
                parent: 'news',
                url   : '/news/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'NewsListCtrl',
                        templateUrl: 'app/module/news/newsList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '通知列表'
                }
            })
            .state('newsedit', {
                parent: 'news',
                url   : '/newsedit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'NewsHandleCtrl',
                        templateUrl: 'app/module/news/newsHandle.html'
                    }
                },
                data:{
                    prompt:'编辑通知',
                },
                ncyBreadcrumb: {
                    label: '编辑通知'
                }
            })
            .state('newscreat', {
                parent: 'news',
                url   : '/newscreate',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'NewsHandleCtrl',
                        templateUrl: 'app/module/news/newsHandle.html'
                    }
                },
                data:{
                    prompt:'发布通知',
                },
                ncyBreadcrumb: {
                    label: '发布通知'
                }
            })
    });
