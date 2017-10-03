

// to hold 
var ListData=[];
//unified binding app binding//
var myApp = angular.module('myApp', ['ngRoute']); 

//----------ROUTING SECTION------------------------------------------------------------------------
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
            templateUrl     : 'views/firstpage.html',            //homepage content load
            // Which controller it should use 
            controller      : 'mainController',
            // what is the alias of that controller.
            controllerAs    : 'firstpage'
        })
        .when('/second',{
            templateUrl     : 'views/scores.html',
            controller      : 'secondController',              //secondpageload
            controllerAs    : 'secondpage'
        })
        .when('/third',{

            templateUrl     : 'views/stats.html',
            controller      : 'thirdController',             //teamsisepageload
            controllerAs    : 'thirdpage'
        })

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'                      //if nothing is found
            }
        );
}]);


//------- UNIFIED CONTROLLER BINDING SECTION---------------------------------------------------------------------------


//-------------------first page controller----------------------------------------------------------------
myApp.controller('mainController',['$scope', '$log', '$http',function($scope,  $log, $http){

	var main =this;

    //auto HTTP get request on binding controller
    $http({
        method: 'GET',
        url:'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
           }).then(function sucessCallback(response){
                   //this for putting response data inside the listdata variable
                   main.ListData=response.data;
                   //ListData=response;
                   $log.info(response.data.name);      //to chek whether data from API is correct
                   $log.info("url:"+main.ListData.name); //to check whether data has correctly been placed in the array
                   },

                   function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }
                 );  






}]);

//-----------------------------first page controller end------------------------------------

//-----------------------------SECOND PAGE CONTROLLER---------------------------------------

myApp.controller('secondController',['$scope', '$log', '$http',function($scope,  $log, $http){


















    
}]);

//-----------------------------second page controller end------------------------------------

//-----------------------------THIRD PAGE CONTROLLER-----------------------------------------
myApp.controller('thirdController',['$scope', '$log', '$http',function($scope,  $log, $http){


















    
}]);


//------------------------------third page controller end------------------------------------

