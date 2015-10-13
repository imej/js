/*jslint devel: true, indent: 4, maxerr: 50, browser: true, regexp: true */
/*global
    angular, RES, FormCostCodeDetail
*/
/* Controllers */

(function () {
    'use strict';

    var pcdControllers = angular.module('pcdControllers', []);

    pcdControllers.controller('JobListCtrl', ['$scope',
        function ($scope) {
            $scope.jobs = 'This is the jobs list';
        }]);

    pcdControllers.controller('JobDetailCtrl', ['$scope', '$routeParams',
        function ($scope, $routeParams) {
            $scope.job = {
                Name: 'myjob',
                Id: $routeParams.jobId
            };
        }]);

    pcdControllers.controller('CostCodeBookCtrl', ['$scope', '$routeParams', '$http',
        function ($scope, $routeParams, $http) {
            var pgURL,
                countURL,
                pgId = 1;

            countURL = 'data/cost-code-book/count.json';

            if ($routeParams.pageId) {
                pgId = $routeParams.pageId;
            }
            pgURL = 'data/cost-code-book/page' + pgId + '.json';

            $scope.currentPage = pgId;

            $http.get(countURL).
                success(function (data) {
                    var rowPerPage,
                        pgPrefix,
                        total,
                        pg;

                    rowPerPage = 20;
                    pgPrefix = '#/cost-code-book/';
                    total = data.count;

                    pg = RES.PCD.Pagination;
                    pg.setRcordsPerPage(rowPerPage);
                    pg.setRcordsCount(total);
                    pg.setCurrentPage(pgId);
                    pg.setURLPrefix(pgPrefix);
                    $scope.pages = pg.getPages();
                }).error(function (data) {
                    $scope.data = "error";
                });

            $http.get(pgURL).
                success(function (data) {
                    $scope.costCodeBookList = data;
                }).error(function (data) {
                    $scope.data = "error";
                });
        }]);

    pcdControllers.controller('CostCodeBookDetailCtrl', ['$scope', '$routeParams', '$http',
        function ($scope, $routeParams, $http) {
            var ccbid,
                url,
                i;

            ccbid = parseInt($routeParams.costCodeBookId, 10);
            url = 'data/cost-code-book.json';
            
            $http.get(url).
                success(function (data) {
                    for (i = 0; i < data.length; i += 1) {
                        if (data[i].id === ccbid) {
                            $scope.costCodeBook = data[i];
                        }
                    }
                }).error(function (data) {
                    $scope.data = data;
                });

            $scope.isEditMode = false;
            $scope.save = function () {
                if (FormCostCodeDetail.fldDiscipline.$invalid) {
                    console.log('discipline is invalid!');
                }
                $scope.isEditMode = false;
            };
        }]);
}());
