/**
 * Created by Administrator on 2017/6/22.
 * 分配页面
 */
angular.module('dleduWebApp')
	.controller('DistributeListCtrl', function ($scope, $state, $timeout, AuthService, EduManService, messageService,
												Select2LoadOptionsService, CollegeService, RoleAuthService, MajorService, ClassService) {
		$scope.distributeListFn = {
			//问卷id
			quesId: 0,
			//tab类型 uncomplete 未分配列表 complete已分配列表
			tabType: 'uncomplete',
			//学期列表
			schoolYearDropList: [],
			//问卷列表
			records: [],
			//当前操作的class
			currentRecord: {},
			//学院下拉列表
			collegeDropList: [],
			majorDropList: [],
			//下拉列表的查询关键字
			dropKeyWord: "",
			//记录选择的分配课程id
			selDistObj: [],
			//页面全选
			checkAllRecord: false,
			//删除标识
			delType: 'single',
			//查询类型
			queryTypes: [{value: 10, name: '按教学班'},
				{value: 20, name: '按行政班'}, {value: 30, name: '按专业'}, {value: 40, name: '按院系'},
				{value: 50, name: '按学校'}],
			//已分配的查询类型
			assignedQueTypes: [{value: 0, name: '班级类型'},{value: 10, name: '教学班'},
				{value: 20, name: '行政班'}],

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//查询条件
			queryOption: {
				queryType: '按教学班',
				courseName: '',//课程名称
				teacherName: '',//授课教师
				className: '', //班级名称
				classHeader: '', //班主任
				collegeId: 0, //学院
				collegeName: '', //学院名称
				professionalId: 0, //专业
				majorName: '' //专业名称
			},

			//控制按钮权限
			isUseAuth: function (type) {
				return RoleAuthService.isUseAuthority(type);
			},

			switchType: function (type) {
				this.tabType = type;
				this.queryOption.teacherName = '';
				this.queryOption.courseName = '';
				this.page.pageNumber = 1;
				this.page.totalElements = 0;
				this.page.totalPages = 0;
				this.records = [];
				if (type == 'uncomplete') {
					this.queryOption.queryType = '按教学班';
					//切换后清空选择分配列表
					this.selDistObj = [];
					this.checkAllRecord = false;
					this.getEvaQuesUnDist();
				} else {
					this.queryOption.queryType = '班级类型';
					this.getEvaQuesDist();
				}
			},


			// 获取评教问卷已分配列表
			getEvaQuesDist: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					managerId: AuthService.getUser().id,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					questionnaireId: this.quesId,
					teacherName: that.queryOption.classHeader,
					name: that.queryOption.className, //班级名称
				};
				var type = this.queryOption.queryType;
				if (type == '教学班') {
					params.classType = 10;
				} else if (type == '行政班') {
					params.classType = 20;
				}
				EduManService.getEvaQuesDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						//增加check属性
						that.addCheckProperty(that.records);
						that.checkAllRecord = false;
						that.showSelDistList(data.data);
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
					quId: that.quesId,
					managerId: AuthService.getUser().id,
					teacherName: that.queryOption.teacherName,
					courseName: that.queryOption.courseName,
				};
				EduManService.getEvaQuesUnDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						//增加check属性
						that.addCheckProperty(that.records);
						that.checkAllRecord = false;
						that.showSelDistList(data.data);
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

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

			//还原之前选中的分配课程，在选择分配列表中的显示出来
			showSelDistList: function (records) {
				var calcCount = 0;//统计包含的元素值和当前页面记录数是否一样
				for (var k = 0, lenRecord = records.length; k < lenRecord; k++) {
					var record = records[k], selId = this.queryOption.queryType == '按教学班' ? record.teachingClassesId : record.id;
					//判断元素在之前元素里面是否已经存在，如果存在不添加
					for (var j = 0, selLen = this.selDistObj.length; j < selLen; j++) {
						var id = this.queryOption.queryType == '按教学班' ? this.selDistObj[j].teachingClassesId : this.selDistObj[j].id;
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

			//根据条件查询
			findByOption: function (type) {
				if (type == 'uncomplete') {
					//params.quId = this.quesId;
					this.monitorType(this.queryOption.queryType);
				} else {
					this.getEvaQuesDist();
				}

			},

			//删除分配
			cancleDist: function () {
				var that = $scope.distributeListFn;
				var params = {delType: that.delType, ids: [], questionnaireId: that.quesId};
				if(that.delType == 'single'){
					params.ids = that.currentRecord.id;
				}else if(that.delType == 'batch'){
					params.ids = that.getIds().toString();
				}
				EduManService.deleteEvaQues(params).$promise
					.then(function (data) {
						if(data.trueMSG){
							that.selDistObj = [];
							messageService.openMsg("删除分配成功！");
							that.page.pageNumber = 1;
							that.getEvaQuesDist();
						}else{
							messageService.openMsg("删除分配失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg("删除分配失败！");
					})
			},

			/**删除提示
			 * @param entity
			 * @param delType //删除类型 single、删除一个 batch批量删除、all删除所有
			 */
			deletePrompt: function (entity, delType) {
				var that = this;
				that.currentRecord = entity;
				that.delType = delType;
				if(that.records.length == 0 || that.selDistObj.length == 0){
					messageService.openMsg("请先选择删除对象！");
					return;
				}
				messageService.getMsg("您确定要删除问卷分配吗？", that.cancleDist);
			},


			//分配问卷
			distQuestionaire: function () {
				var that = this;
				if (this.selDistObj.length == 0) {
					messageService.openMsg("请选择分配记录！");
					return;
				}
				if (this.selDistObj.length > 30) {
					messageService.openMsg("选择的课程数量一次不能超过30个！");
					return;
				}
				var params = this.contructDistParams();

				EduManService.distQuestionaire(params).$promise
					.then(function (data) {
						messageService.openMsg("分配成功！");
						that.selDistObj = [];
						that.page.pageNumber = 1;
						that.findByOption('uncomplete');
					})
					.catch(function (error) {
						messageService.openMsg("分配失败！");
					})
			},

			/**
			 * 构造不同类型的分配参数
			 */
			contructDistParams: function(){
				var type = this.queryOption.queryType, postParams = {questionnaireId: this.quesId};
				if (type == '按学校') {
					postParams.orgId = AuthService.getUser().orgId;
					postParams.assignType = 50;
				} else if (type == '按院系') {
					postParams.assignType = 40;
					postParams.collegeIds = this.getIds();
				} else if (type == '按专业') {
					postParams.assignType = 30;
					postParams.profIds = this.getIds();
				} else if (type == '按行政班') {
					postParams.assignType = 20;
					postParams.classesIds = this.getIds();
				} else if (type == '按教学班') {
					postParams.assignType = 10;
					postParams.teachingClasses = this.selDistObj;
				}
				return postParams;
			},

			/**
			 * 获取id
			 */
			getIds: function(){
				var ids = [];
				for (var k = 0, length = this.selDistObj.length; k < length; k++) {
					var temp = this.selDistObj[k];
					ids.push(temp.id);
				}
				return ids;
			},

			//选择分配元素
			selDist: function ($index) {
				var selObj = this.records[$index];
				if (selObj.check) {
					var flag = false, selId = this.queryOption.queryType == '按教学班' ? selObj.teachingClassesId : selObj.id;
					for (var j = 0; j < this.selDistObj.length; j++) {
						var id = this.queryOption.queryType == '按教学班' ? this.selDistObj[j].teachingClassesId : this.selDistObj[j].id;
						if (selId == id) {
							flag = true;
						}
					}
					if (!flag) {
						this.selDistObj.push(selObj);
					}
				} else {
					var selId = this.queryOption.queryType == '按教学班' ? selObj.teachingClassesId : selObj.id;
					for (var k = 0; k < this.selDistObj.length; k++) {
						var id = this.queryOption.queryType == '按教学班' ? this.selDistObj[k].teachingClassesId : this.selDistObj[k].id;
						if (selId == id) {
							this.selDistObj.splice(k, 1);
							break;
						}
					}
				}
				this.checkAllRecord = false;
				this.showSelDistList(this.records);
			},

			//全选
			checkAll: function () {
				//选择当前页所有记录
				if (this.checkAllRecord) {
					for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
						var record = this.records[k];
						var flag = false, selId = this.queryOption.queryType == '按教学班' ? record.teachingClassesId : record.id;
						//判断元素在之前元素里面是否已经存在，如果存在不添加
						for (var j = 0, selLen = this.selDistObj.length; j < selLen; j++) {
							var id = this.queryOption.queryType == '按教学班' ? this.selDistObj[j].teachingClassesId : this.selDistObj[j].id;
							if (selId == id) {
								flag = true;
							}
						}
						if (!flag) {
							this.selDistObj.push(record);
							record.check = true;
						}
					}

				} else {//反选时当前页所有元素都被删除
					for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
						var record = this.records[k];
						var selId = this.queryOption.queryType == '按教学班' ? record.teachingClassesId : record.id;
						//判断元素在之前元素里面是否已经存在，如果存在则删除此元素
						for (var j = 0; j < this.selDistObj.length; j++) {
							var id = this.queryOption.queryType == '按教学班' ? this.selDistObj[j].teachingClassesId : this.selDistObj[j].id;
							if (selId == id) {
								this.selDistObj.splice(j, 1);
								record.check = false;
								break;
							}
						}
					}
				}
			},

			/**
			 * 监控选择的类型
			 */
			monitorType: function (type) {
				this.selDistObj = [];
				this.page.pageNumber = 1;
				this.checkAllRecord = false;
				if (type == '按学校') {
					this.getSchool();
				} else if (type == '按院系') {
					this.getCollege();
				} else if (type == '按专业') {
					this.getMajor();
				} else if (type == '按行政班') {
					this.getClasses();
				} else if (type == '按教学班') {
					this.getEvaQuesUnDist();
				}
			},

			/**
			 * 获取学校信息
			 */
			getSchool: function () {
				var user = AuthService.getUser();
				this.records = [user];
			},

			/**
			 * 获取学校信息
			 */
			getCollege: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.name = that.queryOption.collegeName;
				CollegeService.getCollegeList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.addCheckProperty(that.records);
						that.checkAllRecord = false;
						that.showSelDistList(data.data);
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			/**
			 * 获取专业
			 */
			getMajor: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					managerId: AuthService.getUser().id,
					collegeId: that.queryOption.collegeId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.name = that.queryOption.majorName;
				MajorService.getMajorList(params).$promise
					.then(function (data) {
						that.records = data.data;

						that.addCheckProperty(that.records);//注意顺序 先增加check属性
						that.checkAllRecord = false; //清楚全选表示
						that.showSelDistList(data.data); //给还原原来已经选中的数据

						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			/**
			 * 获取行政班
			 */
			getClasses: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					managerId: AuthService.getUser().id
				};
				params.name = that.queryOption.className;
				params.collegeId = that.queryOption.collegeId;
				params.professionalId = that.queryOption.professionalId;
				params.masterName = that.queryOption.classHeader;
				//params.teachingYear = that.queryOption.teachingYear;
				ClassService.getClassList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.addCheckProperty(that.records);
						that.checkAllRecord = false;
						that.showSelDistList(data.data);
						that.page = data.page;
					})
					.catch(function (error) {

					})
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
						pageSize: 1000,
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
								collegeId: that.queryOption.collegeId,

							};
							params.name = query.term;
							return params;
						},
						processResults: function (data, params) {
							params.page = params.page || 1;
							return {
								results: data.data,
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
						that.collegeDropList = data.data;
					})
					.catch(function (error) {
					})
			},

			init: function () {
				this.quesId = $state.params.quesId;
				if ($state.params.id == 1) { // id = 1 已经分配列表 0 未分配列表
					$("#myTab  a:last").tab("show");
					this.switchType('complete');
				} else {
					this.getCollegeDropList();
					this.switchType('uncomplete');
				}
			}
		};
		$scope.distributeListFn.init();
		$timeout(function () {
			$scope.$watch('distributeListFn.queryOption.collegeId', function (newValue, oldValue) {
				if (newValue == -1) {
					$scope.distributeListFn.queryOption.professionalId = null;
				}
				if (!newValue) {
					$scope.distributeListFn.queryOption.professionalId = oldValue;
				}
				if (newValue != oldValue) {
					$scope.distributeListFn.majorDropList = [];
				}
			});
		});
	});