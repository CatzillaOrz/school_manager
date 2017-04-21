'use strict';

angular.module('dleduWebApp')
    .controller('PeriodListCtrl', function ($scope, AuthService,StudentService,messageService,CommonService,NgTableParams) {
        $scope.preiodFn={
            schoolYearList:[
                {
                    name:"2017年第一学期",
                    schoolTermList:[
                        {
                            name:"第一学期",
                            startTime:"2017-09-01",
                            endTime:"2017-09-01"

                        },
                        {
                            name:"第一学期",
                            startTime:"2017-09-01",
                            endTime:"2017-09-01"

                        }
                    ]
                },
                {
                    name:"2017年第一学期",
                    schoolTermList:[
                        {
                            name:"第一学期",
                            startTime:"2017-09-01",
                            endTime:"2017-09-01"

                        },
                        {
                            name:"第一学期",
                            startTime:"2017-09-01",
                            endTime:"2017-09-01"

                        }
                    ]
                }
            ]
        };

    })
