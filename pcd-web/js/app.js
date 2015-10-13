/*jslint devel: true, indent: 4, maxerr: 50, browser: true, regexp: true */
/*global
    angular
*/
/* App Module */

(function () {
    'use strict';

    var pcdApp = angular.module('pcdApp', [
        'ngRoute',
        'pcdControllers',
        'pcdServices',
        'pcdDirectives'
    ]);

    pcdApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/job-list.html',
                    controller: 'JobListCtrl'
                }).
                when('/jobs/:jobId', {
                    templateUrl: 'partials/job-detail.html',
                    controller: 'JobDetailCtrl'
                }).
                when('/cost-code-book/:pageId', {
                    templateUrl: 'partials/cost-code-book-list.html',
                    controller: 'CostCodeBookCtrl'
                }).
                when('/cost-code-book', {
                    redirectTo: '/cost-code-book/1'
                }).
                when('/cost-code-book/detail/:costCodeBookId', {
                    templateUrl: 'partials/cost-code-book-detail.html',
                    controller: 'CostCodeBookDetailCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
}());