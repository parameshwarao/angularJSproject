
var myApp = angular.module('myApp', ['ngRoute']); 


myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
            templateUrl     : 'views/firstpage.html',
            // Which controller it should use 
            controller      : 'mainController',
            // what is the alias of that controller.
            controllerAs    : 'firstpage'
        })
        .when('/second',{
            templateUrl     : 'views/scores.html',
            controller      : 'secondController',
            controllerAs    : 'secondpage'
        })
        .when('/third',{

            templateUrl     : 'views/stats.html',
            controller      : 'thirdController',
            controllerAs    : 'thirdpage'
        })

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);


myApp.controller('mainController',['$scope', '$log',function($scope,  $log){
}]);

myApp.controller('secondController',['$scope', '$log',function($scope,  $log){
}]);

myApp.controller('thirdController',['$scope', '$log',function($scope,  $log){
}]);

