'use strict';

angular.module('sampleApp').controller('CategoryCtrl', ['$scope', '$stateParams', 'dataService', function ($scope, $stateParams, dataService) {
    dataService.findCategory($stateParams.id, function(category) {
        $scope.category = category;
    });   
}]);