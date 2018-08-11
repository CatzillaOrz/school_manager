/**
 * Created by Administrator on 2017/6/21.
 * 素质学分
 */
angular.module('dleduWebApp')
	.controller('qualityCreditListCtrl', function ($scope, $timeout, $state, AuthService, RoleAuthService,
	                                               ngDialog, QualityCreditService, messageService) {
		var TabBlock = {
			s: {
				animLen: 200
			},

			init: function () {
				TabBlock.bindUIActions();
				TabBlock.hideInactive();
			},

			bindUIActions: function () {
				$('.tabBlock-tabs').on('click', '.tabBlock-tab', function () {
					TabBlock.switchTowTab($(this));
				});
			},

			hideInactive: function () {
				var $tabBlocks = $('.tabBlock');

				$tabBlocks.each(function (i) {
					var
						$tabBlock = $($tabBlocks[i]),
						$panes = $tabBlock.find('.tab-pane'),
						$activeTab = $tabBlock.find('.tabBlock-tab.active');

					$panes.hide();
					$($panes[$activeTab.index()]).show();
				});
			},

			switchTowTab: function ($tab) {
				var $context = $tab.closest('.tabBlock');

				if (!$tab.hasClass('active')) {
					$tab.siblings().removeClass('active');
					$tab.addClass('active');

					TabBlock.showPane($tab.index(), $context);
				}
			},

			showPane: function (i, $context) {
				var $panes = $context.find('.tab-pane');

				// Normally I'd frown at using jQuery over CSS animations, but we can't transition between unspecified variable heights, right? If you know a better way, I'd love a read it in the comments or on Twitter @johndjameson
				$panes.slideUp(TabBlock.s.animLen);
				$($panes[i]).slideDown(TabBlock.s.animLen);
			}
		};

		$scope.qualityCreditListFn={
			//列表记录
			records: [],
			record: null,
			tab: 'list', // list 信息员反馈   template模板
			//当前操作的class
			currentRecord: {},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			params: {
				teacherName: '', //辅导员名称
				className: '' //班级名称
			},

			//控制按钮权限
			isUseAuth: function(type){
				return RoleAuthService.isUseAuthority(type);
			},

			/**
			 * 切换tab
			 */
			switchTab: function(type){
				this.tab = type;
				this.query();
			},

			// 获取反馈信息列表
			getQualityCreditReportList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					teacherName: that.params.className,
					className: that.params.className
				};
				QualityCreditService.getQualityCreditReportList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},
			// 获取反馈信息列表
			getQualityCreditTemList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
				};
				QualityCreditService.getQualityCreditTemList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},
			//根据名称查询
			query: function () {
				this.page.pageNumber = 1;
				if(this.tab == 'list'){
					this.getQualityCreditReportList();
				}else{
					this.getQualityCreditTemList();
				}

			},

			//导出
			export: function(id){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					teacherName: that.params.teacherName,
					courseName: that.params.courseName,
					supName: that.params.supName,
				};
				params.pageNumber = type == 'part' ? that.page.pageNumber : 1;
				params.pageSize = type == 'part' ? that.page.pageSize : 999999999;

				QualityCreditService.exportTea(params).success(function(data) {
					if(data.success){
						window.location.href = data.message+'?attname=督导反馈.xlsx';
					}else{
						messageService.openMsg("导出失败！");
					}
				}).catch(function (e) {
					messageService.openMsg(CommonService.exceptionPrompt(error, "导出失败！"));
				});
			},

			//导出
			exportAll: function(){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					teacherName: that.params.teacherName,
					courseName: that.params.courseName,
					stuName: that.params.stuName,
				};
				params.pageNumber = type == 'part' ? that.page.pageNumber : 1;
				params.pageSize = type == 'part' ? that.page.pageSize : 999999999;

				QualityCreditService.exportStu(params).success(function(data) {
					if(data.success){
						window.location.href = data.message+'?attname=信息员反馈.xlsx';
					}else{
						messageService.openMsg("导出失败！");
					}
				}).catch(function (e) {
					messageService.openMsg(CommonService.exceptionPrompt(error, "导出失败！"));
				});
			},

			/**
			 * 删除记录
			 * @param id
			 */
			delRecord: function(id){
				var that = this;
				QualityCreditService.delTemplate({templetId: id}).$promise
					.then(function (data) {
						if(data.success){
							messageService.openMsg("删除成功!");
							that.query();
						}else{
							messageService.openMsg(data.message);
						}
					})
					.catch(function (error) {

					})
			},

			init: function () {
				var type = $state.params.tab;
				if(type){
					this.tab = type;
				}
				this.getQualityCreditReportList();
				$timeout(function(){
					TabBlock.init();
				});

			}
		};
		$scope.qualityCreditListFn.init();

	});