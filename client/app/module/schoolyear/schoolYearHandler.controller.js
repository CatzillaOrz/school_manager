'use strict';

angular.module('dleduWebApp')
    .controller('PeriodHandlerCtrl', function ($scope, $state, AuthService, StudentService, messageService, CommonService, SchoolYearService) {
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
            semesterList:[],
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
                if (that.handle == "编辑学期") {
                    that.updateSchoolYear();
                } else {
                    that.addSchoolYear();
                }
            },

            addSchoolYear:function(){
                var that = this;
                var params = that.params;
               if(!that.semesterList[0].name){
                   messageService.openMsg("学期名称必须填写");
                   return;
                   //&& that.semester.startDate&&that.semester.endDate
               }else if(!that.semesterList[0].startDate||!that.semesterList[0].endDate){
                   messageService.openMsg("学期开始时间和结束时间必须填写");
                   return;
               }else if(that.semesterList[0].startDate&&that.semesterList[0].endDate){
                   var startDate=new Date(that.semesterList[0].startDate).getTime();
                   var endDate=new Date(that.semesterList[0].endDate).getTime();
                   if(startDate>=endDate){
                       messageService.openMsg("您填写的时间有误，结束日期小于开始日期");
                       return;
                   }
               }
                params.semesterList=that.semesterList;
                SchoolYearService.addSchoolYear(params).$promise
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
            updateSchoolYear:function(){
                var that = this;
                var params = that.params;
                // if(that.semester.name&& that.semester.startDate&&that.semester.endDate){
                params.semesterList=that.semesterList;
                //  }

                SchoolYearService.updateSchoolYear(params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("更新失败");
                        }
                    })
            },
            getSchoolYearById:function (params) {
                var _this=this;
                SchoolYearService.getSchoolYearById(params).$promise
                    .then(function (data) {
                        _this.params.name=data.name;
                        _this.semesterList=data.semesterList
                        _this.stringToDate(_this.semesterList);
                    })
                    .catch(function (error) {

                    })
            },
            stringToDate:function (list) {
                angular.forEach(list,function (data) {
                    data.startDate=new Date(data.startDate);
                    data.endDate=new Date(data.endDate);
                })
            },
            addOneSemester:function () {
                var _this=this;
                var semester=_.clone(_this.semester)
                _this.semesterList.push(semester)
            },
            removeOneSemester:function (index) {
                var _this=this;
                _this.semesterList.splice(index,1)
            },
            init:function () {
                var that = this;
                this.datePick.toggleMin();
                that.handle = $state.current.ncyBreadcrumbLabel;
                if (that.handle == "编辑学期") {
                    that.params.id = $state.params.id;
                    var params={
                        id:that.params.id
                    }
                    that.getSchoolYearById(params);
                }else {
                    var semester=_.clone(that.semester)
                    that.semesterList.push(semester)
                }
                that.title = $state.current.data.title;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;
                console.log($state);


            }
        };
        $scope.periodHandlerFn.init();




    });

