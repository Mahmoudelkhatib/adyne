angular
    .module('altairApp')
    .controller('membre_detailCtrl', [
        '$rootScope',
        '$scope',
        'user_data',
    '$stateParams',
    '$http', 
        function ($rootScope,$scope,user_data, $stateParams, $http) {

        
            
            $http.get("http://localhost:3000/"+$stateParams.id).success(function(data){
                
                console.log(data); 
                $scope.user = data ; 
                document.getElementById("email").valeu="d"
            })
            
            $scope.send= function()
            {
                
                console.log();
                console.log(document.getElementById("subject").value);
                console.log(document.getElementById("body").value);
                
                
                
                
                
                
                 
               Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
};
                  
           var data = {
        
               email : document.getElementById("email").value, 
               subject : document.getElementById("subject").value,
               content :     document.getElementById("body").value
        
             }       
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
			
			

            $http.post("http://localhost:3000/send", Object.toparams(data), config)
            .success(function (data, status, headers, config) {
         

				
                                
			})
            .error(function (data, status, header, config) {
               
			console.log(data)
			
			});
                
            }
            
            
          
        }
    ]);