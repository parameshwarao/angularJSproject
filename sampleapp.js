
//---------------------------------------------------------UNIFIED SINGLE JS CONTROL AND DEFINATION.REFER COMMENTS TO UNDERSTAND SECTION-----------------//
// to hold datas
var ListData=[];
var rounds=[];
var Matches=[];
var temp;

//unified binding app binding//
var myApp = angular.module('myApp', ['ngRoute']);

//-------------------------------------------------------------------ROUTING SECTION------------------------------------------------------------------------//
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

        .when('/details2/:matchid1/:matchid2/:matchdate',{

          templateUrl :'views/scoresdetails.html',
          controller :'detailscontroller2',
          controllerAs :'details2'



        })




        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'                      //if nothing is found
            }
        );
}]);

//----------------------------------------------------------------ROUTING SECTION ENDS---------------------------------------------------------------------//
//------------------------------------------------------------- UNIFIED CONTROLLER BINDING SECTION---------------------------------------------------------//


//---------------controller   : 'mainController'-----------------------FIRST PAGE CONTROLLER---------------- templateUrl : 'views/firstpage.html'----------//
myApp.controller('mainController',['$scope', '$log', '$http',function($scope,  $log, $http){

	//var main =this;
  $scope.ListData;//general list data
  $scope.rounds=[];  //storing rounds value
  $scope.dates;

    //auto HTTP get request on binding controller
    $http({
        method: 'GET',
        url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
           }).then(function sucessCallback(response){

                   //this for putting response data inside the listdata variable
                   $scope.ListData=response.data;
                   temp=response.data;
                   $scope.rounds=response.data.rounds;
                   $scope.dates=$scope.ListData.rounds.matches; // i am not able to store dates


                   //ListData=response;
                   $log.info(response.data.name);      //to chek whether data from API is correct
                   $log.info("matchName:"+$scope.ListData.name); //to check whether data has correctly been placed in the array
                   $log.info("roundsName:"+$scope.rounds[0].name);//to check whether rounds data has been acquired
                   console.log($scope.dates[1].date); // i am not able to print any date here

                   },

                   function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }
                 );






}]);

//----------------------------------------------------------------------FIRST PAGE CONTROLLER END-------------------------------------------------------//

//----------------------------------------------------------------------SECOND PAGE CONTROLLER----------------------------------------------------------//

myApp.controller('secondController',['$scope', '$log', '$http',function($scope,  $log, $http){


  //var main =this;
  $scope.ListData;//general list data
  $scope.rounds=[];  //storing rounds value
  $scope.dates;

  $http({
        method: 'GET',
        url:'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
           }).then(function sucessCallback(response){

                  //this for putting response data inside the listdata variable
                   $scope.ListData=response.data;
                   temp=response.data;
                   $scope.rounds=response.data.rounds;
                   $scope.dates=$scope.ListData.rounds.matches; // i am not able to store dates


                   //ListData=response;
                   $log.info(response.data.name);      //to chek whether data from API is correct
                   $log.info("matchName:"+$scope.ListData.name); //to check whether data has correctly been placed in the array
                   $log.info("roundsName:"+$scope.rounds[0].name);//to check whether rounds data has been acquired
                   console.log($scope.dates[1].date); // i am not able to print any date here

                   },

                   function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }
                 );




















}]);

//-------------------------------------------------------------------SECOND PAGE CONTROLLER END---------------------------------------------------------//

//----------------------------------------------------------------------THIRD PAGE CONTROLLER----------------------------------------------------------//
myApp.controller('thirdController',['$scope', '$log', '$http',function($scope,  $log, $http){



















}]);


//---------------------------------------------------------------------THIRD PAGE CONTROLLER END-----------------------------------------------------//

//----------------------------------------------------------------------CURRENT SCORES CONTROLLER----------------------------------------------------//
myApp.controller('detailscontroller1',['$http','$location','$routeParams', function($http,$location,$routeParams,){

    var main = this ;


console.log("routeservice has been invoked using ID's "+$routeParams.matchid1+$routeParams.matchid2+$routeParams.matchdate);
        //variables to store all the params data
        this.matchId1 = $routeParams.matchid1 ;                         //team 1 key is passed
        this.matchId2 = $routeParams.matchid2 ;                          //team 2 key is passed
        this.matchDate = $routeParams.matchdate ;                        //team 3 key is passed
        //to store team data and to process them
        this.team1;
        this.team2;
        this.score1;
        this.score2;
        this.code1;
        this.code2;
        this.winner;
        this.date;
        this.day;
        this.rounds = [];
      //calling using HTTP to get the data

          //logic for finding the correct data and matching it correctly
      this.matchStats1 = function(data){
                       console.log(data);
                       main.rounds = data.rounds;
                       console.log(main.matchId1);
                       console.log(main.matchId2);
           for (var i in main.rounds){
               for (var j in main.rounds[i].matches){
                //console.log(main.rounds[i].matches[j].team1.code);

                     if (main.rounds[i].matches[j].team1.code== main.matchId1 && main.rounds[i].matches[j].team2.code == main.matchId2 && main.rounds[i].matches[j].date == main.matchDate){
                  console.info("record found");
                  main.day = main.rounds[i].name;
                   main.date = main.rounds[i].matches[j].date;             //DISPLAYING THE DATE
                   main.team1 = main.rounds[i].matches[j].team1.name;
                   main.team2 = main.rounds[i].matches[j].team2.name;
                   main.score1 =main.rounds[i].matches[j].score1;         //DISPLAYING THE SCORE OF TEAM A
                   main.score2 = main.rounds[i].matches[j].score2;        //DISPLAYING THE SCORE OF TEAM B
                   main.code1 = main.rounds[i].matches[j].team1.code;
                   console.log(main.code1);
                   main.code2 = main.rounds[i].matches[j].team2.code;
                 if (main.score1 > main.score2){
                    main.winner = ""+main.team1+" wins !!!! and dominates over "+main.team2;                     //TO CHECK IF TEAM A WON
                                               }
                 else if (main.score1 < main.score2){
                 main.winner = ""+main.team2+" wins!! and dominates over"+main.team1;                         //TO CHECK IF TEAM B WON
                                                    }

                  else {
                         main.winner = "match is drawn!! " ;

                       }


                      // ALL CONDITIONS AND AND DATA RETRIVAL ARE COMPLETE
                       }//if end
                    } // j loop end
                 } // i loop end
             } //function end

      $http({
        method:'GET',
        url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'

      }).then(function sucessCallback(response){
                         //getting the data
                         console.log("http has been invoked"+response.data);
                         // NOW THE KEYS ARE COMPARED WITH THE DATE
                         main.matchStats1(response.data);
                          console.log("function has been defined");


      },
      function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }



      );






  }]);


//--------------!!!!NOTE SAME DETAILS CONTROLLER AS ABOVE BUT DIFFERENT URL. WARNING!!!!!! NOT TO BE CONFUSED BY ABOVE CONTROLLER.REFER ROUTING------//




//---------------------------------------------------------------- HISTORY RECORDS CONTROLLER---------------------------------------//
myApp.controller('detailscontroller2',['$http','$location','$routeParams', function($http,$location,$routeParams,){

    var main = this ;


console.log("routeservice has been invoked using ID's "+$routeParams.matchid1+$routeParams.matchid2+$routeParams.matchdate);
        //variables to store all the params data
        this.matchId1 = $routeParams.matchid1 ;                         //team 1 key is passed
        this.matchId2 = $routeParams.matchid2 ;                          //team 2 key is passed
        this.matchDate = $routeParams.matchdate ;                        //team 3 key is passed
        //to store team data and to process them
        this.team1;
        this.team2;
        this.score1;
        this.score2;
        this.code1;
        this.code2;
        this.winner;
        this.date;
        this.day;
        this.rounds = [];
      //calling using HTTP to get the data

          //logic for finding the correct data and matching it correctly
      this.matchStats1 = function(data){
                       console.log(data);
                       main.rounds = data.rounds;
                       console.log(main.matchId1);
                       console.log(main.matchId2);
           for (var i in main.rounds){
               for (var j in main.rounds[i].matches){
                //console.log(main.rounds[i].matches[j].team1.code);

                     if (main.rounds[i].matches[j].team1.code== main.matchId1 && main.rounds[i].matches[j].team2.code == main.matchId2 && main.rounds[i].matches[j].date == main.matchDate){
                  console.info("record found");
                  main.day = main.rounds[i].name;
                   main.date = main.rounds[i].matches[j].date;             //DISPLAYING THE DATE
                   main.team1 = main.rounds[i].matches[j].team1.name;
                   main.team2 = main.rounds[i].matches[j].team2.name;
                   main.score1 =main.rounds[i].matches[j].score1;         //DISPLAYING THE SCORE OF TEAM A
                   main.score2 = main.rounds[i].matches[j].score2;        //DISPLAYING THE SCORE OF TEAM B
                   main.code1 = main.rounds[i].matches[j].team1.code;
                   console.log(main.code1);
                   main.code2 = main.rounds[i].matches[j].team2.code;
                 if (main.score1 > main.score2){
                    main.winner = ""+main.team1+" wins !!!! and dominates over "+main.team2;                     //TO CHECK IF TEAM A WON
                                               }
                 else if (main.score1 < main.score2){
                 main.winner = ""+main.team2+" wins!! and dominates over"+main.team1;                         //TO CHECK IF TEAM B WON
                                                    }

                  else {
                         main.winner = "match is drawn!! " ;

                       }


                      // ALL CONDITIONS AND AND DATA RETRIVAL ARE COMPLETE
                       }//if end
                    } // j loop end
                 } // i loop end
             } //function end

      $http({
        method:'GET',
        url:'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'

      }).then(function sucessCallback(response){
                         //getting the data
                         console.log("http has been invoked"+response.data);
                         // NOW THE KEYS ARE COMPARED WITH THE DATE
                         main.matchStats1(response.data);
                          console.log("function has been defined");


      },
      function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }



      );






  }]);
