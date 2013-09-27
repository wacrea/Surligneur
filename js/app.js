'use strict';

var myApp = angular.module('surligneur', ['surligneur.services','ajoslin.mobile-navigate','ngMobile','shoppinpal.mobile-menu'])
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {  
          
        $routeProvider.when('/', {templateUrl: 'views/books.html'});
        $routeProvider.when('/book', {templateUrl: 'views/book.html'});

        $routeProvider.otherwise({redirectTo: '/'});
  }]);