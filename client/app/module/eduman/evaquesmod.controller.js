/**
 * Created by Administrator on 2017/6/23.
 * 评教问卷新增，修改页面
 */
angular.module('dleduWebApp')
	.controller('EvaQuesModCtrl', function ($scope, $state, AuthService, EduManService, messageService) {
		$scope.evaQuesModFn={
			isEditOrAdd: false, //true是编辑 false是新增
			//问卷信息
			record: null,
			id: $state.params.id,
			params: {
				name: '',
				totalScore: '',
				questions: [],
				endTime: new Date('2017-07-05')
			},

			quesLists: [],//临时保存题目
			question:{
				name: '',
				score: 0,
			},

			//时间组件配置
			datePick: {
				inlineOptions: {
					//customClass: getDayClass,
					minDate: new Date(),
					showWeeks: true
				},
				dateOptions: {
					//dateDisabled: $scope.periodHandlerFn.datePick.disabled,
					formatYear: 'yy',
					maxDate: new Date(2020, 5, 22),
					minDate: new Date(),
					startingDay: 1
				},
				disabled: function (data) {
					var date = data.date,
						mode = data.mode;
					return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
				},
				toggleMin: function () {
					this.inlineOptions.minDate = this.inlineOptions.minDate ? null : new Date();
					this.dateOptions.minDate = this.inlineOptions.minDate;
				},
			},

			// 获取评教问卷信息
			getEvaQuesInfo: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: that.id
				};
				EduManService.getEvaQuesInfo(params).$promise
					.then(function (data) {
						that.params = data;
						that.quesLists = that.params.questions;
					})
					.catch(function (error) {

					})
			},

			//点击加号
			addQues: function($index){
				this.quesLists.push({name: '', score: 0});
			},

			//点击删除
			delQues: function($index){
				this.quesLists.splice($index, 1)
			},

			/*//点击上移
			upQues: function($index){
				var temp = this.quesLists[$index];
				this.quesLists[$index] = this.quesLists[$index - 1];
				this.quesLists[$index - 1] = temp;
			},

			//点击下移
			downQues: function($index){
				var temp = this.quesLists[$index];
				this.quesLists[$index] = this.quesLists[$index + 1];
				this.quesLists[$index + 1] = temp;
			},*/

			//保存题目
			saveQues: function(){
				var questions = this.quesLists;
				this.params.questions = questions;
				var params = this.params;
				alert();
				if(this.params.questions.length == 0){
					messageService.openMsg("请添加题目!");
				}
				return;
				if($state.params.id){
					EduManService.updateEvaQues(params).$promise
						.then(function (data) {
							messageService.openMsg("修改成功");
						})
						.catch(function (error) {

						})
				}else{
					EduManService.addEvaQues(params).$promise
						.then(function (data) {
							messageService.openMsg("新增成功");
						})
						.catch(function (error) {

						})
				}
			},

			//保存文件
			submit: function(){
				this.saveQues();
			},

			init: function () {
				this.datePick.toggleMin();
				if($state.params.id){
					this.isEditOrAdd = true;
					this.getEvaQuesInfo($state.params.id);
				}else{
					this.quesLists.push({name: '', score: 0});
				}
			}
		};
		$scope.evaQuesModFn.init();
	});