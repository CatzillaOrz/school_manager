/**
 * Created by Administrator on 2017/6/22.
 * 评学分配页面
 */
angular.module('dleduWebApp')
	.controller('TeaDistributeListCtrl', function ($scope, $state, $timeout, AuthService, EduManService, messageService,
												Select2LoadOptionsService, CollegeService, RoleAuthService, TeacherService) {
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
			cloneSelDistObj: [],
			//页面全选
			checkAllRecord: false,
			//删除标识
			delType: 'single',
			//是否授课教师
			isTeachings: [{id: 0, name: '请选择'},{id: 20, name: '是'},
				{id: 10, name: '否'}],
			//已经分配筛选条件
			teacherTypes:  [{id: 0, name: '请选择'},{id: 20, name: '是'},
				{id: 10, name: '否'}],

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//查询条件
			queryOption: {
				teacherName: '',//授课教师
				collegeId: 0, //学院
				type: 0, //是否授课
			},

			distedParams:{
				teacherName: '',//授课教师
				type: 0
			},

			//控制按钮权限
			isUseAuth: function (type) {
				return RoleAuthService.isUseAuthority(type);
			},

			switchType: function (type) {
				this.tabType = type;
				this.page.pageNumber = 1;
				this.page.totalElements = 0;
				this.page.totalPages = 0;
				this.records = [];
				this.checkAllRecord = false;
				if (type == 'uncomplete') {
					//切换后清空选择分配列表
					this.selDistObj = [];
					this.getEvaQuesUnDist();
				} else {
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
					quesId: this.quesId,
					name: that.distedParams.teacherName,
					teacherType: that.distedParams.type, //教师类型
				};
				EduManService.getDistedTeaching(params).$promise
					.then(function (data) {
						that.records = data.data;
						//增加check属性
						that.addCheckProperty(that.records);
						that.checkAllRecord = false;
						that.showSelDistList(that.records);
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},


			// 获取未分配列表
			getEvaQuesUnDist: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					managerId: AuthService.getUser().id,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.queryOption.teacherName,
					collegeId: that.queryOption.collegeId,
					teacherType: that.queryOption.type,
				};
				if(params.name == ''){
					delete params.name;
				}
				EduManService.getDistTeaching(params).$promise
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

			//根据条件查询
			findByOption: function (type) {
				this.page.pageNumber = 1;
				if (type == 'uncomplete') {
					this.getEvaQuesUnDist();
				} else {
					this.getEvaQuesDist();
				}

			},

			//删除分配
			cancleDist: function () {
				var that = $scope.distributeListFn;
				var params = {questionId: that.quesId};
				if(that.delType == 'batch'){
					params.users = that.getIds();
				}else if(that.delType == 'all'){
					params.all = true;
					if(that.distedParams.teacherName != ''){
						params.teacherName = that.distedParams.teacherName;
					}
					params.teacherType = that.distedParams.type;
					params.users = [];
				}
				EduManService.delTeaching(params).$promise
					.then(function (data) {
						if(data.result){
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
			 * @param delType //删除一个 batch批量删除、all删除所有
			 */
			deletePrompt: function (entity, delType) {
				var that = this;
				that.currentRecord = entity;
				that.delType = delType;
				if(that.delType=='batch' && (that.records.length == 0 || that.selDistObj.length == 0)){
					messageService.openMsg("请先选择删除对象！");
					return;
				}else{
					messageService.getMsg("您确定要删除问卷分配吗？", that.cancleDist);
				}
			},

			/**
			 * 分配问卷时的提示
			 * @param entity
			 * @param type //分配类型 batch、all分配所有
			 */
			distQuesPrompt: function (type) {
				var that = this, tip;
				if(type == 'batch' && (that.records.length == 0 || that.selDistObj.length == 0)){
					messageService.openMsg("请先选择分配对象！");
					return;
				}
				if(type == 'batch'){
					tip = "当前选中记录"+ that.selDistObj.length + "您确定要分配问卷吗？";
					messageService.getMsg(tip, that.distSelQues);
				}else{
					tip = this.queryOption.collegeId ? "您确定要给学校所有教师分配问卷吗？"
						: "您确定要给当前学院所有教师分配问卷吗？";
					messageService.getMsg(tip, that.distAllQues);
				}
			},

			//分配选择的问卷
			distSelQues: function () {
				var that = $scope.distributeListFn;
				var params = {questionId: that.quesId};
				//组装用户列表
				var users = [];
				for(var i = 0, len = that.selDistObj.length; i < len; i++){
					var temp = that.selDistObj[i];
					var user = {collegeId: temp.collegeId, collegeName: temp.collegeName, jobNum: temp.jobNum,
						teacherType: temp.teacherType, userId: temp.userId, userName: temp.name, userType: temp.userType};
					users.push(user);
				}
				params.users = users;
				EduManService.distTeaching(params).$promise
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

			//分配当前条件下的所有问卷
			distAllQues: function () {
				var that = $scope.distributeListFn;
				var params = {questionId: that.quesId};
				params.all = true;
				params.collegeId = that.queryOption.collegeId;
				if(that.queryOption.collegeId == -1){
					delete params.collegeId;
				}
				if(that.queryOption.teacherName != ''){
					params.teacherName = that.queryOption.teacherName;
				}
				params.teacherType = that.queryOption.teacherType;
				params.users = [];
				EduManService.distTeaching(params).$promise
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
			 * 获取id
			 */
			getIds: function(){
				var ids = [];
				for (var k = 0, length = this.selDistObj.length; k < length; k++) {
					var temp = this.selDistObj[k];
					ids.push({userId: temp.userId});
				}
				return ids;
			},

			//单击选择单个记录
			selDist: function ($index) {
				var selObj = this.records[$index];
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
				this.cloneSelDistObj = angular.copy(this.selDistObj);
				this.showSelDistList(this.records);
			},

			//点击选择当前页全选
			checkAll: function () {
				if (this.checkAllRecord) {
					for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
						var record = this.records[k];
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
					for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
						var record = this.records[k];
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
			getCollegeDropList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 0,
					pageSize: 100,
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
				var isEnd = $state.params.type; //判断是否结束
				this.isEnd = isEnd;
				if(isEnd == "end"){
					$("#comp").tab("show");
					this.switchType('complete');
				}else{
					if ($state.params.id == 1) { // id = 1 已经分配列表 0 未分配列表
						$("#myTab  a:last").tab("show");
						this.switchType('complete');
					} else {
						this.getCollegeDropList();
						this.switchType('uncomplete');
					}
				}

			}
		};
		$scope.distributeListFn.init();
	});