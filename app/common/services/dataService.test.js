'use strict';

describe('dataService', function () {
    var $httpBackend, dataService; 
    
    beforeEach(module('sampleApp'));
    
    beforeEach(inject(['$httpBackend', 'dataService', function(_$httpBackend_, _dataService_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('data/catalog.json').respond({
            "categories": [{
                "id": "1",
                "name": "category1",
                "products": [{
                    "id": "11",
                    "name": "product11",
                    "code": "code11",
                    "price": 101,
                    "description": "description11"
                },{
                    "id": "12",
                    "name": "product12",
                    "code": "code12",
                    "price": 102,
                    "description": "description12"
                }]
            },{
                "id": "2",
                "name": "category2",
                "products": [{
                    "id": "21",
                    "name": "product21",
                    "code": "code21",
                    "price": 201,
                    "description": "description21"
                }]}
            ]}
        );
        
        dataService = _dataService_;
    }])); 
    
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should fetch array of category objects of the right structure', function() {
        dataService.getAllCategories(function(categories) {
            expect(categories).toBeDefined();
            expect(categories.length).toBe(2);
            expect(categories[0].id).toBe("1");
            expect(categories[0].name).toBe("category1");
            expect(categories[0].count).toBe(2);
            expect(categories[0].products.length).toBe(2);
            expect(categories[0].products[0].id).toBe("11");
            expect(categories[0].products[0].name).toBe("product11");
            expect(categories[0].products[0].code).toBe("code11");
            expect(categories[0].products[0].price).toBe(101);
            expect(categories[0].products[0].description).toBe("description11");
        });
        
        $httpBackend.flush();
    });
    
    it('should find category by the given id', function() {
        dataService.findCategory("2", function(category) {
            expect(category).toBeDefined();
        });
        
        $httpBackend.flush();
    });
    
    it('should find product by the given id and id of the category and present it in the right structure', function() {
        dataService.findProduct("1", "12", function(product) {
            expect(product).toBeDefined();
            expect(product.category).toBeDefined();
            expect(product.category.id).toBe("1");
            expect(product.category.name).toBe("category1");
        });
        
        $httpBackend.flush();
    });
});