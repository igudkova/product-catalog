'use strict';

angular.module('sampleApp').directive('contenteditable', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.bind('blur keyup change', function() {
                // todo: don't update the model if element content is not valid
                // todo: sanitize safe fields
                scope.$apply(function() {
                    ngModel.$setViewValue(element.html());
                });
            });

            ngModel.$render = function() {
                element.html(ngModel.$viewValue);
            };
        }
    };    
});
