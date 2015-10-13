/*jslint devel: true, indent: 4, maxerr: 50, browser: true, regexp: true */
/*global
    angular
*/
/* Services */

(function () {
    'use strict';


    var pcdServices = angular.module('pcdServices', ['ngResource']);

    pcdServices.factory('CostCodeBook', ['$resource', function ($resource) {
        return $resource('data/cost-code-book/:file.json', {}, {
            query: {
                method: 'GET',
                params: {
                    file: 'page1'
                },
                isArray: true
            },
            count: {
                method: 'GET',
                params: {
                    file: 'count'
                },
                isArray: false
            }
        });
    }]);
}());