angular
    .module('altairApp')
    .controller('member_createCtrl', [
        '$rootScope',
        '$scope',
        'user_data',
        'groups_data',
        '$http',
         'utils',
    'Upload',
    '$state',

        function ($rootScope,$scope,user_data,groups_data, $http,utils, Upload,$state) {

            /*
            var $formValidate = $('#form_validation');
            $formValidate
                .parsley()
                .on('form:validated',function() {
                    $scope.$apply();
                
                })
                .on('field:validated',function(parsleyField) {
                    if($(parsleyField.$element).hasClass('md-input')) {
                        $scope.$apply();
                        
                    }
                
               
                });
            */
            
        $scope.submit= function() {
            
     /*
     
     */
            
            var $formValidate = $('#form_validation');
                var form_serialized = JSON.stringify( utils.serializeObject($formValidate), null, 2 );
                 var result = JSON.parse(form_serialized); 
            console.log(result); 
            
            
                Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
};
                  
           var data = {
        
      username : result.Email,
      lastName : result.lastName,
      firstName : result.firstName,
      Email : result.Email ,
      phone : result.phone,
      description :result.description,
      adress : result.adress, 
      company : result.company,
      facebook : result.fb, 
      twitter : result.twitter,
      google : result.google,          
      role : result.role, 
      linkedin : result.linkedin,            
      password : "esprit2016"            
        
            }       
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
			
			

            $http.post("http://localhost:3000/register", Object.toparams(data), config)
            .success(function (data, status, headers, config) {
                 console.log(data);
            $scope.upload($scope.file, data._id);
				  
                $state.go("restricted.contact_list"); 
                                
		//  $scope.upload($scope.file);
            })
            .error(function (data, status, header, config) {
               
			console.log(data)
			
			});
            
            
            
            
        }
        
        
        $scope.upload = function (file, id) {
        Upload.upload({
            url: 'http://localhost:3000/upload/'+id, //webAPI exposed to upload the file
            data:{file:file},  //pass file as data, should be user ng-model
            //arrayKey: ''
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                console.log('an error occured');
                console.log(resp)
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            console.log('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            //$scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
        
        
        
            
            var input = document.getElementById('adress');
     //   var autocomplete = new google.maps.places.Autocomplete(input);

            
            

            // user role
            $scope.user_role_config = {
                valueField: 'value',
                labelField: 'title',
                create: false,
                maxItems: 1,
                placeholder: 'Select...'
            };

            $scope.user_role_options = [
                {
                    "value": "Partner",
                    "title": "Partner"
                },
                {
                    "value": "Contact",
                    "title": "Contact"
                }
            ];

            // groups
            $scope.all_groups = groups_data;

            
        }
    ])
;