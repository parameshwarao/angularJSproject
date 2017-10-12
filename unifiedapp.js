
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


        .when('/det/:matchid',{


            templateUrl     : 'views/statsdetails.html',
            controller      : 'statsdetController',             //teamsisepageload
            controllerAs    : 'statsdet'






        })

        .when('/details/:matchid1/:matchid2/:matchdate',{  //first page details controller

          templateUrl : 'views/details.html',
          controller: 'detailscontroller1',
          controllerAs : 'details1'



        })

        .when('/details2/:matchid1/:matchid2/:matchdate',{    //2015/16 page controller

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
                   //console.log($scope.dates[1].date); 

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

//-----------------controller : 'secondController'------------------SECOND PAGE CONTROLLER-----------------'views/scores.html'-------------------------//

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
                   //console.log($scope.dates[1].date); // i am not able to print any date here

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

//----------------------controller : 'thirdController',------------THIRD PAGE CONTROLLER-------------------- templateUrl: 'views/firstpage.html',-------//
myApp.controller('thirdController',['$scope', '$log', '$http',function($scope,  $log, $http){


	//working of this controller
	//$HTTP() calls-->main.keysACQ() calls-->main.historykey() calls--->keysHIS() calls--->END

var main =this;

//
this.rounds = [];
this.keys1 =[];
this.keys2=[];
this.masterlist=[];

//function to filter multiple duplicate keys
function unique(list) {
            var result = [];
            $.each(list, function(i, e) {
              
            if ($.inArray(e, result) == -1){ result.push(e);}
            });
            console.log("function end");
             return result;
        
             }
//jquery part ends//



this.keysACQ = function(data){
   var keyslist1 = [];
   var keyslist2 = [];
   var control=0;
   var masterkey = [];
                       console.log(data);
                       main.rounds = data.rounds;
               for (var i in main.rounds){
               for (var j in main.rounds[i].matches){
                
                  keyslist1[control]=main.rounds[i].matches[j].team1.code;
                  keyslist2[control]=main.rounds[i].matches[j].team2.code;
                  control++;

                      
                       }//i loop end
                    }//j loop end
                    masterkey=keyslist1.concat(keyslist2);
                    //console.log(masterkey);
                    uniqueKeys =unique(masterkey);
                    main.keys1=uniqueKeys;
                    console.log("2017/16 keys:"+main.keys1); 
                    main.historyKeys();  //for loading second set of keys from 2015-16                                                         
                 






                 } //function end



this.historyKeys = function(){                                                  //to invoke HTTP for the second URL
$http({
  method:'GET',
  url:'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
}).then(function sucessCallback(response){                      
      main.keysHIS(response.data);       },
       function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }   



        );

}

this.keysHIS = function(data){                                                  // for getting the second set of keys
   var keyslist1 = [];
   var keyslist2 = [];
   var control=0;
   var masterkey = [];
                       console.log(data);
                       main.rounds = data.rounds;
               for (var i in main.rounds){
               for (var j in main.rounds[i].matches){
                
                  keyslist1[control]=main.rounds[i].matches[j].team1.code;
                  keyslist2[control]=main.rounds[i].matches[j].team2.code;
                  control++;

                      
                       }//i loop end
                    }//j loop end
                    masterkey=keyslist1.concat(keyslist2);//combined list of keys
                    console.log(masterkey);
                    uniqueKeys =unique(masterkey); //to filter duplicate keys
                    main.keys2=uniqueKeys;
                    console.log("2015/16 keys:"+main.keys2); 
                    var combinedkeys;
                    combinedkeys=main.keys1.concat(main.keys2);
                    main.masterlist=unique(combinedkeys);
                    console.log("finallist:"+main.masterlist); 
                    console.log("key acquistion over,now to print name");    
                                                                               
                 


}//funtion end
  





//http request
$http({
  method:'GET',
  url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
}).then(function sucessCallback(response){                      
      main.keysACQ(response.data); 
      console.log("function started");       

       },
        function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }
		 );












}]);


//---------------------------------------------------------------------THIRD PAGE CONTROLLER END-----------------------------------------------------//

//------------controller AS:statsdet------------------------------------STATSDETAILS CONTROLLER------------controller:statsdetController------------//

myApp.controller('statsdetController',['$http','$location','$routeParams', function($http,$location,$routeParams,){

//working flow of controller

//$HTTP() calls-->main.stats17() calls ---> main.stats16() calls-->--->main.totalstats()-->END

console.log("routeservice has been invoked using ID's "+$routeParams.matchid);
        //variables to store all the params data
    var main = this ;
//matches defender and challenger

this.rounds = [];


this.teamname;

this.data1=$routeParams.matchid;
this.matches_defender17;
this.matches_challenger17;
this.matches_defender16;
this.matches_challenger16;
//matches total
this.matches_played17;
this.matches_played16;
this.total_matches_played;
//defender
this.wins_defender17;
this.loss_defender17;
//challenger
this.wins_challenger16;
this.loss_challenger16; 
//17
this.total_wins17;
this.total_losses17;
//16
this.total_wins16;
this.total_losses16;
//ties
this.ties17;
this.ties16;
this.total_ties;
//goals
this.goals17;
this.goals16;
this.total_goals;
//progress
this.total_wins;
this.total_loss;
this.total_ties;
this.performance;



$http({
  method:'GET',
  url:'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
}).then(function sucessCallback(response){                      
      //console.log(response);
      var dummy=response.data;
      main.stats17(response.data,main.data1);  
             
      },
      function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }      
		);

       




this.stats17= function(data,data1){
  console.log("stats17 is running");
  //master key
  var keysholder;
  keysholder=data1;
  console.log("key:"+data1+"data:"+data.rounds);
  //matches
  var totalPlay=0;
  var matchesplayedDef=0;
  var matchesplayedChall=0;
  //statistics
  //defender
  var defenderWins=0;
  var defenderLosses=0;
  var defenderGoal=0;
  //challenger
  var challengerWins=0;
  var challengerLosses=0;
  var challengerGoal=0;
  var ties=0;
  //total  
  var totalWins=0;
  var totalLoss=0;
  var totalgoals=0;
  //
  main.rounds = data.rounds;
  keysholder=data1;
  console.log(data);
  console.log("key used is "+keysholder);
   for (var i in main.rounds){
               for (var j in main.rounds[i].matches){
                            //defender
                        if(main.rounds[i].matches[j].team1.code==data1){
                              matchesplayedDef++;
                              main.teamname=main.rounds[i].matches[j].team1.name;



                                            if(main.rounds[i].matches[j].score1>main.rounds[i].matches[j].score2){
                                              defenderWins++;
                                              defenderGoal=defenderGoal+main.rounds[i].matches[j].score1;
                                              }
                                             else if(main.rounds[i].matches[j].score1<main.rounds[i].matches[j].score2){
                                             defenderLosses++; 
                                             }
                                             else if(main.rounds[i].matches[j].score2==main.rounds[i].matches[j].score1) {
                                             ties++;
                                             }
                                             else {}

                                                                        }
                              //challenger
                         else if(main.rounds[i].matches[j].team2.code==data1){
                                            matchesplayedChall++;
                                            main.teamname=main.rounds[i].matches[j].team2.name;
                                            if(main.rounds[i].matches[j].score2>main.rounds[i].matches[j].score1){
                                              challengerWins++;
                                              challengerGoal=challengerGoal+main.rounds[i].matches[j].score2;
                                              }
                                             else if(main.rounds[i].matches[j].score2<main.rounds[i].matches[j].score1){
                                             challengerLosses++; 
                                             }
                                             else if(main.rounds[i].matches[j].score2==main.rounds[i].matches[j].score1) {
                                             ties++;
                                             }
                                             else{}
                          

                          } 
                          else{/*this "else" is only a joke,nothing can be done here a team cant play by itself//*/}     






                                                                        
                      
                      


                       }//i loop end
                    }//j loop end

 totalPlay= matchesplayedDef+matchesplayedChall;
 totalWins = defenderWins+challengerWins;
 totalLoss = defenderLosses+challengerLosses;
 totalgoals = defenderGoal+challengerGoal;
//loading all data
main.matches_defender17=matchesplayedDef;
main.matches_challenger17=matchesplayedChall;
main.matches_played17=totalPlay;
main.wins_defender17=defenderWins;
main.loss_defender17=defenderLosses;
main.wins_challenger17=challengerWins;
main.loss_challenger17=challengerLosses;
main.total_wins17=totalWins;
main.total_losses17=totalLoss;
main.ties17=ties;
main.goals17=totalgoals;
console.log("loss defender:"+main.loss_defender17+"loss challenger:"+main.loss_challenger17+"total:="+main.total_losses17);

//to call Http and send second set of data to stats16



$http({
  method:'GET',
  url:'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
}).then(function sucessCallback(response){                      
      //console.log(response);
      var dummy=response.data;
      main.stats16(response.data,main.data1);  
             
      },
      function errorCallback(response){
                   // called asynchronously if an error occurs
                   // or server returns response with an error status.
                   alert("some error occurred. Check the console.");
                   console.log(response);
                    }

	    );


}//stats17 function end


this.stats16= function(data,data1){
  console.log("stats16 is running")
  //master key
  var keysholder;
  keysholder=data1;
  //matches
  var totalPlay=0;
  var matchesplayedDef=0;
  var matchesplayedChall=0;
  //statistics
  //defender
  var defenderWins=0;
  var defenderLosses=0;
  var defenderGoal=0;
  //challenger
  var challengerWins=0;
  var challengerLosses=0;
  var challengerGoal=0;
  var ties=0;
  //total  
  var totalWins=0;
  var totalLoss=0;
  var totalgoals=0;
  //
  main.rounds = data.rounds;
  keysholder=data1;
  console.log(data);
  console.log("stasts 16 keys"+keysholder);
   for (var i in main.rounds){
               for (var j in main.rounds[i].matches){
                            //defender
                        if(main.rounds[i].matches[j].team1.code==data1){
                              matchesplayedDef++;
                              main.teamname=main.rounds[i].matches[j].team1.name;
                                            if(main.rounds[i].matches[j].score1>main.rounds[i].matches[j].score2){
                                              defenderWins++;
                                              defenderGoal=defenderGoal+main.rounds[i].matches[j].score1;
                                              }
                                             else if(main.rounds[i].matches[j].score1<main.rounds[i].matches[j].score2){
                                             defenderLosses++; 
                                             }
                                             else {
                                             ties++;
                                             }

                                                                        }
                              //challenger
                         else if(main.rounds[i].matches[j].team2.code==data1){
                                            matchesplayedChall++;
                                            main.teamname=main.rounds[i].matches[j].team2.name;
                                            if(main.rounds[i].matches[j].score2>main.rounds[i].matches[j].score1){
                                              challengerWins++;
                                              challengerGoal=challengerGoal+main.rounds[i].matches[j].score2;
                                              }
                                             else if(main.rounds[i].matches[j].score2<main.rounds[i].matches[j].score1){
                                             challengerLosses++; 
                                             }
                                             else {
                                             ties++;
                                             }
                          

                          } 
                          else{/*this "else" is only a joke,nothing can be done here a team cant play by itself//*/}     






                                                                        
                      
                      


                       }//i loop end
                    }//j loop end

 totalPlay= matchesplayedDef+matchesplayedChall;
 totalWins = defenderWins+challengerWins;
 totalLoss = defenderLosses+challengerLosses;
 totalgoals = defenderGoal+challengerGoal;
//loading all data
main.matches_defender16=matchesplayedDef;
main.matches_challenger16=matchesplayedChall;
main.matches_played16=totalPlay;
main.wins_defender16=defenderWins;
main.loss_defender16=defenderLosses;
main.wins_challenger16=challengerWins;
main.loss_challenger16=challengerLosses;
main.total_wins16=totalWins;
main.total_losses16=totalLoss;
main.ties16=ties;
main.goals16=totalgoals;

console.log("loss:"+main.loss_defender16+"loss:"+main.loss_challenger16+"total:="+main.total_losses16);
//to call total stats
main.totalstats(data1);


}//stats16 function end
this.totalstats= function(data1){
  console.log("total invoked");

main.total_matches_played=main.matches_played17+main.matches_played16;
main.total_wins=main.total_wins17+main.total_wins16;
main.total_loss=main.total_losses17+main.total_losses16;
main.total_ties=main.ties17+main.ties16;
main.total_goals=main.goals17+main.goals16;
if(main.total_wins>main.total_loss){
  main.performance="more wins than loss.very good performance!!";
}
else{
  main.performance="losses are higher. Matches lost are greater over the time";
}
//console.log("working:"+main.total_matches_played);
console.log("total loss: "+main.total_loss);
console.log("teamname:"+main.teamname);
console.log(main.performance);


}


















  }]);





//--------------------------------------------------------------------STATSDETAILS CONTROLLER END------------------------------------------------------//

//----------------------controllerAS : 'details1'------------------------CURRENT SCORES CONTROLLER-------------- templateUrl : 'views/details.html'----//
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

//-----------------------------------------------------------current details controller ends---------------------------------------------------------//




//--------------!!!!NOTE SAME DETAILS CONTROLLER AS ABOVE BUT DIFFERENT URL. WARNING!!!!!! NOT TO BE CONFUSED BY ABOVE CONTROLLER.REFER ROUTING------//




//------controller :'detailscontroller2'--------------- HISTORY RECORDS CONTROLLER---------------templateUrl :'views/scoresdetails.html'-----------------//
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
