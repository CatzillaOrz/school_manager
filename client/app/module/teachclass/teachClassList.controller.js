/**
 * 教学班管理列表
 */
'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassListCtrl', function ($scope,$state, TeachClassService, AuthService, messageService) {
		$scope.teachClassListFn = {
			//教学班列表
			teachClassList: [],
			//当前操作的教学班
			currentTeachClass: {},
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
            allCheck:function(){
			    var _this = this;
                _this.allChedked = !_this.allChedked;
			  if(_this.allChedked){
                    angular.forEach(_this.teachClassList,function(item,index){
                        item.checked = true;
                    })
              }else{
                  angular.forEach(_this.teachClassList,function(item,index){
                      item.checked = false;
                  })
              }
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
						that.page = data.page;
						that.page.pageNumber += that.page.pageNumber;
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
						messageService.openMsg("教学班删除失败！");
					})
			},
			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentTeachClass = entity;
				messageService.getMsg("您确定要删除此教学班吗？", that.deleteTeachClass)
			},
			init: function () {
				this.getTeachClassList();
			}
		};
		$scope.teachClassListFn.init();
	});
