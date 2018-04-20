'use strict';

angular.module('dleduWebApp')
    .controller('StudentListCtrl', function ($scope,$state, CollegeService,MajorService,AuthService,StudentService,messageService,CommonService,
                                             ngDialog, Upload, ImpBatchService, AccountService,Select2LoadOptionsService,
                                             $timeout, RoleAuthService) {
        $scope.studentListFn={
            //记录选择的分配课程id
            selDistObj: [],
            //页面全选
            checkAllRecord: false,
            //学生列表
            studentList: [],
            //当前操作的student
            currentStudent: {},
            myFile: null, //选择的文件对象
            errorInfos: null, //返回的错误信息
            //学院下拉列表
            collegeDropList: [],
            //专业下拉列表
            majorDropList: [],
            //班级下拉列表
            classDropList: [],

            //学籍异动操作对象
            changeObj: {
                userIdList: [],
                cause: '',
                userId: 0,
            },

            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params: {
                name:"",
                collegeId:"",
                professionalId:"",
                classesId:""
            },

            //控制按钮权限
            isUseAuth: function(type){
                return RoleAuthService.isUseAuthority(type);
            },

            //select2动态关键字查询列表配置
            selectCollege2Options: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
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
                    }
                }
            },
            //专业下拉列表配置
            select2MajorOptions: function () {
                var that = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
                    ajax: {
                        url: "api/major/getMajorDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                collegeId: that.params.collegeId,

                            };
                            params.name = query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            return {
                                results: data.data ? data.data:[],
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: false
                    },

                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            that.majorDropList = [];
                        }
                        that.majorDropList.push(data);
                        return data.name;
                    }
                }
            },
            //班级下拉列表配置
            select2ClassOptions: function () {
                var that = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
                    ajax: {
                        url: "api/class/geClassDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                professionalId: that.params.professionalId,

                            }
                            params.name = query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            return {
                                results: data.data ? data.data:[],
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: false
                    },
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            that.classDropList = [];
                        }
                        that.classDropList.push(data);
                        return data.name;
                    }
                }
            },
            getCollegeDropList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 0,
                    pageSize: 1000,
                    managerId: AuthService.getUser().id
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList =data.data;
                    })
                    .catch(function (error) {
                    })
            },
            //专业下拉列表查询
            getMajorDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                params.collegeId=that.params.collegeId;
                if(params.collegeId == ""){
                    params.collegeId = -1;
                }
                MajorService.getMajorDropList(params).$promise
                    .then(function (data) {
                        that.majorDropList=data.data;
                        if(!that.isInit&& $state.current.name=="studentEdit"){
                            that.getMajorById(that.majorId);
                        }

                    })
                    .catch(function (error) {
                    })
            },
            // 获取学生列表
            getStudentList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: that.page.pageSize,
                    managerId: AuthService.getUser().id
                };
                params.collegeId=that.params.collegeId;
                params.professionalId=that.params.professionalId;
                params.classesId=that.params.classesId;
                params.name=that.params.name;
                StudentService.getStudentList(params).$promise
                    .then(function (data) {
                        that.studentList = data.data;
                        //增加check属性
                        that.addCheckProperty(data.data);
                        that.checkAllRecord = false;
                        that.showSelDistList(data.data);
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findStudentByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize,
                    managerId: AuthService.getUser().id
                };
                params.name=that.params.name;
                params.collegeId=that.params.collegeId;
                params.professionalId=that.params.professionalId;
                params.classesId=that.params.classesId;
                StudentService.getStudentList(params).$promise
                    .then(function (data) {
                        that.studentList = data.data;
                        //增加check属性
                        that.addCheckProperty(data.data);
                        that.checkAllRecord = false;
                        that.showSelDistList(data.data);
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {

                    })
            },

            //移除学生
            removeStudent:function (stu) {
                this.currentStudent = stu;
                ngDialog.open({
                    template: 'changeStuDialog',
                    width: 700,
                    scope: $scope
                })
            },

            submit: function(){
                var that = this;
                var params = this.changeObj;
                params.userIdList = [this.currentStudent.id];
                params.userId = AuthService.getUser().id;
                StudentService.removeStudent(params).$promise
                    .then(function (data) {
                        messageService.openMsg("学籍异动操作成功！");
                        that.getStudentList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error, "学籍异动操作失败！"));
                    })
            },

            //删除
            deleteStudent: function () {
                var _this = $scope.studentListFn;
                var params = {
                    id: _this.currentStudent.id,
                    userId: AuthService.getUser().id,
                }
                StudentService.deleteStudent(params).$promise
                    .then(function (data) {
                        messageService.openMsg("学生删除成功！");
                        _this.getStudentList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"学生删除失败！"));
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentStudent = entity;
                messageService.getMsg("您确定要删除此学生吗？", that.deleteStudent)
            },
            resetPassword: function () {
                var _this = $scope.studentListFn;
                AccountService.resetPassword( _this.currentStudent.id)
                    .success(function (data) {
                        messageService.openMsg("重置密码成功！");
                        _this.getStudentList();
                    })
                    .error(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"重置密码失败！"));
                    })
            },
            resetPasswordPrompt: function (entity) {
                var that=this;
                that.currentStudent = entity;
                messageService.getMsg("您确定要重置"+that.currentStudent.name+"的密码吗？", that.resetPassword)
            },
            unlockBindPhoneAndResetPassword: function () {
                var _this = $scope.studentListFn;
                AccountService.unlockBindPhoneAndResetPassword( _this.currentStudent.id)
                    .success(function (data) {
                        messageService.openMsg("解绑手机成功！");
                        _this.getStudentList();
                    })
                    .error(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"解绑手机失败！"));
                    })
            },
            unlockPrompt: function (entity) {
                var that=this;
                that.currentStudent = entity;
                messageService.getMsg("解绑手机的同时将重置为初始密码，是否继续？", that.unlockBindPhoneAndResetPassword)
            },
            /**
             * 弹出批量导入弹出框
             */
            openImpBatch: function(type){
                var that = this;
                var params = {
                    template: 'importDialog',
                    width: 600,
                    scope: $scope,
                };
                if(type == 'reset'){
                    ngDialog.close();
                    ImpBatchService.openImpBatch(params);
                    return;
                }
                CommonService.addLoading(true, 'all');
                StudentService.getImpResult({orgId: AuthService.getUser().orgId, userId: AuthService.getUser().id}).$promise
                    .then(function (data) {
                        CommonService.addLoading(false, 'all');
                        if(typeof data.state == 'undefined'){
                            ImpBatchService.openImpBatch(params);
                        }else{
                            if(data.state == 10){//数据正在处理请稍候查看
                                messageService.openMsg("数据正在处理，请稍候导入数据！");
                            }else if(data.state == 20){
                                ImpBatchService.openImpBatch(params);
                            }else if(data.state == 30){
                                that.errorInfos = data
                                ngDialog.close();
                                var dialogParams = {
                                    template: 'importResultDialog',
                                    width: 600,
                                    scope: $scope
                                };
                                ngDialog.open(dialogParams);
                            }
                        }
                    })
                    .catch(function (error) {

                    })
            },

            /**
             * 弹出批量导入弹出框
             */
            importantBatch: function(file){
                var params = {
                    file: file,
                    orgId: AuthService.getUser().orgId,
                    userId: AuthService.getUser().id,
                    uploadType: 'student'
                };
                var dialogParams = {
                    template: 'importResultDialog',
                    width: 600,
                    scope: $scope
                };
                ImpBatchService.importantBatch(params, this, dialogParams);
            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

            /**
             * 下载模板
             */
            downLoad: function(){
                ImpBatchService.downLoad('student');
            },

			/**
			 * 导出学生
             */
            exportData: function(){
                var orgId = AuthService.getUser().orgId;
                var params = {orgId: orgId};
                params.collegeId = this.params.collegeId;
                params.professionalId = this.params.professionalId;
                params.classesId = this.params.classesId;
                if(params.collegeId == -1){
                    delete params.collegeId;
                }
                if(params.professionalId == -1){
                    delete params.professionalId;
                }
                if(params.classesId == -1){
                    delete params.classesId;
                }
                params.name = this.params.name;
                params.managerId = AuthService.getUser().id;
                params.pageNumber = 1,
                params.pageSize = 1,
                CommonService.delEmptyProperty(params);
                StudentService.getStudentList(params).$promise
                    .then(function (data) {
                        if(data.data.length == 0){
                            messageService.openMsg("没有数据可以导出！");
                            return;
                        }
                        window.location.href = ImpBatchService.getEnvHost() + '/v1/students/exportstudents?orgId='+orgId
                            + (params.collegeId ? "&collegeId=" + params.collegeId : '')
                            + (params.professionalId ? "&professionalId=" + params.professionalId : '')
                            + (params.classesId ? "&classesId=" + params.classesId : '')
                            + (params.name ? "&name=" + params.name : '');
                    })
                    .catch(function (error) {

                    })
                StudentService.exportData(params).$promise
                    .then(function (data) {

                    })
                    .catch(function (error) {

                    })
            },


            //批量删除学生
            batchDelStu: function () {
                var _this = $scope.studentListFn;
                var params = {
                    ids: _this.getIdsByProperty(_this.selDistObj, 'id'),
                    userId: AuthService.getUser().id,
                }
                StudentService.deleteStuBatch(params).$promise
                    .then(function (data) {
                        messageService.openMsg("批量删除学生成功！");
                        _this.selDistObj = [];
                        _this.checkAllRecord = false;
                        _this.getStudentList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"学生删除失败！"));
                    })
            },
            //批量删除提示
            batchDel: function () {
                var that = this, length = this.selDistObj.length;
                if(length == 0){
                    messageService.openMsg("请先选择学生！");
                    return;
                }
                messageService.getMsg("当前选中记录：" + length +"条，您确定要删除这些学生吗？", that.batchDelStu)
            },

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
            showSelDistList: function (records) {
                var calcCount = 0;//统计包含的元素值和当前页面记录数是否一样
                for (var k = 0, lenRecord = records.length; k < lenRecord; k++) {
                    var record = records[k], selId = record.id;
                    //判断元素在之前元素里面是否已经存在，如果存在不添加
                    for (var j = 0, selLen = this.selDistObj.length; j < selLen; j++) {
                        var id = this.selDistObj[j].id;
                        if (selId == id) {
                            record.check = true;
                            calcCount++;
                            break;
                        }
                    }
                }

                if (calcCount == lenRecord && calcCount) {
                    this.checkAllRecord = true;
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
            selSingleRecord: function (records, $index) {
                var selObj = records[$index];
                if (selObj.check) { //选中当前记录
                    var flag = false, index, selId =  selObj.id;
                    for (var j = 0; j < this.selDistObj.length; j++) {
                        var id = this.selDistObj[j].id;
                        if (selId == id) {
                            flag = true;
                            index = j;
                        }
                    }
                    if (!flag) {
                        this.selDistObj.push(selObj);
                    }
                } else {//反选当前记录
                    var flag = false, index, selId = selObj.id;
                    this.checkAllRecord = false;
                    for (var k = 0; k < this.selDistObj.length; k++) {
                        var id = this.selDistObj[k].id;
                        if (selId == id) {
                            this.selDistObj.splice(k, 1);
                            break;
                        }
                    }
                }
                //this.cloneSelDistObj = angular.copy(this.selDistObj);
                this.showSelDistList(records);
            },

            //点击选择当前页全选
            checkAll: function (pageAllRecords) {
                if (this.checkAllRecord) {
                    for (var k = 0, lenRecord = pageAllRecords.length; k < lenRecord; k++) {
                        var record = pageAllRecords[k];
                        var flag = false, selId = record.id;
                        //判断元素在之前元素里面是否已经存在，如果存在不添加
                        for (var j = 0, selLen = this.selDistObj.length; j < selLen; j++) {
                            var id = this.selDistObj[j].id;
                            if (selId == id) {
                                flag = true;
                            }
                        }
                        if (!flag) {
                            this.selDistObj.push(record);
                            record.check = true;
                        }
                    }

                } else {//点击反选时当前页所有元素都被删除
                    for (var k = 0, lenRecord = pageAllRecords.length; k < lenRecord; k++) {
                        var record = pageAllRecords[k];
                        var selId = record.id;
                        //判断元素在之前元素里面是否已经存在，如果存在则删除此元素
                        for (var j = 0; j < this.selDistObj.length; j++) {
                            var id = this.selDistObj[j].id;
                            if (selId == id) {
                                this.selDistObj.splice(j, 1);
                                record.check = false;
                                break;
                            }
                        }
                    }
                }
            },


            init: function () {
                this.params.collegeId=$state.params.collegeId;
                this.params.professionalId=$state.params.professionalId;
                this.getCollegeDropList();
                this.getMajorDropList();
                this.getStudentList();
            }
        };
        $scope.studentListFn.init();
        $timeout(function () {
            $scope.$watch('studentListFn.params.collegeId', function(newValue, oldValue) {
                if(!newValue){
                    $scope.studentListFn.params.majorId="-1";
                }
                if (newValue!=oldValue){
                    $scope.studentListFn.majorDropList=[];
                }
            });
            $scope.$watch('studentListFn.params.professionalId', function(newValue, oldValue) {
                if(!newValue){
                    $scope.studentListFn.params.classesId="-1";
                }
                if (newValue!=oldValue){
                    $scope.studentListFn.classDropList=[];
                }
            });
        });
    });
