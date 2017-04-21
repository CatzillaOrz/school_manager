'use strict';

angular.module('dleduWebApp')
    .controller('PeriodHandlerCtrl', function ($scope, $state, AuthService, StudentService, messageService, CommonService, PeriodService) {
        $scope.periodHandlerFn = {
            params:{

                id:"",
                name:"",
                orgId: AuthService.getUser().orgId,
                userId: AuthService.getUser().id,
                semesterList:[]
            },
            semester:{
                name:"",
                startDate:"",
                endDate:""
            },
            complete:false,
            handle:"",
            prompt:"",
            datePick: {
                inlineOptions: {
                    //customClass: getDayClass,
                    minDate: new Date(),
                    showWeeks: true
                },
                dateOptions: {
                    //dateDisabled: $scope.periodHandlerFn.datePick.disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                },
                disabled: function (data) {
                    var date = data.date,
                        mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                },
                toggleMin: function () {
                    this.inlineOptions.minDate = this.inlineOptions.minDate ? null : new Date();
                    this.dateOptions.minDate = this.inlineOptions.minDate;
                },
                open1: function () {
                    this.popup1.opened = true;
                },
                open2: function () {
                    this.popup2.opened = true;
                },
                popup1: {
                    opened: false
                },

                popup2: {
                    opened: false
                },
            },
            submit: function () {
                var that = this;
                // if(!that.collegeId){
                //     messageService.openMsg("必须选择学院");
                //     return;
                // }else if(!that.majorId){
                //     messageService.openMsg("必须选择专业");
                //     return;
                // }
                if (that.handle == "编辑班级信息") {
                    that.updateClass();
                } else {
                    that.addPeriod();
                }
            },

            addPeriod:function(){
                var that = this;
                var params = that.params;
                if(that.semester.name&& that.semester.startDate&&that.semester.endDate){
                    params.semesterList.push(that.semester);
                }

                PeriodService.addPeriod(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("添加失败");
                        }
                    })
            },
            init:function () {
                var that = this;
                this.datePick.toggleMin();
                that.params.id = $state.params.id;
                that.handle = $state.current.ncyBreadcrumbLabel;
                if (that.handle == "编辑班级信息") {
                    that.params.id = $state.params.id;
                }
                that.title = $state.current.data.title;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;
                console.log($state);


            }
        };
        $scope.periodHandlerFn.init();




    });

