'use strict';

/* Services */
var pcdServices = angular.module('pcdServices', ['ngResource']);

pcdServices.factory('CostCodeBook', ['$resource', function($resource) {
    return $resource('data/cost-code-book/:file.json', {}, {
    	query: {method: 'GET', params: {file: 'page1'}, isArray: true},
        count: {method: 'GET', params: {file: 'count'}, isArray: false}
    });	
}]);