'use strict';

angular.module('sampleApp').controller('ProductCtrl', ['$scope', '$stateParams', 'dataService', function ($scope, $stateParams, dataService) {
    dataService.findProduct($stateParams.cid, $stateParams.pid, function(product) {
        $scope.product = product;
    }); 
}]);