/**
 * Created by Administrator on 2017/6/23.
 * 评教问卷新增，修改页面
 */
angular.module('dleduWebApp')
	.controller('EvaQuesModCtrl', function ($scope, $state, AuthService, EduManService, messageService, $filter) {
		$scope.evaQuesModFn={
			isEditOrAdd: false, //true是编辑 false是新增
			//问卷信息
			record: null,
			id: $state.params.id,
			params: {
				name: '',
				totalScore: '',
				endDate: '',
				questions: []
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
						that.params.endDate = that.params.endDate.substring(0, 10);
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
				this.quesLists.splice($index, 1);
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
				//this.params.endDate = $filter('date')(this.params.endDate, 'yyyy-MM-dd hh:mm:ss');
				if(this.params.questions.length == 0){
					messageService.openMsg("请添加题目!");
					return;
				}
				var allScore = 0;
				for(var j = 0; j < questions.length; j++){
					allScore += parseInt(questions[j].score);
					questions[j].no = j+1;
				}
				if(allScore != this.params.totalScore){
					messageService.openMsg("题目总分和问卷总分不相等!");
					return;
				}
				if($state.params.id){
					var cloneParams = angular.copy(params);
					cloneParams.endDate = cloneParams.endDate + ' 23:59:59';
					EduManService.updateEvaQues(cloneParams).$promise
						.then(function (data) {
							if(data.trueMSG){
								messageService.openMsg("修改成功!");
								$state.go("evaquestion");
							}else{
								messageService.openMsg(data.message);
							}
						})
						.catch(function (error) {

						})
				}else{
					var cloneParams = angular.copy(params);
					cloneParams.endDate = cloneParams.endDate + ' 23:59:59';
					EduManService.addEvaQues(cloneParams).$promise
						.then(function (data) {
							if(data.trueMSG){
								messageService.openMsg("新增成功!");
								$state.go("evaquestion");
							}else{
								messageService.openMsg(data.message);
							}
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