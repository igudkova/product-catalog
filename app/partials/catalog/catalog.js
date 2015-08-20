'use strict';

angular.module('sampleApp').controller('CatalogCtrl', ['$scope', 'dataService', function ($scope, dataService) {
    dataService.getAllCategories(function(categories) {
        $scope.categories = categories;
    });
}]);