'use strict';

var myApp = angular.module('surligneur', ['localization','surligneur.services','ajoslin.mobile-navigate','ngMobile','shoppinpal.mobile-menu'])
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {  
          
        $routeProvider.when('/', {templateUrl: 'views/books.html'});
        $routeProvider.when('/book', {templateUrl: 'views/book.html'});

        $routeProvider.otherwise({redirectTo: '/'});
  }]);

 var client = new WindowsAzure.MobileServiceClient(
    "https://surligneur.azure-mobile.net/",
    "gKaytfQHhmoEHnGonJPXeOfsOyFdkO47"
);

var gaPlugin;
gaPlugin = window.plugins.gaPlugin;
gaPlugin.init(successHandler, errorHandler, "UA-47817539-1", 10);