/**
 * Created by Administrator on 2017/6/21.
 * 素质学分
 */
angular.module('dleduWebApp')
	.controller('qualityCreditListCtrl', function ($scope, $timeout, $state, AuthService, RoleAuthService,
	                                               ngDialog, QualityCreditService, messageService) {
		var TabBlock = {
			s: {
				animLen: 100
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
			templates: [],  //模板列表

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
				className: '', //班级名称
				templateId: "" // 模板id
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
				this.records = [];
				this.query();
			},

			// 获取反馈信息列表
			getQualityCreditReportList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					teacherName: that.params.teacherName,
					className: that.params.className,
					templetId: that.params.templateId
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
						that.templates = data.data;
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

			/**
			 *模板列表
			 */
			getTemplateList: function () {
				var _this = this;
				return {
					placeholder: {
						id: -1, // the value of the option
						text: '全部'
					},
					allowClear: true,
					ajax: {
						url: "api/qualitycredit/getQualityCreditTemList",
						dataType: 'json',
						//delay: 250,
						data: function (query) {
							var params = {
								orgId: AuthService.getUser().orgId,
								pageNumber: 1,
								pageSize: 100,
							}
							//params.name = query.term;
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
						_this.templates.push(data);
						return data.name;
					}

				}
			},

			//导出
			export: function(record){
				var that = this;
				QualityCreditService.exportReportById({reportId: record.id}).$promise
					.then(function (data) {
						if(data.success){
							window.location.href = data.message+'?attname=' + data.fileName;
						}else{
							messageService.openMsg("导出失败！");
						}
					})
					.catch(function (error) {

					})

			},

			//导出当前模板的所有数据
			exportAll: function(){
				var that = this;
				if(that.params.templateId == -1 || that.params.templateId == ""){
					messageService.openMsg("请先选择引用模板！");
					return;
				}
				var params = {
					orgId: AuthService.getUser().orgId,
					teacherName: that.params.teacherName,
					className: that.params.className,
					templetId: that.params.templateId
				};
				QualityCreditService.exportReport(params).$promise
					.then(function (data) {
						if(data.success){
							window.location.href = data.message+'?attname=' + data.fileName;
						}else{
							messageService.openMsg("导出失败！");
						}
					})
					.catch(function (error) {

					})
			},

			//删除提示
			deletePrompt: function (entity) {
				var that=this;
				that.record = entity;
				messageService.getMsg("您确定要删除此模板吗？", that.delRecord)
			},

			/**
			 * 删除记录
			 * @param id
			 */
			delRecord: function(){
				var that = $scope.qualityCreditListFn;
				QualityCreditService.delTemplate({templetId: that.record.id}).$promise
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
				var type = $state.params.type;
				if(type){
					this.tab = 'template';
				}else{
					this.getQualityCreditReportList();
				}
				this.getQualityCreditTemList();
				$timeout(function(){
					TabBlock.init();
				});

			}
		};
		$scope.qualityCreditListFn.init();

	});