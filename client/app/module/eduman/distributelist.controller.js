/**
 * Created by Administrator on 2017/6/22.
 * 分配页面
 */
angular.module('dleduWebApp')
	.controller('DistributeListCtrl', function ($scope, $state, AuthService, EduManService, messageService, Select2LoadOptionsService) {
		$scope.distributeListFn={
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
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//查询条件
			queryOption: {
				collegeId: 0,
				courseName: '',
				teacherName: '',
				semesterId: 0
			},

			switchType: function(type){
				this.queryOption.teacherName = '';
				this.queryOption.courseName = '';
				this.queryOption.semesterId = 0;
				this.queryOption.collegeId = 0;
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
					pageSize: that.page.pageSize
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
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesUnDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},


			//根据条件查询
			findByOption: function (type) {
				var that = this;
				var queyOptions = that.queryOption;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				if(type == 'uncomplete'){
					EduManService.getEvaQuesUnDist(params).$promise
						.then(function (data) {
							that.records = data.data;
							that.page = data.page;
						})
						.catch(function (error) {

						})
				}else{
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
				var that = this;
				var params = {
					id: this.currentRecord.id,
					userId: AuthService.getUser().id,
				}
				EduManService.deleteEvaQues(params).$promise
					.then(function (data) {
						messageService.openMsg("删除成功！");
						that.getEvaQuesDist();
					})
					.catch(function (error) {
						messageService.openMsg("删除失败！");
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
				var ids = [];
				EduManService.distQuestionaire(ids).$promise
					.then(function (data) {
						messageService.openMsg("分配成功！");
						that.getEvaQuesUnDist();
					})
					.catch(function (error) {
						messageService.openMsg("分配失败！");
					})
			},

			init: function () {
				var _this=this;
				if($state.params.id == 1){
					$("#myTab  a:last").tab("show");
					_this.getSchoolYearList();
					_this.getPeriodList();
					this.getCollegeDropList();
					this.getEvaQuesDist();
				}else{
					this.getEvaQuesUnDist();
				}
			}
		};
		$scope.distributeListFn.init();
	});