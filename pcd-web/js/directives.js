/*jslint devel: true, indent: 4, maxerr: 50, browser: true, regexp: true */
/*global
    angular
*/
/* Directives */

(function () {
    'use strict';

    var pcdDirectives = angular.module('pcdDirectives', []);

    pcdDirectives.directive('back', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);
}());