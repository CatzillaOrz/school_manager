/**
 * Created by lxy on 16/9/2.
 */
angular.module('dleduWebAppDianDian')
      .controller('DianDianCtrl', ['$scope','ngDialog', function ($scope,ngDialog) {
          $scope.showDialog = function () {
              ngDialog.open({
                  template: 'download',
                  scope: $scope,
                  className: 'download_dialog'
              })
          }
          // 二维码切换
          $scope.device = 'ios';
          $scope.deviceToggle = function (type) {
              $scope.device = type;
          }
          /* app download  */
          $scope.downloadHover = true;
          $scope.downloadenter = function () {
              $scope.downloadHover = !$scope.downloadHover;
          };
      }]);