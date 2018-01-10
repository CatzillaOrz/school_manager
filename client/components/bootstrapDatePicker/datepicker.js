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
          $(element).datepicker({
            weekStart: 1,
            autoclose: true,
            startDate: attrs.setStartTime?"0d":null,
            todayHighlight: true,
            zIndexOffset: 500000,
            language: 'zh-CN',
            format:'yyyy-mm-dd'
          }).on('changeDate', function (e) {
            //$(element).find('input').val();
            var controller = angular.element($(element).find('input')).controller('ngModel');
            controller.$setViewValue($(element).find('input').val());
            $rootScope.$broadcast('timeInterval',{
              time:$(element).find('input').val(),
              id:$(element).attr('id')
            });
          })
        })
      }
    }
  });

