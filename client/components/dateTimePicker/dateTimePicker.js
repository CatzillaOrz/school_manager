/**
 * Created by Secmax on 16/8/4.
 */
'use strict';
/**
 * description : 日期+时间选择器
 * @requires 'ui.bootstrap'
 * @use-method  标签<date-time-picker></date-time-picker> 或者<div date-time-picker></div>
 *              属性 date-time='日期+时间数据';
 *              date-format='yyyy-MM-dd hh:mm:ss' //todo
 *
 */
angular.module('EnrichMindApp')
  .directive('dateTimePicker', [function () {
    return {
      restrict: 'EA',
      template: '<div class="control-text-time"> ' +
                  '<div class="input-group"> ' +
                    '<input id="examReleaseTime" type="text" uib-datepicker-popup ng-model="dateTime" min-date="datePick.dateOptions.minDate" max-date="datePick.dateOptions.maxDate"  ng-change="datePick.onTimeChange()" data-is-open="datePick.popup1.opened" data-datepicker-options="datePick.dateOptions" data-close-text="取消" data-show-button-bar="false" class="form-control"/>' +
                    '<span class="input-group-btn"> ' +
                      '<button type="button" ng-click="datePick.open1()" class="btn btn-default">' +
                        '<i class="glyphicon glyphicon-calendar"></i>' +
                      '</button>' +
                    '</span> ' +
                  '</div> ' +
                  '<div uib-timepicker ng-model="dateTime" hour-step="datePick.hstep" show-seconds="true" ' +
                  'minute-step="datePick.mstep" ng-change="datePick.onTimeChange()" ' +
                  'show-meridian="datePick.ismeridian" template-url="components/dateTimePicker/timepicker.html">' +
                  '</div> ' +
                '</div>',
      scope: {
        dateTime: '=',
        dateFormat:'@'
      },
      link: function (scope, element, attrs) {

        scope.datePick = {
          //日期选择设置
          format: 'dd-MMMM-yyyy',
          altInputFormats: ['M!/d!/yyyy'],
          inlineOptions: {
            minDate: new Date(),
            showWeeks: true
          },
          dateOptions: {
            formatYear: 'yy',
            maxDate: new Date(2030, 10, 11),
            minDate: new Date(2000, 10, 11),
            startingDay: 1
          },
          open1: function () {
            this.popup1.opened = true;
          },
          open2: function () {
            this.popup2.opened = true;
          },
          popup1: {
            opened: false
          },
          popup2: {
            opened: false
          },
          //时间选择设置
          hstep: 1,
          mstep: 1,
          ismeridian: false,
          //
          onTimeChange:function(){
            if(scope.dateFormat){
              scope.dateTime = scope.dateTime.Format("yyyy-MM-dd hh:mm:ss");
            }
          }
        };

        Date.prototype.Format = function (toString) {
          var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": 0
            //"s+": this.getSeconds()
          };
          if (/(y+)/.test(toString)) toString = toString.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(toString)) toString = toString.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return toString;
        };
      }
    };
  }]);
