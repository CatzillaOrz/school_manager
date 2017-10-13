'use strict';
angular.module('dleduWebApp')
    .controller('studentGeoCtl', function ($scope, $http,GeoService) {
        $scope.showLoading = false;
        function getClassList(){
            return [
                {
                    "className": "--",
                    "teacherName": "--",
                    "normal": '--',
                    "leave": '--',
                    "askForLeave": '--',
                    "classRate": "--",
                    classId:'chart_1'
                },
                {
                    "className": "--",
                    "teacherName": "--",
                    "normal": '--',
                    "leave": '--',
                    "askForLeave": '--',
                    "classRate": "--",
                    classId:'chart_2'
                },{
                    "className": "--",
                    "teacherName": "--",
                    "normal": '--',
                    "leave": '--',
                    "askForLeave": '--',
                    "classRate": "--",
                    classId:'chart_3'
                },{
                    "className": "--",
                    "teacherName": "--",
                    "normal": '--',
                    "leave": '--',
                    "askForLeave": '--',
                    "classRate": "--",
                    classId:'chart_4'
                },{
                    "className": "--",
                    "teacherName": "--",
                    "normal": '--',
                    "leave": '--',
                    "askForLeave": '--',
                    "classRate": "--",
                    classId:'chart_5'
                },{
                    "className": "--",
                    "teacherName": "--",
                    "normal": '--',
                    "leave": '--',
                    "askForLeave": '--',
                    "classRate": "--",
                    classId:'chart_6'
                },{
                    "className": "--",
                    "teacherName": "--",
                    "normal": '--',
                    "leave": '--',
                    "askForLeave": '--',
                    "classRate": "--",
                    classId:'chart_7'
                },{
                    "className": "--",
                    "teacherName": "--",
                    "normal": '--',
                    "leave": '--',
                    "askForLeave": '--',
                    "classRate": "--",
                    classId:'chart_8'
                }
            ];
        };
        $scope.allData = {
            classList:getClassList()
        }
        var imageList = [
            'image://../../assets/images/01.png',
            'image://../../assets/images/02.png',
            'image://../../assets/images/03.png',
            'image://../../assets/images/04.png',
            'image://../../assets/images/05.png',
            'image://../../assets/images/06.png',
            'image://../../assets/images/07.png',
            'image://../../assets/images/08.png'
        ]
        var eduChartConfig = {

            geoChart:function(data){
                var option = {
                    bmap: {
                        center: [data.lltudes[0][0], data.lltudes[0][1]],
                        zoom: 19,
                        roam: true,
                        enableMapClick: false,
                        mapStyle: {
                            'styleJson': [
                                {
                                    'featureType': 'water',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#486091'
                                    }
                                },
                                {
                                    'featureType': 'land',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#272732'
                                    }
                                },
                                {
                                    'featureType': 'highway',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#2f2f41'
                                    }
                                },
                                {
                                    'featureType': 'arterial',
                                    'elementType': 'geometry.stroke',
                                    'stylers': {
                                        'color': '#434768'
                                    }
                                },
                                {
                                    'featureType': 'local',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#25283e'
                                    }
                                },
                                {
                                    'featureType': 'railway',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#61647e'
                                    }
                                },
                                {
                                    'featureType': 'railway',
                                    'elementType': 'geometry.stroke',
                                    'stylers': {
                                        'color': '#111325'
                                    }
                                },
                                {
                                    'featureType': 'subway',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'lightness': -70
                                    }
                                },
                                {
                                    'featureType': 'building',
                                    'elementType': 'geometry.fill',
                                    'stylers': {
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'all',
                                    'elementType': 'labels.text.fill',
                                    'stylers': {
                                        'color': '#b9b3b3'
                                    }
                                },
                                {
                                    'featureType': 'all',
                                    'elementType': 'labels.text.stroke',
                                    'stylers': {
                                        'color': '#000000'
                                    }
                                },
                                {
                                    'featureType': 'building',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#58628d'
                                    }
                                },
                                {
                                    'featureType': 'green',
                                    'elementType': 'geometry',
                                    'stylers': {
                                        'color': '#3c6d46'
                                    }
                                },
                                {
                                    'featureType': 'boundary',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#a4904a'
                                    }
                                },
                                {
                                    'featureType': 'manmade',
                                    'elementType': 'all',
                                    'stylers': {
                                        'color': '#494d72'
                                    }
                                },
                                {
                                    'featureType': 'label',
                                    'elementType': 'all',
                                    'stylers': {
                                        'visibility': 'off'
                                    }
                                }
                            ]
                        }
                    },
                    series: _.map(data.lltudes,function(item){
                        return {
                            type: 'scatter',
                            coordinateSystem: 'bmap',
                            data: [item],
                            symbol:imageList[parseInt(8*Math.random())],
                            symbolSize: 40,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            itemStyle: {
                                normal: {
                                    color: '#7666ef'
                                }
                            }
                        }
                    })
                }
                return option;
            },
            chart:function(data){
                var option = {
                    grid:{
                        show:false,
                        right:'10%',
                        top:'15%',
                    },
                    xAxis: {
                        triggerEvent:true,
                        data: ['8:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00', '20:00-22:00'],
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel:{
                            interval:0,
                            rotate:30
                        },
                        axisTick:{
                            interval:0
                        }
                    },
                    yAxis: {
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    series: [{
                        name: 'bar1',
                        type: 'bar',
                        barWidth:10,
                        itemStyle: {
                            normal: {
                                color: '#3ec5f4'
                            }
                        },
                        data: [ data.time10.count10, data.time12.count12, data.time16.count16, data.time18.count18, data.time22.count22]
                    }, {
                        name: 'bar2',
                        type: 'bar',
                        barWidth:10,
                        itemStyle: {
                            normal: {
                                color: '#ff8340'
                            }
                        },
                        data: [data.time10.absenteeismCount10, data.time12.absenteeismCount12,data.time16.absenteeismCount16, data.time18.absenteeismCount18, data.time22.absenteeismCount22]
                    }]
                };
                return  option;
            },
            chart1:function(data){
                var option = {
                    grid: {
                        left: '3%',
                        right: '10%',
                        top: '17%',
                        height: 200, //设置grid高度
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'value',
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },


                    }],
                    yAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            interval: null
                        },
                        data: _.map(data,function(item){
                            return item.teacherName
                        }),
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        name: '流量',
                        type: 'bar',
                        barWidth: 15,
                        label: {
                            normal: {
                                show: true,
                                position: 'right'
                            }

                        },
                        itemStyle:{
                            normal:{
                                "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    "offset": 0,
                                    "color": "#02c1d4" // 0% 处的颜色
                                }, {
                                    "offset": 1,
                                    "color": "#1590e5" // 100% 处的颜色
                                }], false)
                            }
                        },
                        data: _.map(data,function(item){
                            return item.attendanceRate
                        }),
                    }]
                };
                return option;
            },
            chart2:function(data) {
                var schema = [
                    {name: 'date', index: 0, text: '总数'},
                    {name: 'AQIindex', index: 1, text: '正常'},
                    {name: 'PM25', index: 2, text: '迟到'},
                    {name: 'PM10', index: 3, text: '请假'},
                    {name: 'CO', index: 4, text: '旷课'},
                    {name: 'NO2', index: 5, text: '到课率(%)'},
                ];
                var lineStyle = {
                    normal: {
                        width: 2,
                        opacity: 1
                    }
                };
                var colors = ['#3366cc','#dc3912', '#ff9900', '#109618',
                    '#990099','#0099c6','#dd4477','#66aa00','#b82e2e',
                    '#994499','#22aa99','#aaaa11','#6633cc','#329262'
                    ,'#a9c413','#8b0707','#668d1c','#bea413','#0d4012'];

                var option = {
                    color: colors,
                    legend: {
                        bottom: 3,
                        data: _.map(data,function(item){
                            return item.collegeName
                        }),
                        itemGap: 10,
                        textStyle: {
                            color: '#fff',
                            fontSize: 10
                        }
                    },
                    parallelAxis: [
                        {dim: 0, name: schema[0].text},
                        {dim: 1, name: schema[1].text},
                        {dim: 2, name: schema[2].text},
                        {dim: 3, name: schema[3].text},
                        {dim: 4, name: schema[4].text},
                        {dim: 5, name: schema[5].text}
                    ],
                    parallel: {
                        left: '5%',
                        right: '10%',
                        bottom: 70,
                        top:70,
                        parallelAxisDefault: {
                            type: 'value',
                            name: 'AQI指数',
                            nameLocation: 'end',
                            nameGap: 15,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 8
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#aaa'
                                }
                            },
                            axisTick: {
                                lineStyle: {
                                    color: '#777'
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    series: _.map(data,function(item){
                        return {
                            name: item.collegeName,
                            type: 'parallel',
                            lineStyle: lineStyle,
                            data: [
                                [item.total,item.normal,item.late,item.askForLeave,item.absenteeism,item.classRate]
                            ]
                        }
                    })
                };
                return option;
            },
            chart3:function(classed) {
                var option = {
                    series: {
                        type: 'liquidFill',
                        data: [classed*0.01, classed*0.008, classed*0.006, classed*0.004],
                        radius: '60%',
                        shape: 'roundRect',
                        center: ['50%', '50%'],
                        backgroundStyle: {
                            borderColor: '#1481bf',
                            borderWidth: 1,
                            shadowColor: 'rgba(234, 136, 206, 0.8)',
                            shadowBlur: 40,
                            color: '#fffff'
                        },
                        label: {
                            normal: {
                                position: ['50%', '30%'],
                                formatter: function() {
                                    return classed;
                                },
                                textStyle: {
                                    fontSize: 15,
                                }
                            }
                        },
                        outline: {
                            show: false
                        },
                    }
                };
            return option;
            },
            chart4:function(data) {
                var option = {
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['64%', '72%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    position: 'center',
                                    formatter: '56\n到课率',
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {
                                    value: 335,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false,
                                                textStyle: {
                                                    fontSize: 12,
                                                    fontWeight: "bold"
                                                },
                                                position: "center"
                                            },
                                            color: '#25db50'
                                        }
                                    },
                                },
                                {value:310, itemStyle: {
                                    normal: {
                                        label: {
                                            show: false,
                                            textStyle: {
                                                fontSize: 12,
                                                fontWeight: "bold"
                                            },
                                            position: "center"
                                        },
                                        color: '#4fb2ff'
                                    }
                                }},
                                {value:234, itemStyle: {
                                    normal: {
                                        label: {
                                            show: false,
                                            textStyle: {
                                                fontSize: 12,
                                                fontWeight: "bold"
                                            },
                                            position: "center"
                                        },
                                        color: '#ff9829'
                                    }
                                }},
                                {value:135, itemStyle: {
                                    normal: {
                                        label: {
                                            show: false,
                                            textStyle: {
                                                fontSize: 12,
                                                fontWeight: "bold"
                                            },
                                            position: "center"
                                        },
                                        color: '#ff4646'
                                    }
                                }}
                            ]
                        },
                        {
                            name: '',
                            type: 'pie',
                            clockWise: true,
                            hoverAnimation: false,
                            radius: [200, 200],
                            label: {
                                normal: {
                                    position: 'center'
                                }
                            },
                            data: [{
                                value: 0,
                                label: {
                                    normal: {
                                        formatter: data+'%',
                                        textStyle: {
                                            color: '#ccc',
                                            fontSize: 15,
                                        }
                                    }
                                }
                            }]
                        }
                    ]
                };
                return option;
            },
            chart5:function(data){
                var option = {
                        calculable : true,
                    legend: {
                        orient:'vertical',
                        itemGap:12,
                        right:5,
                        padding: [
                            10,  // 上
                            10, // 右
                            10,  // 下
                            10, // 左
                        ],
                        textStyle:{
                            color:'#00000',
                        },
                        data: _.map(data,function(item){
                            return item.name;
                        })
                    },
                        series: [
                            {
                                name: '每月生日人数占比',
                                type: 'pie',
                                color: ['#4273ff','#15a4ff','#00a05e','#0acb1c','#91e856','#eeb850','#ee8150','#e64545','#ce006b','#8800ce'],
                                center: ['30%', '60%'],
                                radius: ['20%', '50%'],
                                roseType: 'area',
                                data:_.map(data,function(item){
                                    return {
                                        name:item.name,
                                        value:item.comprehensive
                                    };
                                })
                            }
                            ]
                };
                 return option;
            },
            chart6:function(data){
                var dataStyle = {
                    normal: {
                        label: {show:false},
                        labelLine: {show:false},
                        shadowBlur: 40,
                        shadowColor: 'rgba(40, 40, 40, 0.5)',
                    }
                };
                var placeHolderStyle = {
                    normal : {
                        color: 'rgba(0,0,0,0)',
                        label: {show:false},
                        labelLine: {show:false}
                    },
                    emphasis : {
                        color: 'rgba(0,0,0,0)'
                    }
                };
                var option = {
                    color: ['#7666ef',  '#4fbfff',  '#00963c',  '#eebc50',  '#e64545'],
                    legend: {
                        orient:'vertical',
                        itemGap:12,
                        left:5,
                        top:30,
                        padding: [
                            10,  // 上
                            10, // 右
                            10,  // 下
                            10, // 左
                        ],
                        textStyle:{
                            color:'#00000',
                        },
                        data: _.map(data,function(item){
                            return item.name;
                        })
                    },
                    series : [
                        {
                            name:'Line 1',
                            type:'pie',
                            clockWise:false,
                            center: ['70%', '50%'],
                            radius : [62,70],
                            itemStyle : dataStyle,
                            hoverAnimation: false,

                            data:[
                                {
                                    value:data[0].comprehensive,
                                    name:data[0].name
                                },
                                {
                                    value:data[0].comprehensive,
                                    name:'invisible',
                                    itemStyle : placeHolderStyle
                                }

                            ]
                        },
                        {
                            name:'Line 2',
                            type:'pie',
                            clockWise:false,
                            center: ['70%', '50%'],
                            radius : [54, 62],
                            itemStyle : dataStyle,
                            hoverAnimation: false,
                            data:[
                                {
                                    value:data[1].comprehensive,
                                    name:data[1].name
                                },
                                {
                                    value:data[1].comprehensive,
                                    name:'invisible',
                                    itemStyle : placeHolderStyle
                                }
                            ]
                        },
                        {
                            name:'Line 3',
                            type:'pie',
                            center: ['70%', '50%'],
                            clockWise:false,
                            hoverAnimation: false,
                            radius : [46, 54],
                            itemStyle : dataStyle,
                            data:[
                                {
                                    value:data[2].comprehensive,
                                    name:data[2].name
                                },
                                {
                                    value:data[2].comprehensive,
                                    name:'invisible',
                                    itemStyle : placeHolderStyle
                                }
                            ]
                        },
                        {
                            name:'Line 4',
                            type:'pie',
                            center: ['70%', '50%'],
                            clockWise:false,
                            hoverAnimation: false,
                            radius : [38, 46],
                            itemStyle : dataStyle,
                            data:[
                                {
                                    value:data[3].comprehensive,
                                    name:data[3].name
                                },
                                {
                                    value:data[3].comprehensive,
                                    name:'invisible',
                                    itemStyle : placeHolderStyle
                                }
                            ]
                        },
                        {
                            name:'Line 5',
                            type:'pie',
                            center: ['70%', '50%'],
                            clockWise: false,
                            hoverAnimation: false,
                            radius : [30, 38],
                            itemStyle : dataStyle,
                            data:[
                                {
                                    value:data[4].comprehensive,
                                    name:data[4].name
                                },
                                {
                                    value:data[4].comprehensive,
                                    name:'invisible',
                                    itemStyle : placeHolderStyle
                                }
                            ]
                        },
                    ]
                };
                return option;
            },
            chart7:function(data) {
                var option = {
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['55%', '65%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    position: 'center',
                                    formatter: '56\n到课率'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {
                                    value: 335,
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false,
                                                textStyle: {
                                                    fontSize: 12,
                                                    fontWeight: "bold"
                                                },
                                                position: "center"
                                            },
                                            color: '#6f80ff'
                                        }
                                    },
                                },
                                {value:310, itemStyle: {
                                    normal: {
                                        label: {
                                            show: false,
                                            textStyle: {
                                                fontSize: 12,
                                                fontWeight: "bold"
                                            },
                                            position: "center"
                                        },
                                        color: '#ff9c53'
                                    }
                                }},
                                {value:234, itemStyle: {
                                    normal: {
                                        label: {
                                            show: false,
                                            textStyle: {
                                                fontSize: 12,
                                                fontWeight: "bold"
                                            },
                                            position: "center"
                                        },
                                        color: '#ff9c53'
                                    }
                                }},
                                {value:135, itemStyle: {
                                    normal: {
                                        label: {
                                            show: false,
                                            textStyle: {
                                                fontSize: 12,
                                                fontWeight: "bold"
                                            },
                                            position: "center"
                                        },
                                        color: '#d00045'
                                    }
                                }}
                            ]
                        },
                        {
                            name: '',
                            type: 'pie',
                            clockWise: true,
                            hoverAnimation: false,
                            radius: [200, 200],
                            label: {
                                normal: {
                                    position: 'center'
                                }
                            },
                            data: [{
                                value: 0,
                                label: {
                                    normal: {
                                        formatter: data+'%',
                                        textStyle: {
                                            color: '#ccc',
                                            fontSize:15,
                                        }
                                    }
                                }
                            }]
                        }

                    ]
                };
                return option;
            },
        }
        var myChart2 = echarts.init(document.getElementById('student-geo2'));
        var myChart3 = echarts.init(document.getElementById('educational_statistics'));
        var myChart4 = echarts.init(document.getElementById('educational_statistics1'));
        var myChart5 = echarts.init(document.getElementById('educational_statistics2'));
        var myChart12 = echarts.init(document.getElementById('bottom-chart'));
        var myChart13 = echarts.init(document.getElementById('bottom-chart1'));
        var myChart14 = echarts.init(document.getElementById('bottom-chart2'));
        var myChart15 = echarts.init(document.getElementById('bottom-chart3'));
        $scope.getEcharts = function(){
            var params = {orgId:215};
            setTimeout(function(){
               //地理化信息数据
                function getOrgan(){
                    GeoService.getOrgan(params).success(function (res) {
                        myChart2.setOption(eduChartConfig.geoChart(res.data));
                    });
                }

                //实时签到旷课统计
                function getAttendancestatistics(){
                    GeoService.getAttendancestatistics(params).success(function(res){
                        myChart3.setOption(eduChartConfig.chart(res.data));
                        $scope.attendancestatistics = {
                            "count": res.data.count,
                            "absenteeismCount": res.data.absenteeismCount
                        }
                    })
                }

                //实时课程签到率Top5
                function attendancerate(){
                    GeoService.attendancerate(params).success(function(res){
                        myChart4.setOption(eduChartConfig.chart1(res.data));
                        $scope.courseNameList = _.map(res.data,function(item){
                            return item.courseName
                        })
                    })
                }

                //实时教学班考勤展示
                function realtimestatistics(){
                    GeoService.realtimestatistics(params).success(function(res){
                        var page = Math.ceil(res.data.length/8);
                        var id=0;
                        var getGeoFun=function(id){
                            $scope.allData.classList = getClassList();
                            for(var i=0;i<page;i++){
                                if(id == i){
                                    var resList = res.data.slice(8*i,8*(i+1));
                                    _.each(resList,function(item,index){
                                        $scope.allData.classList[index] = _.extend($scope.allData.classList[index],item);
                                        $scope.$apply();
                                    });
                                    _.each($scope.allData.classList,function(item,index){
                                        var chart = echarts.init(document.getElementById('chart_'+(index+1)));
                                        chart.setOption(eduChartConfig.chart3(item.classRate));
                                    });
                                }
                            }
                        }
                        setInterval(function(){
                            getGeoFun(id);

                            id++;
                            if(id == page){
                                id = 0;
                            }
                        },10000);
                    });
                }

                //实时热门评论20
                function hotreviews(){
                    GeoService.hotreviews(params).success(function(res){
                        $scope.viewsList = res.data;
                        setTimeout(function() {
                            $('.ticker-content').vTicker();
                        },100)
                    })
                }
                getOrgan();
                getAttendancestatistics();
                attendancerate();
                realtimestatistics();
                hotreviews();
                setInterval(function() {
                    getAttendancestatistics();
                },1800000);
                setInterval(function(){
                    getOrgan();
                    attendancerate();
                    realtimestatistics();
                    hotreviews();
                },300000);
                //院系考勤历史数据汇总
                GeoService.departmentsummary(params).success(function(res){
                    myChart5.setOption(eduChartConfig.chart2(res.data));
                })
                //本学期到课率汇总
                GeoService.termtoclassrate(params).success(function(res){
                    $scope.termtoClass={
                        "normal": res.data.normal,
                        "absenteeism": res.data.absenteeism,
                        "late": res.data.late,
                        "leave": res.data.leave
                    }
                    myChart12.setOption(eduChartConfig.chart4(res.data.rate));
                })
                //本学期教师综合排名top10
                GeoService.teacherranking(params).success(function(res){
                    myChart13.setOption(eduChartConfig.chart5(res.data));
                })
                //本学期行政班排名top5
                GeoService.classranking(params).success(function(res){
                    myChart14.setOption(eduChartConfig.chart6(res.data));
                })
                //本学期综合好评率
                GeoService.comprehensivepraise(params).success(function(res){
                    myChart15.setOption(eduChartConfig.chart7(res.praise));
                })
            },200)
        }
        $scope.getEcharts();
    });
