'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('indexnav', {
               // url   : '/',
                abstract: true,
                access: {requiredLogin: false},
                views : {
                    root: {
                        controller : 'IndexCtrl',
                        templateUrl: 'app/index/indexNav.html'
                    }
                },

            })
            .state('index1', {
                url   : '/index1',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'IndexCtrl',
                        templateUrl: 'app/index/indexnew.html'
                    }
                },

            })
            .state('boutique', {
                url   : '/boutique',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'BoutiqueCourseCtrl',
                        templateUrl: 'app/index/boutiqueCourse.html'
                    }
                },

            })
            .state('overview', {
                url   : '/overview',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'overViewCtrl',
                        templateUrl: 'app/index/overView.html'
                    }
                },

            })
            .state('hotmajordetail', {
                url   : '/hotmajordetail/:id',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'hotMajorDetailCtrl',
                        templateUrl: 'app/index/hotMajorDetail.html'
                    }
                },

            })
            .state('hotmajorlist', {
                url   : '/hotmajorlist',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'hotMajorListCtrl',
                        templateUrl: 'app/index/hotMajorList.html'
                    }
                },

            })
            .state('excellentteacherdetail', {
                url   : '/excellentteacherdetail/:id',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'excellentTeacherDetailCtrl',
                        templateUrl: 'app/index/excellentTeacherDetail.html'
                    }
                },

            })
            .state('excellentteacherlist', {
                url   : '/excellentteacherlist',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'excellentTeacherListCtrl',
                        templateUrl: 'app/index/excellentTeacherList.html'
                    }
                },

            })
            .state('noticelist', {
                url   : '/noticelist',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'noticeListCtrl',
                        templateUrl: 'app/index/noticeList.html'
                    }
                },

            })
            .state('noticedetail', {
                url   : '/noticedetail/:id',
                parent: 'indexnav',
                access: {requiredLogin: false},
                views : {
                    'content@indexnav': {
                        controller : 'noticeDetailCtrl',
                        templateUrl: 'app/index/noticeDetail.html'
                    }
                },

            })
            .state('apprenticeship', {
                url   : '/apprenticeship',
                access: {requiredLogin: false},
                views : {
                    root: {
                        controller : 'apprenticeshipCtrl',
                        templateUrl: 'app/index/apprenticeship.html'
                    }
                },
            })
    });
