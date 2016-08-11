angular
    .module('altairApp')
    .controller('members_listCtrl',
        function ($rootScope,$scope,$window,contact_list, $http,$state) {

            
          
            
         
            
            
            $http.get("http://localhost:3000/contact").success(function(data){
               $scope.data=data ;  
          
              var all_companies = data.map(function(a) {
                return a.roles[0];
            });

            console.log(all_companies);
            // remove duplicate companies
            function eliminateDuplicates(arr) {
                var i,
                    len=arr.length,
                    out=[],
                    obj={};

                for (i=0;i<len;i++) {
                    obj[arr[i]]=0;
                }
                for (i in obj) {
                    out.push(i);
                }
                return out;
            }

            $scope.contact_list_companies = eliminateDuplicates(all_companies);

            $scope.$on('onLastRepeat', function (scope, element, attrs) {
                $scope.$apply(function () {
                    UIkit.grid($('#contact_list'),{
                        controls: '#contact_list_filter',
                        gutter: 20
                    });
                });
            })
            
            })
            
            
          $scope.desactive = function(user){
             
              $http.get("http://localhost:3000/desactive/"+user._id).success(function(data){
                  for(var i=0;i<$scope.data.length;i++){
                      if($scope.data[i]._id===data._id)
                          {
                              $scope.data[i].status ="Desactive"; 
                          }
                  }
              })
          }
          
          
          
          $scope.active = function(user){
             
              $http.get("http://localhost:3000/active/"+user._id).success(function(data){
                console.log(data)
                  for(var i=0;i<$scope.data.length;i++){
                      if($scope.data[i]._id===data._id)
                          {
                              $scope.data[i].status ="Active"; 
                          }
                  }
              })
          }
            
         
       if('webkitSpeechRecognition' in window)
		
		{
		var recogintion = new webkitSpeechRecognition() ; 
			recogintion.lang ='fr-FR'; 
			recogintion.continious= true ; 
			recogintion.interimResults= true  ; 
			
			
				recogintion.start() ; 
			var transcript =""; 
			recogintion.onresult = function (event){
			console.log(event)
			 
				for (var i = event.resultIndex; i<event.results.length ; i++)
					 {
						 //recogintion.stop(); 
				  transcript = event.results[i][0].transcript ;  
						 
				}
				console.log(transcript)
				if (transcript==="Salut"){
				$state.go("restricted.events") 	
				}

	        if (transcript==="afficher la liste des réunions"){
				$state.go("restricted.meeting") 	
				}
                
				
			}
             if (transcript==="afficher la liste des contacts"){
				$state.go("restricted.contact_list") 	
				}
                
				
			
			recogintion.onend = function()
			{
				recogintion.start() ; 
			}
			
		}
          

        }
    );