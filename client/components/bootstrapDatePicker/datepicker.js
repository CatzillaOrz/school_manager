/**
 * Created by Administrator on 2016/3/29.
 */
angular.module('dleduWebAppComponents')
  .directive('bDatepicker', function ($rootScope) {
    return {
      require: '?ngModel',
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs, ngModel) {
        $(function () {
          $(element).datepicker({
            weekStart: 1,
            autoclose: true,
            minDate:+1,
            todayHighlight: true,
            zIndexOffset: 500000,
            language: 'zh-CN',
            format:'yyyy-mm-dd'
          }).on('changeDate', function (e) {
            //$(element).find('input').val();
            var controller = angular.element($(element).find('input')).controller('ngModel');
            controller.$setViewValue($(element).find('input').val());
          })
        })
            .on('click',function(){
              $('#'+$(element).attr('id')).datepicker('setStartDate', new Date());
            })
      }
    }
  });

