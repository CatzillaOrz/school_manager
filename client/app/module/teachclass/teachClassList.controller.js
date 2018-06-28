/**
 * 教学班管理列表
 */
'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassListCtrl', function ($scope,$state, TeachClassService, AuthService, messageService,CommonService,
												Upload, UploadService, ImpBatchService, ngDialog, RoleAuthService, tempStorageService,
												SchoolYearService, EduManService) {
		$scope.teachClassListFn = {
			//教学班列表
			teachClassList: [],
			//当前操作的教学班
			currentTeachClass: {},
			myFile: null, //选择的文件对象
			errorInfos: null, //返回的错误信息
			impType: '', //导入类型，按班级还是学生
            schoolYearDropList:[],
			//当前登录用户id
			currentId: AuthService.getUser().id,
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
            allChedked:false,
			params: {
				name: "",
				semesterId:"",
				mustOrOption:"",
				courseName:"",
                teacherName:""
			},
			reset : function(){
				this.params.name = '';
				this.params.courseName = '';
				this.params.teacherName = '';
			},
			//控制按钮权限
			isUseAuth: function(type){
				return RoleAuthService.isUseAuthority(type);
			},

            select2SemesterOptions: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: "", // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
                    ajax: {
                        url: "api/schoolyear/getSemesterList",
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
					templateResult: function (data) {
						if (data.id === '') { // adjust for custom placeholder values
							return 'Custom styled placeholder text';
						}
						_this.schoolYearDropList.push(data);
						return data.name;
					}

                }
            },

			getTermList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 0,
					pageSize: 1000
				}
				SchoolYearService.getSemesterList(params).$promise
					.then(function (data) {
						that.schoolYearDropList =data.data;
					})
					.catch(function (error) {
					})
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
            allCheck:function(m){
			    var _this = this;
                //_this.allChedked = !_this.allChedked;
                angular.forEach(_this.teachClassList,function (item) {
                    if(m===true){
                        item.checked = true;
                    }else {
                        item.checked = false;
                    }
                })
              // if(entity){
              //       angular.forEach(_this.teachClassList,function(item,index){
              //           item.checked = true;
              //       })
              // }else{
              //     angular.forEach(_this.teachClassList,function(item,index){
              //         item.checked = false;
              //     })
              // }

            },
            schedules:function(){
                var _this = this;
                var arr= [];
                angular.forEach(_this.teachClassList,function(item,index){
                    if(item.checked){
                        var newObj = {};
                        newObj.id = item.id;
                        newObj.name = item.name;
                        newObj.semesterId = item.semesterId;
                        arr.push(newObj);
                    }
                });
                if(arr.length >0){
                    $state.go('agendaWeeks',{ids:angular.toJson(arr)});
                }else{
                    messageService.openMsg("请先勾选需要排课的教学班。");
                }
            },
			// 获取教学班列表
			getTeachClassList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 1,
					pageSize: that.page.pageSize
				};
				params.semesterId = that.params.semesterId;
                params.mustOrOption = that.params.mustOrOption;
                params.courseName = that.params.courseName;
                params.teacherName = that.params.teacherName;
                params.name = that.params.name;
				TeachClassService.getTeachClassList(params).$promise
					.then(function (data) {
						that.teachClassList = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},
			//根据名称查询
			findTeachClassByPage: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
                params.semesterId = that.params.semesterId;
                params.mustOrOption = that.params.mustOrOption;
                params.courseName = that.params.courseName;
                params.teacherName = that.params.teacherName;
                params.name = that.params.name;
				TeachClassService.getTeachClassList(params).$promise
					.then(function (data) {
						that.teachClassList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
					})
					.catch(function (error) {

					})
			},
			//删除
			deleteTeachClass: function () {
				var _this = $scope.teachClassListFn;
				var params = {
					id: _this.currentTeachClass.id,
					userId: AuthService.getUser().id,
				}
				TeachClassService.deleteTeachClass(params).$promise
					.then(function (data) {
						messageService.openMsg("教学班删除成功！");
						_this.getTeachClassList();
					})
					.catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"教学班删除失败！"));
					})
			},
			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentTeachClass = entity;
				messageService.getMsg("课表、考勤等点点相关的业务数据，以及开卷相关业务数据将被清除,您确定仍要删除此教学班吗？", that.deleteTeachClass)
			},

			getCurrentSemester: function () {
				var that = this;
				var _params = {
					orgId: AuthService.getUser().orgId
				};
				EduManService.getCurrentSemester(_params).$promise
					.then(function (data) {
						that.params.semesterId = data.id;
						that.schoolYearDropList = [data];
					})
					.catch(function (error) {

					})
			},

			/**
			 * 弹出批量导入弹出框
			 * type 按必须导入还是选项导入
			 * openType 是否重新打开页面
			 */
			openImpBatch: function(type, openType){
				var that = this;
				this.impType = type;
				var params = {
					template: 'importDialog',
					width: 600,
					scope: $scope,
				};
				if(openType == 'reset'){
					ngDialog.close();
					ImpBatchService.openImpBatch(params);
					return;
				}
				CommonService.addLoading(true, 'all');
				if(this.impType == 'optional'){
					TeachClassService.getImpOptionResult({orgId: AuthService.getUser().orgId, userId: AuthService.getUser().id}).$promise
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
				}else{
					TeachClassService.getImpMustResult({orgId: AuthService.getUser().orgId, userId: AuthService.getUser().id}).$promise
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
				}

			},

			/**
			 * 弹出批量导入弹出框
			 */
			importantBatch: function(file){
				var that = this;
				var type = this.impType == 'compulsory' ? 'compulsory' : 'optional';
				var params = {
					file: file,
					orgId: AuthService.getUser().orgId,
					userId: AuthService.getUser().id,
					uploadType: type
				};
				var dialogParams = {
					template: 'importResultDialog',
					width: 600,
					scope: $scope
				};
				if(!ImpBatchService.selected([params.file])){
					return;
				}
				CommonService.addLoading(true, 'all');
				if (params.file) {
					Upload.upload({
						url: '/api/upload/impBatch',
						method: 'POST',
						data: params
					}).then(function(res){
						if(res.status === 200){
							CommonService.addLoading(false, 'all');
							that.errorInfos = res.data;
							if(!that.errorInfos.code ||  that.errorInfos.code== ''){
								that.getTeachClassList();
								ngDialog.close();
								messageService.openMsg("上传成功！");
							}else{
								ngDialog.close();
								ngDialog.open(dialogParams);
							}
						}
					},function(res){
						CommonService.addLoading(false, 'all');
						messageService.openMsg("上传失败!");
					})
				}else {
					messageService.openMsg("请选择excel文件！");
					return;
				}
			},

			//选择文件事件
			selected: function($newFiles){
				ImpBatchService.selected($newFiles);
			},

			/**
			 * 下载模板
			 */
			downLoad: function(){
				var type = this.impType == 'compulsory' ? 'compulsory' : 'optional';
				ImpBatchService.downLoad(type);
			},

			/**
			 * 导出
			 */
			exportData: function(){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
				};
				params.semesterId = that.params.semesterId;
				params.mustOrOption = that.params.mustOrOption;
				params.courseName = that.params.courseName;
				params.teacherName = that.params.teacherName;
				params.name = that.params.name;
				params.pageNumber = 1;
				params.pageSize = 9999999;
				TeachClassService.exportTeachClass(params).success(function(data) {
					CommonService.saveAs(data, '教学班信息');
				}).catch(function (e) {

				});
			},


			init: function () {
				//this.getTermList();
				this.getTeachClassList();
				this.getCurrentSemester();
			}
		};

		$scope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
			if(fromState.name == "teachclasslist" && (toState.name == "teachClassDetail" || toState.name == "agendaWeek")){
				var params = $scope.teachClassListFn.params;
				//params.pageNumber = $scope.teachClassListFn.page.pageNumber;
				var key = fromState.name + toState.name;
				tempStorageService.setObject(key, params);
			}
		});
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			if(toState.name == "teachclasslist" && (fromState.name == "teachClassDetail" || fromState.name == "agendaWeek")){
				var key = toState.name + fromState.name;
				var params = tempStorageService.getObject(key);
				if(params){
					$scope.teachClassListFn.params = params;
					//$scope.teachClassListFn.page.pageNumber = params.pageNumber;
					tempStorageService.removeObject(key);
				}
				$scope.teachClassListFn.init();
			}else{
				//其他情况清空保存的值
				if(toState.name == "teachclasslist"){
					tempStorageService.removeObject("teachclasslist" + "teachClassDetail");
					tempStorageService.removeObject("teachclasslist" + "agendaWeek");
					$scope.teachClassListFn.init();
				}
			}
		});
	});
