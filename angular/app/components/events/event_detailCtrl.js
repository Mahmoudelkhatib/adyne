angular
    .module('altairApp')
    .controller('event_detailCtrl',
        
    
        function ($compile, $scope, $stateParams, $timeout, $http , $stateParams, DTOptionsBuilder, DTColumnDefBuilder) {

            console.log($stateParams.id)
            
            $scope.images = [
               
                          ];
            $http.get("http://localhost:3000/event/"+$stateParams.id).success(function(data){
            
            
                $scope.data=data ; 
            
                document.getElementById("desc").innerHTML = data.description ; 
           for(var i=0 ; i<data.image_album.length ; i++)
               {
            $scope.images.push({'url': data.image_album[i] })       
               }
            
                console.log($scope.images); 
            

            
            
            });
            
            
          
    
}
            
        
    );