let app = angular.module('myApp', []);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.controller('main', function($scope) {
    $scope.otherName = "angular name..";
})