/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('TeachClassTrendCtr', function ($scope, $state, EduManService, tempStorageService,messageService) {
        $scope.config = {
            // title: 'Line Chart',
            // subtitle: 'Line Chart Subtitle',
            debug: true,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            stack: false,
            tooltip:{
                formatter: '出勤率：{c} %'
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                axisLine: {show: true},
            },

        };

        $scope.teachClassTrendFn = {
            selected:{},
            trendList:[],
            trendCharts:[],
            studentsCount:"",
            showLine:true,
            params: {
                semesterId: null,
                classId: null,
                courseName: null,
                teacherName: null
            },
            //查询教学班趋势数据
            teachClassTrend:function () {
                var _this=this;
                var params=_this.params;
                EduManService.teachClassTrend(params).$promise
                    .then(function (data) {
                        _this.trendList = data.data;
                        var line=_this.getChartData(_this.trendList);
                        _this.trendCharts=[];
                        _this.studentsCount=data.personNum;
                        if(_this.trendList.length!=0){
                            _this.trendCharts.push(line);
                        }else {
                            _this.trendCharts=[];
                        }

                    })
                    .catch(function (error) {

                    })
            },
            //教学班趋势数据转换
            getChartData:function (list) {
                var dataPoints=[];
                angular.forEach(list,function (data) {
                    var temp={
                        x:"第"+data.week+"周",
                        y:data.proportion.replace("%",'')

                    }
                    dataPoints.push(temp)
                });
                var line={
                    name: '教学周考勤趋势',
                    datapoints:dataPoints
                }


                return line;
            },
            //列表折线图切换
            viewToggle:function () {
                this.showLine=!this.showLine;
            },
            //教学班考勤记录导出
            teachClassAttendExportTend:function () {
                var _this = this;
                var params = {
                    classId: _this.params.classId,
                    semesterId: _this.params.semesterId,
                    courseName: _this.params.courseName,
                    teacherName: _this.params.teacherName,
                };
                EduManService.teachClassAttendExportTend(params).$promise
                    .then(function (data) {
                        if(data.message){
                            location.href = data.message;
                        }else {
                            messageService.openMsg("生成导出文件失败！");
                        }
                    })
                    .catch(function (error) {
                        messageService.openMsg("生成导出文件失败！");
                    })
            },
            //初始化
            init: function () {
                var _this = this;
                _this.params.classId = $state.params.id;
                _this.params.semesterId=$state.params.semesterId;
                _this.selected = tempStorageService.getter();
                _this.teachClassTrend();

            },
        };
        $scope.teachClassTrendFn.init();

    });