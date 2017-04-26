'use strict';

angular.module('dleduWebApp')
    .controller('SemesterHandlerCtrl', function ($scope, $state, AuthService, StudentService, messageService, CommonService, SchoolYearService,$timeout) {
        $scope.semesterHandlerFn = {
            params:{

                id:"",
                no:"",
                orgId: AuthService.getUser().orgId,
                userId: AuthService.getUser().id,
                startTime:"",
                endTime:""
            },
            semester:{
                name:"",
                startDate:"",
                endDate:""
            },
            coursePeriod:[
                {
                    id:0,
                    text:"第一节"
                },
                {
                    id:2,
                    text:"第二节"
                },
                {
                    id:3,
                    text:"第三节"
                },
                {
                    id:4,
                    text:"第四节"
                },
                {
                    id:5,
                    text:"第五节"
                },
                {
                    id:6,
                    text:"第六节"
                },
                {
                    id:7,
                    text:"第七节"
                },
                {
                    id:8,
                    text:"第八节"
                },
                {
                    id:9,
                    text:"第九节"
                },
                {
                    id:10,
                    text:"第十节"
                },
                {
                    id:11,
                    text:"第十一节"
                },
                {
                    id:12,
                    text:"第十二节"
                },
                {
                    id:13,
                    text:"第十三节"
                },
                {
                    id:14,
                    text:"第十四节"
                },
                {
                    id:15,
                    text:"第十五节"
                },
                {
                    id:16,
                    text:"第十六节"
                },
                {
                    id:17,
                    text:"第十七节"
                },
                {
                    id:18,
                    text:"第十八节"
                },
                {
                    id:19,
                    text:"第十九节"
                },
                {
                    id:20,
                    text:"第二十节"
                },
            ],
            complete:false,
            handle:"",
            prompt:"",

            submit: function () {
                var that = this;
                if (that.handle == "编辑课节") {
                    that.updatePeriod();
                } else {
                    that.addPeriod();
                }
            },

            addPeriod:function(){
                var that = this;
                var params = that.params;
                var time1=new Date("2017-04-25 "+that.params.startTime);
                var time2=new Date("2017-04-25 "+that.params.endTime);
                    if(params.no==-1){
                        messageService.openMsg("您还没有选择课程节");
                        return;
                    }else if(!that.params.startTime||!that.params.endTime){
                        messageService.openMsg("课节开始时间和结束时间不能为空！");
                        return;
                    }else if(time1.getTime()>time2.getTime()){
                        messageService.openMsg("您选择课程节开始时间有误！");
                        return;
                    }


                SchoolYearService.addPeriod(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {
                            messageService.openMsg("添加失败!请检查你的输入");

                        }
                    })
            },
            updatePeriod:function(){
                var that = this;
                var params = that.params;
                if(params.no==-1){
                    messageService.openMsg("您还没有选择课程节");
                    return;
                }


                SchoolYearService.updatePeriod(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("添加失败!请检查你的输入");
                        }else {
                            messageService.openMsg(error.data);

                        }
                    })
            },
            getPeriodById:function (params) {
                var _this=this;
                SchoolYearService.getPeriodById(params).$promise
                    .then(function (data) {
                        _this.params.id=data.id;
                        _this.params.no=data.no;
                        _this.params.startTime=data.startTime;
                        _this.params.endTime=data.endTime;
                    })
                    .catch(function (error) {

                    })
            },
            init:function () {
                var that = this;

                that.params.id = $state.params.id;
                that.handle = $state.current.ncyBreadcrumbLabel;
                if (that.handle == "编辑课节") {
                    that.params.id = $state.params.id;
                    var params={
                        id:that.params.id
                    }
                    that.getPeriodById(params);
                }
                that.title = $state.current.data.title;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;
                console.log($state);


            }
        };
        $scope.semesterHandlerFn.init();

       $timeout(function(){
           $('.clockpicker').clockpicker();
       })




    });

