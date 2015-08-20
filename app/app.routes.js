'use strict';

angular.module('sampleApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('catalog', {
            url: '/',
            views: {
                'list': {
                    templateUrl : 'app/partials/catalog/catalog.html',
                    controller: 'CatalogCtrl'
                }
            }
        })
        .state('catalog.category', {
            url: 'categories/:id',
            views: {
                'sublist@': {
                    templateUrl:'app/partials/category/category.html',
                    controller: 'CategoryCtrl'
                },
            }
        })
        .state('product', {
            url: '/categories/:cid/products/:pid',
            templateUrl: 'app/partials/product/product.html',
            controller: 'ProductCtrl'
        });
}]);