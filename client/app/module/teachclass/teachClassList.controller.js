/**
 * 教学班管理列表
 */
'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassListCtrl', function ($scope,$state, TeachClassService, AuthService, messageService,CommonService,
												Upload, UploadService, ImpBatchService, ngDialog) {
		$scope.teachClassListFn = {
			//教学班列表
			teachClassList: [],
			//当前操作的教学班
			currentTeachClass: {},
			myFile: null, //选择的文件对象
			errorInfos: [], //返回的错误信息
			impType: '', //导入类型，按班级还是学生
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
            allChedked:false,
			params: {
				name: ""
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
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
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
				messageService.getMsg("您确定要删除此教学班吗？", that.deleteTeachClass)
			},

			/**
			 * 弹出批量导入弹出框
			 */
			openImpBatch: function(type){
				this.impType = type;
				var params = {
					template: 'importDialog',
					width: 600,
					scope: $scope,
				};
				ImpBatchService.openImpBatch(params);
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
				if (params.file) {
					Upload.upload({
						url: '/api/upload/impBatch',
						method: 'POST',
						data: params
					}).then(function(res){
						if(res.status === 200){
							that.errorInfos = res.data;
							if(!that.errorInfos.code ||  that.errorInfos.code== ''){
								ngDialog.close();
								messageService.openMsg("导入成功！");
							}else{
								ngDialog.close();
								ngDialog.open(dialogParams);
							}
						}
					},function(res){
						messageService.openMsg("导入失败!");
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

			init: function () {
				this.getTeachClassList();
			}
		};
		$scope.teachClassListFn.init();
	});
