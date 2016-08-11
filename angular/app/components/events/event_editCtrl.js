angular
    .module('altairApp')
    .controller('event_editCtrl', [
        '$scope',
        '$rootScope',
        'utils',
         '$http',
        'Upload',
    '$stateParams', 
        function ($scope,$rootScope,utils, $http, Upload,$stateParams  ) {
    
            
            
            $http.get("http://localhost:3000/event/"+$stateParams.id).success(function(data){
                
                console.log(data); 
           $scope.title =data.title
           $scope.adress=data.adress
           $scope.start_date=data.start_date
           $scope.start_time=data.start_time
           $scope.end_date=data.end_date
           $scope.end_time =data.end_time
           $scope.tinymce_content = data.description ,     
           $scope.file = data.image_album 
            }); 
        
           
            vm=this
            $scope.tinymce_content =""
            var $wizard_advanced_form = $('#wizard_advanced_form');

            
        
            $scope.finishedWizard = function() {
        
                console.log(document.getElementById("file").value)
                
                
                var form_serialized = JSON.stringify( utils.serializeObject($wizard_advanced_form), null, 2 );
                UIkit.modal.alert('<p>Wizard data:</p><pre>' + form_serialized + '</pre>');
        
                var result = JSON.parse(form_serialized); 

                
                
                                 
                
                
                
                
                   Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
};
                  
           var data = {
        adress : result.adress , 
        title : result.title, 
        start_date : result.start_date,
        start_time: result.start_time, 
        end_date : result.end_date,
        end_time : result.end_time,       
        description : result.subject    
               
            }
			
			
 var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            $http.put("http://localhost:3000/event/"+$stateParams.id, Object.toparams(data), config)
            .success(function (data, status, headers, config) {
         

			console.log(data)
          if(document.getElementById("file").value !="") 
              {
       vm.upload(vm.file, data._id)            
              }
      
			
            
            })
            .error(function (data, status, header, config) {
               
			console.log(data)
			
			});
            
       
            };
            
            
            $scope.submit = function(){
                                   $scope.upload($scope.file, id);       
            }
     vm.upload = function (file,id) {
        Upload.upload({
            url: 'http://localhost:3000/event/upload/'+id, //webAPI exposed to upload the file
            data:{file:file}, 
            arrayKey:""
            //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
            console.log('an error occured');
            console.log(resp)
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
          //  $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
            
            
        }
   ]);