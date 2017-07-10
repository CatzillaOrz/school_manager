/**
 * Created by Administrator on 2017/6/22.
 * 分配页面
 */
angular.module('dleduWebApp')
	.controller('DistributeListCtrl', function ($scope, $state, AuthService, EduManService, messageService, Select2LoadOptionsService, CollegeService) {
		$scope.distributeListFn={
			//问卷id
			quesId: 0,
			//学期列表
			schoolYearDropList: [],
			//问卷列表
			records: [],
			//当前操作的class
			currentRecord: {},
			//学院下拉列表
			collegeDropList:[],
			//下拉列表的查询关键字
			dropKeyWord:"",
			//记录选择的分配课程id
			selDistObj: [],
			//页面全选
			checkAllRecord: false,

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//查询条件
			queryOption: {
				courseName: '',
				teacherName: '',
			},

			switchType: function(type){
				this.queryOption.teacherName = '';
				this.queryOption.courseName = '';
				this.page.pageNumber = 1;
				this.records = [];
				if(type == 'uncomplete'){
					//切换后清空选择分配列表
					this.selDistObj = [];
					this.checkAllRecord = false;
					this.getEvaQuesUnDist();
				}else{
					this.getEvaQuesDist();
				}
			},


			// 获取评教问卷已分配列表
			getEvaQuesDist: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					id: this.quesId
				};
				EduManService.getEvaQuesDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},


			// 获取评教问卷未分配列表
			getEvaQuesUnDist: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					quId: that.quesId
				};
				EduManService.getEvaQuesUnDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						//增加check属性
						for(var i = 0; i < data.data.length; i++){
							data.data[i].check = false;
						}
						that.checkAllRecord = false;
						that.showSelDistList(data.data);
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			//还原之前选中的分配课程，在选择分配列表中的显示出来
			showSelDistList: function(records){
				var calcCount = 0;//统计包含的元素值和当前页面记录数是否一样
				for(var k = 0, lenRecord = records.length; k < lenRecord; k++){
					var record = records[k], selId = record.teachingClassesId;
					//判断元素在之前元素里面是否已经存在，如果存在不添加
					for(var j = 0, selLen = this.selDistObj.length; j < selLen; j++){
						if(selId == this.selDistObj[j].teachingClassesId){
							record.check = true;
							calcCount++;
							break;
						}
					}
				}
				if(calcCount == lenRecord){
					this.checkAllRecord = true;
				}
			},

			//根据条件查询
			findByOption: function (type) {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					teacherName: that.queryOption.teacherName,
					courseName: that.queryOption.courseName
				};
				if(that.queryOption.courseName == ''){
					delete params.courseName;
				}
				if(that.queryOption.teacherName == ''){
					delete params.teacherName;
				}

				if(type == 'uncomplete'){
					params.quId = this.quesId;
					EduManService.getEvaQuesUnDist(params).$promise
						.then(function (data) {
							that.records = data.data;
							that.page = data.page;
						})
						.catch(function (error) {

						})
				}else{
					params.id = this.quesId;
					EduManService.getEvaQuesDist(params).$promise
						.then(function (data) {
							that.records = data.data;
							that.page = data.page;
						})
						.catch(function (error) {

						})
				}

			},

			//撤销分配
			cancleDist: function(index){
				var that = $scope.distributeListFn;
				var params = {
					id: that.currentRecord.id,
					userId: AuthService.getUser().id,
				}
				EduManService.deleteEvaQues(params).$promise
					.then(function (data) {
						messageService.openMsg("撤销分配成功！");
						that.getEvaQuesDist();
					})
					.catch(function (error) {
						messageService.openMsg("撤销分配失败！");
					})
			},

			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要撤销问卷吗？", that.cancleDist)
			},


			//分配问卷
			distQuestionaire: function(){
				var that = this;
				if(this.selDistObj.length == 0){
					messageService.openMsg("请选择课程！");
					return;
				}
				var params = {questionnaireId: this.quesId, teachingClasses: this.selDistObj};

				EduManService.distQuestionaire(params).$promise
					.then(function (data) {
						messageService.openMsg("分配成功！");
						that.getEvaQuesUnDist();
					})
					.catch(function (error) {
						messageService.openMsg("分配失败！");
					})
			},

			//选择分配元素
			selDist: function($index){
				var selObj = this.records[$index];
				if(selObj.check){
					var flag = false, selId = selObj.teachingClassesId;
					for(var j = 0; j < this.selDistObj.length; j++){
						if(selId == this.selDistObj[j].teachingClassesId){
							flag = true;
						}
					}
					if(!flag){
						this.selDistObj.push(selObj);
					}
				}else{
					var selId = selObj.teachingClassesId;
					for(var k = 0; k < this.selDistObj.length; k++){
						if(selId == this.selDistObj[k].teachingClassesId){
							this.selDistObj.splice(k, 1);
							break;
						}
					}
				}
				this.checkAllRecord = false;
				this.showSelDistList(this.records);
			},

			//全选
			checkAll: function(){
				//选择当前页所有记录
				if(this.checkAllRecord){
					for(var k = 0, lenRecord = this.records.length; k < lenRecord; k++){
						var record = this.records[k];
						var flag = false, selId = record.teachingClassesId;
						//判断元素在之前元素里面是否已经存在，如果存在不添加
						for(var j = 0; j < this.selDistObj.length; j++){
							if(selId == this.selDistObj[j].teachingClassesId){
								flag = true;
							}
						}
						if(!flag){
							this.selDistObj.push(record);
							record.check = true;
						}
					}

				}else{//反选时当前页所有元素都被删除
					for(var k = 0, lenRecord = this.records.length; k < lenRecord; k++){
						var record = this.records[k];
						var selId = record.teachingClassesId;
						//判断元素在之前元素里面是否已经存在，如果存在则删除此元素
						for(var j = 0; j < this.selDistObj.length; j++){
							if(selId == this.selDistObj[j].teachingClassesId){
								this.selDistObj.splice(j, 1);
								record.check = false;
								break;
							}
						}
					}
				}
			},

			init: function () {
				var _this = this;
				this.quesId = $state.params.quesId;
				if($state.params.id == 1){
					$("#myTab  a:last").tab("show");
					this.getEvaQuesDist();
				}else{
					this.getEvaQuesUnDist();
				}
			}
		};
		$scope.distributeListFn.init();
	});