/**
 * Created by Administrator on 2017/6/22.
 * 分配页面
 */
angular.module('dleduWebApp')
	.controller('DistributeListCtrl', function ($scope, $state, $timeout, $interval, AuthService, EduManService, messageService,
												Select2LoadOptionsService, CollegeService, RoleAuthService, MajorService, ClassService, tempStorageService) {
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
			//反选的记录
			invertSelDistObj: [],
			//页面全选
			checkAllRecord: false,
			//反选
			invertCheckRecord: false,
			//删除标识
			delType: 'single',

			//查询类型
			queryTypes: [{value: 10, name: '按班课'},
				{value: 20, name: '按行政班'}, {value: 30, name: '按专业'}, {value: 40, name: '按院系'},
				{value: 50, name: '按学校'}],
			//已分配的查询类型
			assignedQueTypes: [{value: 0, name: '班级类型'},{value: 10, name: '班课'},
				{value: 20, name: '行政班'}],

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//查询条件
			queryOption: {
				queryType: '按班课',
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
					this.queryOption.queryType = '按班课';
					//切换后清空选择分配列表
					this.selDistObj = [];
					this.checkAllRecord = false;
					this.getEvaQuesUnDist();
				} else {
					if(this.queryOption.queryType == '按班课') {
						this.queryOption.queryType = '班级类型';
					}
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
				if (type == '班课') {
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
					//className: that.queryOption.className
				};
				EduManService.getEvaQuesUnDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						//增加check属性
						that.addCheckProperty(that.records);
						that.checkAllRecord = false;
						if(that.invertCheckRecord){
							that.showInvertSelDistList(data.data);
						}else{
							that.showSelDistList(data.data);
						}
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
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
				if(that.delType == 'batch' && (that.records.length == 0 || that.selDistObj.length == 0)){
					messageService.openMsg("请先选择删除对象！");
					return;
				}
				var tip = "您确定要删除问卷分配吗？";
				if(that.delType == 'all'){
					tip = "您确定要删除当前条件下的所有的问卷分配吗？"
				}
				messageService.getMsg(tip, that.cancleDist);
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
					tip = "当前选中记录"+ that.selDistObj.length + "，您确定要分配问卷吗？";
					messageService.getMsg(tip, that.distQuestionaire);
				}else{
					tip = "您确定要给当前条件查询的所有结果分配问卷吗？";
					messageService.getMsg(tip, that.distAllQues);
				}
			},

			/**
			 * 分配当前条件下的所有问卷. 通过查询该条件下后台对应的所有数据
			 */
			distAllQues: function () {
				var that = $scope.distributeListFn, postParams = {questionnaireId: that.quesId};
				if(that.queryOption.queryType=='按班课'){
					var params = {
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: that.page.totalElements,
						quId: that.quesId,
						managerId: AuthService.getUser().id,
					};
					EduManService.getEvaQuesUnDist(params).$promise
						.then(function (data) {
							//分配前。把之前选中元素反选
							postParams.assignType = 10;
							postParams.teachingClasses = data.data;
							if (postParams.teachingClasses.length == 0) {
								messageService.openMsg("当前条件没有查询结果！");
								return;
							}
							that.distQuesByApi(postParams);
						})
						.catch(function (error) {

						})
				}else if(that.queryOption.queryType=='按行政班'){
					var params = {
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: that.page.totalElements,
						managerId: AuthService.getUser().id
					};
					params.name = that.queryOption.className;
					params.collegeId = that.queryOption.collegeId;
					params.professionalId = that.queryOption.professionalId;
					params.masterName = that.queryOption.classHeader;
					ClassService.getClassList(params).$promise
						.then(function (data) {
							//分配前。把之前选中元素反选
							postParams.assignType = 20;
							postParams.classesIds = that.getIdsByProperty(data.data, 'id');
							if (postParams.classesIds.length == 0) {
								messageService.openMsg("当前条件没有查询结果！");
								return;
							}
							that.distQuesByApi(postParams);
						})
						.catch(function (error) {

						})
				}else if(that.queryOption.queryType=='按专业'){
					var params = {
						orgId: AuthService.getUser().orgId,
						managerId: AuthService.getUser().id,
						collegeId: that.queryOption.collegeId,
						pageNumber: 1,
						pageSize: that.page.totalElements
					};
					params.name = that.queryOption.majorName;
					MajorService.getMajorList(params).$promise
						.then(function (data) {
							//分配前。把之前选中元素反选
							postParams.assignType = 30;
							postParams.profIds = that.getIdsByProperty(data.data, 'id');
							if (postParams.profIds.length == 0) {
								messageService.openMsg("当前条件没有查询结果！");
								return;
							}
							that.distQuesByApi(postParams);
						})
						.catch(function (error) {

						})
				}else if(that.queryOption.queryType=='按院系'){
					var params = {
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: that.page.totalElements
					};
					params.name = that.queryOption.collegeName;
					CollegeService.getCollegeList(params).$promise
						.then(function (data) {
							//分配前。把之前选中元素反选
							postParams.assignType = 40;
							postParams.collegeIds = that.getIdsByProperty(data.data, 'id');
							if (postParams.collegeIds.length == 0) {
								messageService.openMsg("当前条件没有查询结果！");
								return;
							}
							that.distQuesByApi(postParams);
						})
						.catch(function (error) {

						})
				}

			},


			//分配问卷
			distQuestionaire: function () {
				var that = $scope.distributeListFn;
				if(that.invertCheckRecord){
					var params = {
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: that.page.totalElements,
						quId: that.quesId,
						managerId: AuthService.getUser().id,
					};
					EduManService.getEvaQuesUnDist(params).$promise
						.then(function (data) {
							//分配前。把之前选中元素反选
							var params = {questionnaireId: that.quesId};
							params.assignType = 10;
							params.teachingClasses = that.invertAllRecords(data.data);
							if (params.teachingClasses.length == 0) {
								messageService.openMsg("请选择分配记录！");
								return;
							}
							that.distQuesByApi(params);
						})
						.catch(function (error) {

						})
				}else{
					if (that.selDistObj.length == 0) {
						messageService.openMsg("请选择分配记录！");
						return;
					}
					var params = that.contructDistParams();
					that.distQuesByApi(params);
				}
			},

			/**
			 * 调用后台分配问卷方法
			 */
			distQuesByApi: function(params){
				var that = this;
				EduManService.distQuestionaire(params).$promise
					.then(function (data) {
						messageService.openMsg("分配成功！");
						that.selDistObj = [];
						that.page.pageNumber = 1;
						that.invertCheckRecord = false;
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
				if(records != null){
					for (var i = 0, recordLen = records.length; i < recordLen; i++) {
						var record = records[i];
						record.check = false;
					}
				}
			},

			//还原之前选中的分配课程，在选择分配列表中的显示出来
			showSelDistList: function (records) {
				if(records == null){
					return;
				}
				var calcCount = 0;//统计包含的元素值和当前页面记录数是否一样
				for (var k = 0, lenRecord = records.length; k < lenRecord; k++) {
					var record = records[k], selId = this.queryOption.queryType == '按班课' ? record.teachingClassesId : record.id;
					//判断元素在之前元素里面是否已经存在，如果存在不添加
					for (var j = 0, selLen = this.selDistObj.length; j < selLen; j++) {
						var id = this.queryOption.queryType == '按班课' ? this.selDistObj[j].teachingClassesId : this.selDistObj[j].id;
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

			//还原之前反选的课程
			showInvertSelDistList: function (datas) {
				this.cloneSelDistObj = this.selDistObj;
				var calcCount = 0;//统计包含的元素值和当前页面记录数是否一样
				for(var i = 0, len = datas.length; i < len; i++ ){
					var data = datas[i], flag = false;
					for(var j = 0, lenSel = this.cloneSelDistObj.length; j < lenSel; j++ ){
						var temp = this.cloneSelDistObj[j];
						if(data.teachingClassesId == temp.teachingClassesId){
							flag = true;
						}
					}
					if(!flag){
						data.check = true;
						calcCount++;
					}else{
						data.check = false;
					}
				}
				if (calcCount == len && calcCount) {
					this.checkAllRecord = true;
				}
			},

			/**
			 * 查询所有未分配的班课
			 */
			invertAllRecords: function(datas){
				var dataArr = [];
				for(var i = 0, len = datas.length; i < len; i++ ){
					var data = datas[i], flag = false;
					for(var j = 0, lenSel = this.cloneSelDistObj.length; j < lenSel; j++ ){
						var temp = this.cloneSelDistObj[j];
						if(data.teachingClassesId == temp.teachingClassesId){
							flag = true;
						}
					}
					if(!flag){
						dataArr.push(data);
					}
				}
				return dataArr;
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
				} else if (type == '按班课') {
					postParams.assignType = 10;
					postParams.teachingClasses = this.selDistObj;
				}
				return postParams;
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
					var flag = false, index, selId = this.queryOption.queryType == '按班课' ? selObj.teachingClassesId : selObj.id;
					for (var j = 0; j < this.selDistObj.length; j++) {
						var id = this.queryOption.queryType == '按班课' ? this.selDistObj[j].teachingClassesId : this.selDistObj[j].id;
						if (selId == id) {
							flag = true;
							index = j;
						}
					}
					if(this.invertCheckRecord){//反选的时候存在在反选里面的数据从原来数组里面删除
						if (flag) {
							this.selDistObj.splice(index, 1);
						}
					}else{
						if (!flag) {
							this.selDistObj.push(selObj);
						}
					}
				} else {
					var flag = false, index, selId = this.queryOption.queryType == '按班课' ? selObj.teachingClassesId : selObj.id;
					for (var k = 0; k < this.selDistObj.length; k++) {
						var id = this.queryOption.queryType == '按班课' ? this.selDistObj[k].teachingClassesId : this.selDistObj[k].id;
						if(this.invertCheckRecord){//反选的时候
							if (selId == id) {
								flag = true;
							}
						}else{
							if (selId == id) {
								this.selDistObj.splice(k, 1);
								break;
							}
						}
					}
					if(this.invertCheckRecord) {//反选的时候
						if(!flag){
							this.selDistObj.push(selObj);
						}
					}
				}
				this.checkAllRecord = false;
				if(!this.invertCheckRecord){
					this.showSelDistList(this.records);
				}else{
					this.cloneSelDistObj = angular.copy(this.selDistObj);
					this.showInvertSelDistList(this.records);
				}
			},

			//全选
			checkAll: function () {
				//选择当前页所有记录
				if(!this.invertCheckRecord){
					if (this.checkAllRecord) {
						for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
							var record = this.records[k];
							var flag = false, selId = this.queryOption.queryType == '按班课' ? record.teachingClassesId : record.id;
							//判断元素在之前元素里面是否已经存在，如果存在不添加
							for (var j = 0, selLen = this.selDistObj.length; j < selLen; j++) {
								var id = this.queryOption.queryType == '按班课' ? this.selDistObj[j].teachingClassesId : this.selDistObj[j].id;
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
							var selId = this.queryOption.queryType == '按班课' ? record.teachingClassesId : record.id;
							//判断元素在之前元素里面是否已经存在，如果存在则删除此元素
							for (var j = 0; j < this.selDistObj.length; j++) {
								var id = this.queryOption.queryType == '按班课' ? this.selDistObj[j].teachingClassesId : this.selDistObj[j].id;
								if (selId == id) {
									this.selDistObj.splice(j, 1);
									record.check = false;
									break;
								}
							}
						}
					}
				}else {//反选 全选的时候 删除保存的正选里面存在的元素
					if (this.checkAllRecord){
						for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
							var record = this.records[k];
							var selId = record.teachingClassesId;
							//判断元素在之前元素里面是否已经存在，如果存在则删除此元素
							for (var j = 0; j < this.selDistObj.length; j++) {
								var id = this.selDistObj[j].teachingClassesId;
								if (selId == id) {
									this.selDistObj.splice(j, 1);
									record.check = true;
									break;
								}
							}
						}
					}else{
						for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
							var record = this.records[k];
							var selId = record.teachingClassesId, flag = false;
							//判断元素在之前元素里面是否已经存在，如果存在则删除此元素
							for (var j = 0; j < this.selDistObj.length; j++) {
								var id = this.selDistObj[j].teachingClassesId;
								if (selId == id) {
									flag = true;
								}
							}
							if(!flag){
								this.selDistObj.push(record);
							}
						}
					}
					this.showInvertSelDistList(this.records);
				}
			},

			//反选
			invertCheckAll: function () {
				this.checkAllRecord = false;
				if(this.invertCheckRecord){//反选为true
					this.cloneSelDistObj = angular.copy(this.selDistObj);
					for(var i = 0, len = this.records.length; i < len; i++){
						var temp = this.records[i];
						temp.check = !temp.check;
					}
					this.showInvertSelDistList(this.records);
				}else{//反选为false
					this.addCheckProperty(this.records);
					this.showSelDistList(this.records);
				}
			},

			/**
			 * 监控选择的类型
			 */
			monitorType: function (type) {
				this.selDistObj = [];
				this.page.pageNumber = 1;
				this.checkAllRecord = false;
				this.invertCheckRecord = false;
				if (type == '按学校') {
					this.getSchool();
				} else if (type == '按院系') {
					this.getCollege();
				} else if (type == '按专业') {
					this.getMajor();
				} else if (type == '按行政班') {
					this.getClasses();
				} else if (type == '按班课') {
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
				var isEnd = $state.params.type; //判断是否结束
				this.isEnd = isEnd;
				this.id = $state.params.id;
				if(isEnd == "end"){
					$("#comp").tab("show");
					this.switchType('complete');
				}else{
					if (this.id == 1) { // id = 1 已经分配列表 0 未分配列表
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
		$scope.$on("$destroy", function() { //路由切换时结束定时器
			$interval.cancel($scope.distributeListFn.intervalResult);

		})
	});