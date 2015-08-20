'use strict';

angular.module('sampleApp').factory('dataService', ['$http', function($http) {
    var cache;
    
    function getData(callback) {
        if(cache) {
            callback(cache);    
        } else {
            $http({
                method: 'GET',
                url: 'data/catalog.json'
            }).success(function(data) {
                cache = data.categories.map(function(category) {
                    return {
                        id: category.id,
                        name: category.name,
                        products: category.products,
                        count: category.products.length
                    };
                });
                callback(cache);
            });            
        }
    }

    return {
        getAllCategories: getData,
        
        findCategory: function(id, callback) {
            getData(function(data) {
                var category = data.filter(function(entry) {
                    return entry.id === id;
                })[0];
                callback(category);
            });
        },
        
        findProduct: function(cid, pid, callback) {
            this.findCategory(cid, function(category) {
                var product;
                if(category) {
                    product = category.products.filter(function(entry) {
                        return entry.id === pid;
                    })[0];
                    if(product) {
                        product.category = {
                            id: category.id, 
                            name: category.name
                        };
                    }
                }
                callback(product);
            });
        }
    };
}]);