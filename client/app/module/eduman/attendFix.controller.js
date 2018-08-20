/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('AttendFixCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
                                            ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService,
                                            ngDialog, RoleAuthService) {

        //控制按钮权限
        $scope.isUseAuth = function(type){
            return RoleAuthService.isUseAuthority(type);
        };


        $scope.batch = {
            /**
             * 对象数据添加check属性
             * @param records
             */
            addCheckProperty: function (records) {
                for (var i = 0, recordLen = records.length; i < recordLen; i++) {
                    var record = records[i];
                    record.check = false;
                }
            },

            //还原之前选中的记录，在选择分配列表中的显示出来
            showSelDistList: function (records, that, property) {
                var calcCount = 0;//统计包含的元素值和当前页面记录数是否一样
                for (var k = 0, lenRecord = records.length; k < lenRecord; k++) {
                    var record = records[k], selId = record[property];
                    //判断元素在之前元素里面是否已经存在，如果存在不添加
                    for (var j = 0, selLen = that.selDistObj.length; j < selLen; j++) {
                        var id = that.selDistObj[j][property];
                        if (selId == id) {
                            record.check = true;
                            calcCount++;
                            break;
                        }
                    }
                }

                if (calcCount == lenRecord && calcCount) {
                    that.checkAllRecord = true;
                }
            },

            /**
             * 根据对象属性获取值
             */
            getIdsByProperty: function(objs, property){
                var propertyValues = [];
                for (var k = 0, length = objs.length; k < length; k++) {
                    var temp = objs[k];
                    propertyValues.push(temp[property]);
                }
                return propertyValues;
            },

            //单击选择单个记录
            selSingleRecord: function (records, $index, that, property) {
                var selObj = records[$index];
                if (selObj.check) { //选中当前记录
                    var flag = false, index, selId =  selObj[property];
                    for (var j = 0; j < that.selDistObj.length; j++) {
                        var id = that.selDistObj[j][property];
                        if (selId == id) {
                            flag = true;
                            index = j;
                        }
                    }
                    if (!flag) {
                        that.selDistObj.push(selObj);
                    }
                } else {//反选当前记录
                    var flag = false, index, selId = selObj[property];
                    that.checkAllRecord = false;
                    for (var k = 0; k < that.selDistObj.length; k++) {
                        var id = that.selDistObj[k][property];
                        if (selId == id) {
                            that.selDistObj.splice(k, 1);
                            break;
                        }
                    }
                }
                //this.cloneSelDistObj = angular.copy(this.selDistObj);
                this.showSelDistList(records, that, property);
            },

            //点击选择当前页全选
            checkAll: function (pageAllRecords, that, property) {
                if (that.checkAllRecord) {
                    for (var k = 0, lenRecord = pageAllRecords.length; k < lenRecord; k++) {
                        var record = pageAllRecords[k];
                        var flag = false, selId = record[property];
                        //判断元素在之前元素里面是否已经存在，如果存在不添加
                        for (var j = 0, selLen = that.selDistObj.length; j < selLen; j++) {
                            var id = that.selDistObj[j][property];
                            if (selId == id) {
                                flag = true;
                            }
                        }
                        if (!flag) {
                            that.selDistObj.push(record);
                            record.check = true;
                        }
                    }

                } else {//点击反选时当前页所有元素都被删除
                    for (var k = 0, lenRecord = pageAllRecords.length; k < lenRecord; k++) {
                        var record = pageAllRecords[k];
                        var selId = record[property];
                        //判断元素在之前元素里面是否已经存在，如果存在则删除此元素
                        for (var j = 0; j < that.selDistObj.length; j++) {
                            var id = that.selDistObj[j][property];
                            if (selId == id) {
                                that.selDistObj.splice(j, 1);
                                record.check = false;
                                break;
                            }
                        }
                    }
                }
            },
        }

        //当天时间
        var today = new Date().Format("yyyy-MM-dd");
        $scope.attendFn = {
            //学年下拉数据列表
            schoolYearDropList: [],
            //学院下拉列表
            collegeDropList: [],
            //专业下拉列表
            majorDropList: [],
            //班级下拉列表
            classDropList: [],
            //班课考勤列表
            teachClassAttendList: [],
            //行政班考勤列表
            classAttendList: [],
            //维度标识
            tab: "time",

            classAdministrativeId: "",
            params: {
                majorId: null,
                collegeId: null,
                semesterId: null,
                classesId: null,
                courseName: null,
                teacherName: null,
                managerId: AuthService.getUser().id
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },

            switchOneTab: function (index) {
                var _this = this;
                if (index == 1) {
                    _this.switchTowTab("time");
                } else if (index == 2) {
                    _this.switchTowTab("college");
                } else if (index == 3) {
                    $scope.attendSettingFn.getAttendacneSettingList();
                } else if (index == 4) {
                    $scope.attendPauseFn.getAttendStopLogs();
                } else if (index == 5) {
                    $scope.attendFixFn.params.startTime = today;
                    $scope.attendFixFn.params.endTime = today;
                    $scope.attendFixFn.getAttendListByCondition();
                }

            },
            switchTowTab: function (entity) {

                if (entity == "teacher") {
                    $scope.attendTeacherFn.getTeachingclassAttendByTeacher();
                } else if (entity == "time") {
                    $scope.attendTimeFn.getAttendanceByPeriod();
                } else if (entity == "college") {
                    $scope.attendCollegeFn.getClassAttendanceGroupByCollege();
                } else if (entity == "major") {
                    $scope.attendMajorFn.getClassAttendanceGroupByPro();
                } else if (entity == "class") {
                    $scope.attendClassFn.getClassAttendanceGroupByclass();
                } else if (entity == "student") {

                }
                this.tab = entity;
            },
            checkDateZone:function (startDate,endDate) {
                var star=new Date(startDate).getTime();
                var end=new Date(endDate).getTime();
                if(star<=end){
                    return true;
                }else{
                    return false;
                }

            },
            select2SemesterOptions: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '按学期筛选'
                    },
                    allowClear: true,
                    ajax: {
                        url: "api/schoolyear/getSchoolYearDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,


                            }
                            params.name = query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            _this.schoolYearDropList = _this.select2GroupFormat(data.data);
                            console.log(_this.schoolYearDropList);
                            return {
                                results: _this.schoolYearDropList,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: false
                    },

                }
            },
            //select2动态关键字查询列表配置
            selectCollege2Options: function () {
                var _this = this;
                return {

                    ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList", {
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100,
                        managerId: AuthService.getUser().id
                    }, "name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.collegeDropList = [];
                            return '按班级筛选';
                        }
                        _this.collegeDropList.push(data);
                        return data.name;
                    },
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true
                }
            },
            //学期下拉列表分组数据格式化
            select2GroupFormat: function (dataList) {
                var result = []
                angular.forEach(dataList, function (data) {
                    var obj = {
                        text: data.name,
                        children: []
                    };
                    angular.forEach(data.semesterIdNameList, function (sememster) {
                        var objChild = {
                            id: sememster.id,
                            text: sememster.name
                        };
                        obj.children.push(objChild);
                    })
                    result.push(obj);
                })
                return result;
            },
            getCurrentSemester: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId
                };
                EduManService.getCurrentSemester(params).$promise
                    .then(function (data) {
                        var obj = {
                            text: data.yearName,
                            children: [
                                {
                                    id: data.id,
                                    text: data.name
                                }
                            ]
                        };
                        _this.params.semesterId = data.id;
                        _this.getTeachClassAttendList();
                        _this.schoolYearDropList = [obj];


                    })
                    .catch(function (error) {

                    })
            },
            //按班课查询考勤列表
            getTeachClassAttendList: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    courseName: _this.params.courseName,
                    teacherName: _this.params.teacherName,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                EduManService.getTeachClassAttendList(params).$promise
                    .then(function (data) {
                        _this.teachClassAttendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //按行政班查询考勤列表collegeId  professionId

            // getClassAttendList: function () {
            //     var _this = this;
            //     var params = {
            //         collegeId: _this.params.collegeId,
            //         semesterId: _this.params.semesterId,
            //         professionId: (_this.params.collegeId)?_this.params.majorId:null,
            //         classAdministrativeId: _this.classAdministrativeId,
            //         pageNumber: _this.page.pageNumber,
            //         pageSize: _this.page.pageSize,
            //         managerId: AuthService.getUser().id
            //     };
            //     if(!params.professionId){
            //         params.classAdministrativeId=null;
            //     }
            //     EduManService.getClassAttendList(params).$promise
            //         .then(function (data) {
            //             _this.classAttendList = data.data;
            //             _this.page = data.page;
            //         })
            //         .catch(function (error) {
            //
            //         })
            // },
            getClassAttendList: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    professionId: (_this.params.collegeId) ? _this.params.majorId : null,
                    classAdministrativeId: _this.classAdministrativeId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize,
                    managerId: AuthService.getUser().id,
                    orgId: AuthService.getUser().orgId
                };
                if (!params.professionId) {
                    params.classAdministrativeId = null;
                }
                EduManService.getClassAttendList(params).$promise
                    .then(function (data) {
                        _this.classAttendList = data.data;
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //班课考勤记录导出
            teachClassAttendExport: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    courseName: _this.params.courseName,
                    teacherName: _this.params.teacherName,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize,
                    managerId: AuthService.getUser().id
                };
                EduManService.teachClassAttendExport(params).$promise
                    .then(function (data) {
                        if (data.message) {
                            location.href = data.message;
                        } else {
                            messageService.openMsg("生成导出文件失败！");
                        }
                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
                    })
            },
            //行政班考勤记录导出
            classAttendExport: function () {
                var _this = this;
                var params = {
                    collegeId: _this.params.collegeId,
                    semesterId: _this.params.semesterId,
                    professionId: (_this.params.collegeId) ? _this.params.majorId : null,
                    classAdministrativeId: _this.classAdministrativeId,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                if (!params.professionId) {
                    params.classAdministrativeId = null;
                }
                EduManService.classAttendExport(params).$promise
                    .then(function (data) {
                        if (data.message) {
                            location.href = data.message;
                        } else {
                            messageService.openMsg("生成导出文件失败！");
                        }

                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
                    })
            },

            toDetail: function (entity, classes) {
                var _this = this;
                if (classes === 1) {
                    var data = {
                        semester: entity.semesterName,
                        courseName: entity.courseName,
                        code: entity.code,
                        teacherName: entity.teacherName
                    };
                    tempStorageService.setter(data);
                } else {
                    var data = {
                        semester: entity.semesterName,
                        collegeName: entity.collegeName,
                        code: entity.code,
                        className: entity.className
                    };
                    tempStorageService.setter(data);
                }
                $state.go("attenddetail", {id: entity.classId, classes: classes})
            },
            toTrend: function (entity) {
                var data = {
                    semester: entity.semesterName,
                    courseName: entity.courseName,
                    code: entity.code,
                    teacherName: entity.teacherName
                };
                $state.go("teachClassTrend", {id: entity.classId, semesterId: entity.semesterId})
                tempStorageService.setter(data);
            },

            //初始化
            init: function () {
                var _this = this;

                $timeout(function () {
                    _this.getCurrentSemester();
                }, 100)
                if ($state.params.position == 2) {
                    $("#myTab  a:last").tab("show");
                }


            },
        };
        //修改考勤
        $scope.attendFixFn = {
            params: {
                orgId: AuthService.getUser().orgId,
                criteria: null,
                startTime: null,
                endTime: null,
                managerId: AuthService.getUser().id,
                teachingClassName: '',
                teacherName: '',
                courseName: ''
            },
            fixParams: {
                type: "",
                operator: AuthService.getUser().name,
                operatorId: AuthService.getUser().id
            },
            attendList: [],
            fixLogs:[],
            currentEntity: {},
            checkAllRecord: false,
            selDistObj: [],
            isBatch: false, //是否批量修改，true批量
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            translate:function(key){
                var data={"已到":1,"旷课":2,"迟到":3,"请假":4,"早退":5};
                return data[key];
            },
            getAttendListByCondition: function () {
                var _this = this;
                var params = _this.params;
                if(params.startTime&&params.endTime){
                    var flag=$scope.attendFn.checkDateZone(params.startTime,params.endTime)
                    if(!flag){
                        messageService.openMsg("开始时间小于结束时间！");
                        return ;
                    }
                }
                params.pageNumber = _this.page.pageNumber;
                params.pageSize = _this.page.pageSize;
                EduManService.getAttendListByCondition(params).$promise
                    .then(function (data) {
                        _this.attendList = data.data;
                        $scope.batch.addCheckProperty(data.data);
                        _this.checkAllRecord = false;
                        $scope.batch.showSelDistList(data.data, _this, 'id');
                        _this.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            getAttendChangeLog: function () {
                var _this = this;
                var params = {
                    rollcallId : _this.currentEntity.id
                };
                EduManService.getAttendChangeLog(params).$promise
                    .then(function (data) {
                        _this.fixLogs = data.data;
                    })
                    .catch(function (error) {

                    })
            },
            updateAttend: function () {
                var _this = this;
                var params = _this.fixParams;
                if(_this.fixParams.type==_this.translate(_this.currentEntity.type)){
                    ngDialog.close();
                    return ;
                }
                params.rollcallId = _this.currentEntity.id,
                EduManService.updateAttend(params).$promise
                        .then(function (data) {
                            _this.getAttendListByCondition();
                            ngDialog.close();
                        })
                        .catch(function (error) {

                        })
            },

            batchUpdateAttend: function () {
                var _this = this;
                var params = this.fixParams;
                params.rollcallIds = $scope.batch.getIdsByProperty(_this.selDistObj, 'id');
                EduManService.batchUpdateAttend(params).$promise
                    .then(function (data) {
                        if(data.success){
                            _this.getAttendListByCondition();
                            messageService.openMsg("修改成功！");
                        }else{
                            messageService.openMsg("修改失败！");
                        }
                    })
                    .catch(function (error) {

                    })
            },



            detailOpen: function (entity) {
                var _this = this;
                _this.currentEntity=entity;
                _this.getAttendChangeLog();
                ngDialog.open({
                    template: 'fixDetailtDialog',
                    // className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            },
            fixOpen: function (entity) {
                if(!entity){
                    this.isBatch = true;
                    this.fixParams.type = 1;
                    if(!this.selDistObj.length){
                        messageService.openMsg("请选择记录！");
                        return;
                    }
                }else{
                    this.isBatch = false;
                    var _this = this;
                    _this.currentEntity=entity;
                    _this.fixParams.type=_this.translate(_this.currentEntity.type);
                }
                ngDialog.open({
                    template: 'fixAttendDialog',
                    // className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            },
        };
        $scope.attendFixFn.params.startTime = today;
        $scope.attendFixFn.params.endTime = today;
        $scope.attendFixFn.getAttendListByCondition();
    });