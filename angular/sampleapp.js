var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){

           $routeProvider

           .when('/',{
           	templateUrl:'mycreation/index.html',
           	controller: 'mainController'

           })

           .when('/second',{
           	templateUrl:'mycreation/scores.html',
           	controller:'secondController'


           })



});



myApp.controller('mainController',['$scope,'$location','$log'
function($scope, $location,$log){

  

	}]);
