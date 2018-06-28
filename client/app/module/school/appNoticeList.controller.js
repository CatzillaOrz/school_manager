'use strict';
/**
*校园动态app设置
*/

angular.module('dleduWebApp')
    .controller('SchoolNewListCtrl', function ($scope, $rootScope, $state, SchoolService, messageService, AuthService,
                                               CommonService, RoleAuthService) {
        $scope.schoolNewList = {
            //记录选择的分配课程id
            selDistObj: [],
            //页面全选
            checkAllRecord: false,
            statusDomains: [
                {
                    name:'全部',
                    statusId:2
                },
                {
                    name:'未发布',
                    statusId:0
                } ,
                {
                    name:'已发布',
                    statusId:1
                }
            ],
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params: {
                organId: AuthService.getUser().orgId,
                title:"",
                startDate:"",
                endDate:"",
                published: 2
            },

            records: [],
            currentRecord: null,

            //控制按钮权限
            isUseAuth: function(type){
                return RoleAuthService.isUseAuthority(type);
            },

            getSchoolNewList: function(){
                var that = this;
                var params = angular.copy(this.params);
                if(params.published == 2)
                    delete params.published;
                params.pageNumber = this.page.pageNumber;
                params.pageSize = this.page.pageSize;
                SchoolService.getSchoolNewList(params).$promise
                    .then(function (data) {
                        var datas = CommonService.revertOldResultType(data);
                        that.records = datas.data;
                        //增加check属性
                        that.addCheckProperty(datas.data);
                        that.checkAllRecord = false;
                        that.showSelDistList(datas.data);
                        that.page = datas.page;
                    })
                    .catch(function (error) {

                    })
            },

            querySchoolNewList: function(){
                this.page.pageNumber = 1;
                this.getSchoolNewList();
            },

            publishNews: function(id){
                var that = this;
                SchoolService.publishNews({newsId: id}).$promise
                    .then(function (data) {
                        messageService.openMsg("发布成功！");
                        that.querySchoolNewList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"发布失败！"));
                    })
            },

            canclePublish: function(id){
                var that = this;
                SchoolService.canclePublish({newsId: id}).$promise
                    .then(function (data) {
                        messageService.openMsg("取消发布成功！");
                        that.querySchoolNewList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"取消发布失败！"));
                    })
            },

            update: function(id){
                $state.go('addNews',{id: id});
            },

            deletePrompt: function(entity){
                var that=this;
                that.currentRecord = entity;
                messageService.getMsg("您确定要删除此记录吗？", that.delRecord)
            },

            delRecord: function(){
                var _this = $scope.schoolNewList;
                var params = {
                    newsId: _this.currentRecord.id,
                }
                SchoolService.delNews(params).$promise
                    .then(function (data) {
                        messageService.openMsg("删除成功！");
                        _this.querySchoolNewList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"删除失败！"));
                    })
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

            batchPrompt: function(type){
                var that = this, message = '';
                if(this.selDistObj.length == 0){
                    messageService.openMsg("请先选择记录！");
                    return;
                }
                if(type == 'publish'){
                    message = "您确定要发布这些记录吗？";
					messageService.getMsg(message, that.batchPublish);
                }else{
                    message = "您确定要删除这些记录吗？";
                    messageService.getMsg(message, that.batchDel);
                }
            },

            batchPublish: function(){
                var that = $scope.schoolNewList;
                var params = {newsIds: that.getIdsByProperty(that.selDistObj, 'id')};
                SchoolService.batchPublishNews(params).$promise
                    .then(function (data) {
                        if(data.result == 'success'){
                            messageService.openMsg("批量发布成功！");
                            that.selDistObj = [];
                            that.getSchoolNewList();
                        }else{
                            messageService.openMsg("批量发布失败！");
                        }
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"批量发布失败！"));
                    })
            },

            batchDel: function(){
                var that = $scope.schoolNewList;
                var params = {newsIds: that.getIdsByProperty(that.selDistObj, 'id')};
                SchoolService.batchDelNews(params).$promise
                    .then(function (data) {
                        if(data.result == 'success'){
                            messageService.openMsg("批量删除成功！");
                            that.getSchoolNewList();
                            that.selDistObj = [];
                        }else{
                            messageService.openMsg("批量删除失败！");
                        }
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"批量删除失败！"));
                    })
            },

            init: function(){
                this.getSchoolNewList();
            }
        }

        $scope.schoolNewList.init();
    });