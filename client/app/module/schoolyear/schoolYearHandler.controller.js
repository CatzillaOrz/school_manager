'use strict';

angular.module('dleduWebApp')
    .controller('PeriodHandlerCtrl', function ($scope, $state, AuthService, StudentService, messageService, CommonService, SchoolYearService) {
        /**
         * 此控制层是创建和编辑共用
         * 主要是学期，学年操作
         * @type {{params: {id: string, name: string, orgId, userId, semesterList: Array}, semester: {name: string, startDate: string, endDate: string}, semesterList: Array, complete: boolean, handle: string, prompt: string, datePick: {inlineOptions: {minDate: Date, showWeeks: boolean}, dateOptions: {formatYear: string, maxDate: Date, minDate: Date, startingDay: number}, disabled: disabled, toggleMin: toggleMin}, submit: submit, addSchoolYear: addSchoolYear, updateSchoolYear: updateSchoolYear, getSchoolYearById: getSchoolYearById, stringToDate: stringToDate, addOneSemester: addOneSemester, removeOneSemester: removeOneSemester, init: init}}
         */
        $scope.periodHandlerFn = {
            //提交参数
            params:{

                id:"",
                name:"",
                orgId: AuthService.getUser().orgId,
                userId: AuthService.getUser().id,
                semesterList:[]
            },
            //学期参数
            semester:{
                name:"",
                startDate:"",
                endDate:"",
                code:""
            },
            //学期列表
            semesterList:[],
            //操作完成标识
            complete:false,
            //操作标识
            handle:"",
            //提示
            prompt:"",
            //时间组件配置
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
            //表单提交
            submit: function () {
                var that = this;

                if (that.handle == "编辑学期") {
                    that.updateSchoolYear();
                } else {
                    that.addSchoolYear();
                }
            },
            //增加
            addSchoolYear:function(){
                var that = this;
                var params = that.params;
                var isFlag=false;
                params.semesterList=_.filter(that.semesterList, function(entity) {
                    if(entity.name&&entity.startDate&&entity.endDate){
                        if(!entity.code){
                            isFlag=true;
                        }
                       return entity
                    }

                });
                if(isFlag){
                    messageService.openMsg("学期编码不能为空！");
                    return;
                }
                SchoolYearService.addSchoolYear(params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){

                            messageService.openMsg("添加失败");

                        }else {

                            messageService.openMsg(error.data);

                        }
                    })
            },
            //学年更新
            updateSchoolYear:function(){
                var that = this;
                var params = that.params;
                params.semesterList=_.filter(that.semesterList, function(entity) {
                    if(entity.name&&entity.startDate&&entity.endDate){
                        return entity
                    }
                });
                SchoolYearService.updateSchoolYear(params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"更新失败！"));
                    })
            },
            //通过id查询学年
            getSchoolYearById:function (params) {
                var _this=this;
                SchoolYearService.getSchoolYearById(params).$promise
                    .then(function (data) {
                        _this.params.name=data.name;
                        _this.semesterList=data.semesterList
                       // _this.stringToDate(_this.semesterList);
                    })
                    .catch(function (error) {

                    })
            },
            //字符串转换为日期对象
            stringToDate:function (list) {
                angular.forEach(list,function (data) {
                    data.startDate=new Date(data.startDate);
                    data.endDate=new Date(data.endDate);
                })
            },

            //增加学期
            addOneSemester:function () {
                var _this=this;
                var semester=_.clone(_this.semester)
                _this.semesterList.push(semester)
            },
            //移除学期
            removeOneSemester:function (index) {
                var _this=this;
                _this.semesterList.splice(index,1)
            },
            //初始化
            init:function () {
                var that = this;
                this.datePick.toggleMin();
                that.handle = $state.current.ncyBreadcrumb.label;
                if ($state.params.id) {
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

