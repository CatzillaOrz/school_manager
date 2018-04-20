/**
 * Created by Administrator on 2016/3/29.
 */
angular.module('dleduWebAppComponents')
  .directive('bDatepicker', function ($rootScope) {
    return {
      require: '?ngModel',
      restrict: 'A',
      scope: {
        setStartTime:'@'
      },
      link: function(scope, element, attrs, ngModel) {
        $(function () {
          var tempDate = '';
          $(element).datepicker({
            weekStart: 1,
            autoclose: true,
            startDate: attrs.setStartTime?"0d":new Date(1818,01,01),
            endDate: new Date(2218,12,30),
            todayHighlight: true,
            zIndexOffset: 500000,
            language: 'zh-CN',
            format:'yyyy-mm-dd',
            clearBtn: true
          }).on('changeDate', function (e) {
            tempDate = $(element).find('input').val();
            var controller = angular.element($(element).find('input')).controller('ngModel');
            controller.$setViewValue($(element).find('input').val());
            $rootScope.$broadcast('timeInterval',{
              time:$(element).find('input').val(),
              id:$(element).attr('id')
            });
          })
            .on('show', function(){
              tempDate = $(element).find('input').val();
            })
            .on('hide', function(){
              $(element).find('input').val(tempDate);
              var controller = angular.element($(element).find('input')).controller('ngModel');
              controller.$setViewValue($(element).find('input').val());
            });
        })
      }
    }
  });

