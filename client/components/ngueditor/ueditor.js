'use strict';

angular.module('ngUeditor',[])
    .directive('ueditor', function($timeout) {
        return {
            restrict: 'AE',
            scope:{
                uec:"=",
                editor:"=",
                config:'=',
                id:'='
            },
            template:"<script id='{{id}}' name='content'  type='text/plain'></script>",
            link: function(scope, element, attrs) {
                var ue=null;
                function initEditor(){
                      destroyEditor(scope.id);
                    ue = UE.getEditor(scope.id,scope.config);
                    if(scope.editor){
                      scope.editor=ue;
                    }
                  ue.addListener("blur", function (type, event) {
                    scope.$apply(function () {
                      scope.uec=ue.getContent();
                    })
                  });
                  ue.addListener("ready", function (type, event) {
                    scope.$watch('uec', function (val) {
                        ue.setContent(scope.uec);
                   });
                  });

                }
                function destroyEditor(){
                    UE.delEditor(scope.id);
                }
              $timeout(function(){
                initEditor();

              });

            }
        }
});
