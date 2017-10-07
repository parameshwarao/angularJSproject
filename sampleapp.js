

// to hold datas
var ListData=[];
var rounds=[];
var Matches=[];

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

        .when('/details/:matchid1/:matchid2/:matchdate',{  //first page details controller

          templateUrl : 'views/details.html',
          controller: 'detailscontroller1',
          controllerAs : 'details1'



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

	//var main =this;
  $scope.ListData=[];//general list data
  $scope.rounds=[];  //storing rounds value
  $scope.Matches=[]; 
  $scope.roundsDATA=[];//storing matches value
  $scope.dates=[];

    //auto HTTP get request on binding controller
    $http({
        method: 'GET',
        url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
           }).then(function sucessCallback(response){

                   //this for putting response data inside the listdata variable
                   $scope.ListData.push(response.data);  
                   $scope.rounds=response.data.rounds;
                                     
                   //ListData=response;
                   $log.info(response.data.name);      //to chek whether data from API is correct
                   $log.info("matchName:"+$scope.ListData[0].name); //to check whether data has correctly been placed in the array
                   $log.info("roundsName:"+$scope.rounds[0].name);//to check whether rounds data has been acquired
                   
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


  $scope.List1Data=[];//general list data
  $scope.rounds1=[];  //storing rounds value
  $scope.Matches1=[]; //storing matches value


  $http({
        method: 'GET',
        url:'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
           }).then(function sucessCallback(response){

                   //this for putting response data inside the listdata variable
                   $scope.List1Data.push(response.data);  
                   $scope.rounds1=response.data.rounds;
                   $scope.Matches=response.data.rounds.matches;
                   //ListData=response;
                   $log.info(response.data.name);      //to chek whether data from API is correct
                   $log.info("matchName:"+$scope.ListData1[0].name); //to check whether data has correctly been placed in the array
                   $log.info("roundsName:"+$scope.rounds1[0].name);//to check whether rounds data has been acquired
                   $log.info("roundsDATE:"+$scope.Matches[0].date);
                   },

                   function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }
                 );  



















    
}]);

//-----------------------------second page controller end------------------------------------

//-----------------------------THIRD PAGE CONTROLLER-----------------------------------------
myApp.controller('thirdController',['$scope', '$log', '$http',function($scope,  $log, $http){


















    
}]);


//------------------------------third page controller end------------------------------------

//------------------------------current scores details controller-----------------------------
myApp.controller('detailscontroller1',['$http','$location','routeParams', function($http,$location,$routeParams){

    var main = this ;


console.log("routeservice has been invoked using ID's "+$routeParams.matchid1+$routeParams.matchid2+$routeParams.matchdate);
        //variables to store all the data
   /*     this.matchId1 = $routeParams.matchid1 ;                          //team 1 key is passed
        this.matchId2 = $routeParams.matchid2 ;                          //team 2 key is passed
        this.matchDate = $routeParams.matchdate ;                        //team 3 key is passed 
        
        this.team1;
        this.team2;
        this.score1;
        this.score2;
        this.code1;
        this.code2;
        this.winner;
        this.date;
        this.day;
        this.rounds1 = [];
      //calling using HTTP to get the data

      $http({
        method:'GET',
        url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
      }).then(function sucessCallback(response){
         main.matchStats(response.data);//getting the data        
            console.log("http has been invoked");
          // NOW THE KEYS ARE COMPARED WITH THE DATE 
          this.matchStats = function(data){
       // console.log(data);
        main.rounds1 = data.rounds;

     console.log(main.matchId1);
     console.log(main.matchId2);     
    for (var i in main.rounds1){
       for (var j in main.rounds1[i].matches){
        
        if (main.rounds1[i].matches[j].team1.code== main.matchId1 && main.rounds1[i].matches[j].team2.code == main.matchId2 && main.rounds1[i].matches[j].date == main.matchDate){
              console.log("working");
                  main.day = main.rounds1[i].name;                      
                   main.date = main.rounds1[i].matches[j].date;             //DISPLAYING THE DATE
                   main.team1 = main.rounds1[i].matches[j].team1.name;                     
                   main.team2 = main.rounds1[i].matches[j].team2.name;                   
                   main.score1 =main.rounds1[i].matches[j].score1;         //DISPLAYING THE SCORE OF TEAM A
                   main.score2 = main.rounds1[i].matches[j].score2;        //DISPLAYING THE SCORE OF TEAM B
                   main.code1 = main.rounds1[i].matches[j].team1.code;    
                   console.log(main.code1);
                   main.code2 = main.rounds1[i].matches[j].team2.code;                
                 if (main.score1 > main.score2){
                    main.winner = ""+main.team1+" won" ;                     //TO CHECK IF TEAM A WON
                                               }
                 else if (main.score1 < main.score2){
                 main.winner = ""+main.team2+" won" ;                         //TO CHECK IF TEAM B WON
                                                    }
                       
                  else {
                         main.winner = "Match drawn" ;

                       } 
                      

                      // ALL CONDITIONS AND AND DATA RETRIVAL ARE COMPLETE
                       }//if end
                    } // j loop end
                 } // i loop end
             } //function end



         


      },
      function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }



      );


*/



  }]);
