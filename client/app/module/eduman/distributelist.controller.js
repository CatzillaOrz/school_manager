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
				if(type == 'uncomplete'){
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
						that.page = data.page;
					})
					.catch(function (error) {

					})
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

			//获取学期列表
			select2SemesterOptions: function () {
				var _this = this;
				return {
					placeholder: {
						id: '-1', // the value of the option
						text: '按学期筛选'
					},
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
							_this.schoolYearDropList = _this.select2GroupFormat(data.data)
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

			//select2动态关键字查询列表配置
			selectCollege2Options:function () {
				var _this=this;
				return{
					placeholder: {
						id: '-1', // the value of the option
						text: '按班级筛选'
					},
					// allowClear: true,
					ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList",{
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: 100
					},"name"),

					templateResult: function (data) {

						if (data.id === '') { // adjust for custom placeholder values
							_this.collegeDropList=[];
							return '按班级筛选';
						}
						_this.collegeDropList.push(data);
						return data.name;
					}

				}
			},

			getCollegeDropList:function () {
				var that=this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					name:that.dropKeyWord,
					pageSize: 100
				}
				CollegeService.getCollegeDropList(params).$promise
					.then(function (data) {
						that.collegeDropList=data.data;
					})
					.catch(function (error) {
					})
			},

			//分配问卷
			distQuestionaire: function(){
				var that = this;
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

			//
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
			},

			init: function () {
				var _this = this;
				this.quesId = $state.params.quesId;
				if($state.params.id == 1){
					$("#myTab  a:last").tab("show");
					this.getEvaQuesDist();
					this.getCollegeDropList();
				}else{
					this.getEvaQuesUnDist();
				}
			}
		};
		$scope.distributeListFn.init();
	});