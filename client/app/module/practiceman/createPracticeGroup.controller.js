/**
 * Created by Administrator on 2017/6/22.
 * 创建实践小组
 */
angular.module('dleduWebApp')
	.controller('CreatePracticeGroupCtrl', function ($scope, $state, $timeout, AuthService, messageService, PracticeManService,
													 CommonService, TeacherService, StudentService, TeachClassService, Select2LoadOptionsService) {
		$scope.handleFn = {
			//企业导师记录id
			id: '',
			//导师账号id
			tutorId: '',
			//实践小组信息
			practiceGroupInfo: null,
			//是否是编辑
			isEidt: false,
			//提示title
			title: "新建实践小组",
			//提示
			prompt: "填写以下信息以建立实践小组",
			//操作标识
			handle: "create",
			//添加步骤
			steps: [
				{title: '选择教师'},
				{title: '选择学生'},
				{title: '创建实践小组'}
			],
			//当前步骤
			step: 1,
			//参数
			params: {
				classOrStudents: 20,
				startDate: '',
				endDate: '',
				studentIds: [],
				studentsCount: 0,
				teacherIds: [],
				teacherNames: "",
				code: "",
				userId: AuthService.getUser().id,
				id: 0,
				name: ""
			},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			//学院下拉列表数据
			collegeDropList: [],
			//班级下拉列表数据
			classDropList: [],
			//学院下拉搜索参数 查老师
			searchParams: {
				orgId: AuthService.getUser().orgId,
				name: "",
				collegeId: ""
			},
			//班级下拉搜素参数 查学生
			searchStudentParams: {
				orgId: AuthService.getUser().orgId,
				name: "",
				classesId: ""
			},
			//教师列表
			teacherList: [],
			//选择老师数据
			selectTeacherList: [],
			//学生列表
			studentList: [],
			//选择的学生
			selectStudentList: [],
			//选择的班级列表
			selectClassesList: [],
			//选择的班级id
			selectClassesId: "",

			//学院下拉搜素
			selectCollege2Options: function () {
				var _this = this;
				return {
					placeholder: {
						id: '-1', // the value of the option
						text: '按班级筛选'
					},
					allowClear: true,
					ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList", {
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: 100
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
			//班级下拉列表配置
			select2ClassOptions: function () {
				var that = this;
				return {
					ajax: {
						url: "api/class/getClassDropListOrg",
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
							return {
								results: data.data,
								pagination: {
									more: (params.page * 30) < data.total_count
								}
							};
						},
						cache: true
					},
					allowClear: true,
					placeholder: {
						id: '-1', // the value of the option
						text: '按班级筛选'
					},
					templateResult: function (data) {
						if (data.id === '') { // adjust for custom placeholder values
							return 'Custom styled placeholder text';
							that.classDropList = [];
						}
						that.classDropList.push(data);
						return data.name;
					}
				}
			},

			complete: false,


			//获取学校老师
			getSimpleTeachers: function () {
				var _this = this;
				var params = _this.searchParams;
				params.pageSize = 20;
				TeacherService.getSimpleTeachers(params).$promise
					.then(function (data) {
						_this.teacherList = data.data;
						if(_this.practiceGroupInfo){
							_this.selectTeacherList.splice(0, 0, {id: _this.practiceGroupInfo.teacherId, name:
							_this.practiceGroupInfo.teacherName, jobNumber: _this.practiceGroupInfo.teacherJobNumer,
								collegeName: _this.practiceGroupInfo.collegeName});
						}
					})
					.catch(function (error) {

					})
			},

			//获取导师
			getTutor: function () {
				var _this = this;
				var params = _this.searchParams;
				PracticeManService.getEntTutorList(params).$promise
					.then(function (data) {
						if(_this.id != ''){
							_this.addSelTutor(_this.teacherList);
						}
					})
					.catch(function (error) {

					})
			},

			//获取学生
			getSimpleStudents: function () {
				var _this = this;
				var params = _this.searchStudentParams;
				params.pageSize = 20;
				StudentService.getSimpleStudents(params).$promise
					.then(function (data) {
						_this.studentList = data.data;
						if(_this.practiceGroupInfo){
							angular.forEach(_this.practiceGroupInfo.studentDTOList, function(item){
								_this.selectStudentList.splice(0, 0, item);
							});
						}
					})
					.catch(function (error) {

					})
			},
			//下一步
			nextStep: function () {
				this.step = this.step + 1;
			},
			//上一步
			preStep: function () {
				var _this = this;
				if (_this.step3Tooggle != "select") {
					_this.step3Tooggle = "select";

					return;
				}
				this.step = this.step - 1;
			},
			//选择的老师
			selectTeacher: function (entity) {
				if(this.selectTeacherList.length >= 1){
					messageService.openMsg("只能选择一个本校教师！");
					return;
				}
				var _this = this;
				var temp = _.filter(_this.selectTeacherList, function (value) {
					if (entity.id == value.id) {
						return value;
					}
				});
				if (temp.length == 0) {
					_this.selectTeacherList.splice(0, 0, entity);
				}
			},
			//移除老师
			removeSelectedTeacher: function (entity) {
				var _this = this;
				_this.selectTeacherList = _.filter(_this.selectTeacherList, function (value) {
					if (entity.id != value.id) {
						return value;
					}
				});
			},
			//选择学生
			selectStudent: function (entity) {
				var _this = this;
				var temp = _.filter(_this.selectStudentList, function (value) {
					if (entity.id == value.id) {
						return value;
					}
				});
				if (temp.length == 0) {
					_this.selectStudentList.splice(0, 0, entity);
				}
			},
			//移除学生
			removeSelectedStudent: function (entity) {
				var _this = this;
				_this.selectStudentList = _.filter(_this.selectStudentList, function (value) {
					if (entity.id != value.id) {
						return value;
					}
				});
			},
			//第三步 中的两种选择的切换
			step3Select: function (str) {
				var _this = this;
				if (str == "class") {
					_this.params.classesIds.push("0.default");
					_this.selectStudentList = [];
				} else if (str == "students") {

					_this.params.classesIds = [];
				}
				this.step3Tooggle = str;
			},
			//获取选择的选择的老师id
			getSelectTeacherIdList: function () {
				var result = [];
				angular.forEach(this.selectTeacherList, function (data) {
					result.push(data.id)
				})
				return result;

			},
			//获取选择的学生id
			getSelectStudentIdList: function () {
				var result = [];
				angular.forEach(this.selectStudentList, function (data) {
					result.push(data.id)
				})
				return result;

			},
			//保存实践小组
			addTeachClass: function () {
				var _this = this;
				var params = _this.params;
				params.classOrStudents = 20;
				params.studentIds = _this.getSelectStudentIdList();
				params.teacherIds = _this.getSelectTeacherIdList();
				var entity = {};
				entity.corporateMentorsId = this.id;
				entity.teacherId = params.teacherIds[0];
				entity.groupName = params.name;
				entity.studentIds = params.studentIds;
				entity.startDate = params.startDate;
				entity.endDate = params.endDate;
				if(this.validateDate(entity.startDate, entity.endDate)){
					messageService.openMsg("开始日期不能大于等于结束日期！");
					return;
				}
				if(this.isEidt){
					entity.id = this.practiceGroupInfo.trainingGroupId;
					PracticeManService.updatePracticeGroup(entity).$promise
						.then(function (data) {
							messageService.openMsg("编辑实践小组成功！");
							$state.go("practicegroupman");
						})
						.catch(function (error) {
							var re = /[^\u4e00-\u9fa5]/;
							if (re.test(error.data)) {
								messageService.openMsg("编辑实践小组失败！");

							} else {
								messageService.openMsg(error.data);

							}
						})
				}else{
					PracticeManService.addPracticeGroup(entity).$promise
						.then(function (data) {
							messageService.openMsg("创建实践小组成功！");
							$state.go("practicegroupman");
						})
						.catch(function (error) {
							var re = /[^\u4e00-\u9fa5]/;
							if (re.test(error.data)) {
								messageService.openMsg("创建实践小组失败！");

							} else {
								messageService.openMsg(error.data);

							}
						})
				}
			},

			//校验日期
			validateDate: function(startDate, endDate){
				var resultFlag = false;
				if(new Date(startDate + ' 00:00:00').getTime() >= new Date(endDate + ' 00:00:00').getTime()){
					resultFlag = true;
				}
				return resultFlag;
			},

			//第三步的表单验证
			validateStep3: function () {
				var _this = this;
				if (_this.selectStudentList.length == 0) {
					/*if (_this.params.classesIds[0] && _this.params.classesIds[0] == '0.default') {
						return false
					} else if (!_this.params.classesIds[0]) {
						return false
					} else if (_this.params.classesIds[0] && _this.params.classesIds[0] != '0.default') {
						return true;
					}*/
				} else {
					return true;
				}
			},

			//提交
			submit: function () {
				var that = this;
				that.addTeachClass();
			},

			/**
			 * 获取实训小组信息
			 * @param id
			 */
			getPracticeGroupInfo: function(id){
				var that = this;
				PracticeManService.getPracticeGroupInfo({id: id}).$promise
					.then(function (data) {
						that.practiceGroupInfo = data;
						that.isEidt = true;
						that.params.name = that.practiceGroupInfo.trainingGroupName;
						that.params.startDate = that.practiceGroupInfo.starDate;
						that.params.endDate = that.practiceGroupInfo.endDate;
						that.getSimpleTeachers();
						that.getSimpleStudents();
					})
					.catch(function (error) {
						that.getSimpleTeachers();
						that.getSimpleStudents();
					})
			},

			init: function () {
				var that = this;
				this.id = $state.params.id;
				this.getPracticeGroupInfo(this.id);
				this.tutorId = $state.params.tutorId;
				that.handle = $state.current.ncyBreadcrumbLabel;
				that.title = that.handle;
				that.prompt = $state.current.data.prompt;
				that.completeMSG = $state.current.data.completeMSG;
				//that.getSimpleTeachers();
				//that.getSimpleStudents();
			}
		};
		$scope.handleFn.init();

		$timeout(function () {
			//$scope.handleFn.init();
			//学院变动自动查询老师
			$scope.$watch('handleFn.searchParams.collegeId', function(newValue, oldValue) {
				if (newValue!=oldValue){
					$scope.handleFn.getSimpleTeachers();
				}
			});
			//班级变动 自动查询学生
			$scope.$watch('handleFn.searchStudentParams.classesId', function(newValue, oldValue) {
				if (newValue!=oldValue){
					$scope.handleFn.getSimpleStudents();
				}
			});
		})
	});