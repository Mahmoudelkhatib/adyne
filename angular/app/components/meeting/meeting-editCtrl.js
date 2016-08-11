angular
    .module('altairApp')
    .controller('meeting-editCtrl', [
        '$scope',
        '$rootScope',
         'MeetingFactory', 
    'utils',
    '$http',
    "$resource",
    "$state", 
    "$stateParams", 
        function ($scope,$rootScope, MeetingFactory, utils,$http, $resource, $state,$stateParams) {
   
            $http.get("http://localhost:3000/meeting/"+$stateParams.id).success(function(data){
                
                $scope.selectize_a=data.type
                $scope.tinymce_content =data.subject ; 
                
                document.getElementById("date0").value=data.date.date_time.date
                document.getElementById("time0").value=data.date.date_time.time
                
                document.getElementById("date1").value=data.date1.date_time.date
                document.getElementById("time1").value=data.date1.date_time.time
                
                document.getElementById("date2").value=data.date2.date_time.date
                document.getElementById("time2").value=data.date2.date_time.time
                
                document.getElementById("date3").value=data.date3.date_time.date
                document.getElementById("time3").value=data.date3.date_time.time
     
                $scope.title= data.title; 
                $scope.adress = data.adress ; 
          


            }); 
        var input = document.getElementById('adress');
       var autocomplete = new google.maps.places.Autocomplete(input);

            
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
            

           $scope.selectize_a_data = {
                options: [
                    {
                        id: 1,
                        title: "Regular meeting",
                        value: "Regular meeting",
                        parent_id: 1
                    },
                    {
                        id: 2,
                        title: "Variable meeting",
                        value: "Variable meeting",
                        parent_id: 1
                    },
                    {
                        id: 3,
                        title: "Other type",
                        value: "Other type",
                        parent_id: 1
                    }
                   
                ]
            };

            $scope.selectize_a_config = {
                create: false,
                maxItems: 1,
                placeholder: 'Select...',
                optgroupField: 'parent_id',
                optgroupLabelField: 'title',
                optgroupValueField: 'ogid',
                valueField: 'value',
                labelField: 'title',
                searchField: 'title'
            };

            
            
var planets_data = $scope.selectize_planets_options = [
    /*            
    {id: 1, title: 'Mercury'},
                {id: 2, title: 'Venus'},
                {id: 3, title: 'Earth'},
                {id: 4, title: 'Mars'},
                {id: 5, title: 'Jupiter'},
                {id: 6, title: 'Saturn'},
                {id: 7, title: 'Uranus'},
                {id: 8, title: 'Neptune'}
                */
            ];
            
            
            $resource("http://localhost:3000/sub_admin").query().$promise.then(function(data)
                                                                                     {
                //planets_data.push({id: data[1]._id, title :data[1].lastName }); 
                for(var i =0 ; i<data.length; i++)
                    {
                        planets_data.push({id: data[i]._id, title :data[i].lastName + " "+data[i].firstName})
                    }
                console.log(planets_data); 
            }); 
            
            

            $scope.selectize_planets_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: null,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                create: false,
                render: {
                    option: function(planets_data, escape) {
                        return  '<div class="option">' +
                            '<span class="title">' + escape(planets_data.title) + '</span>' +
                            '</div>';
                    },
                    item: function(planets_data, escape) {
                        return '<div class="item"><a href="' + escape(planets_data.url) + '" target="_blank">' + escape(planets_data.title) + '</a></div>';
                    }
                }
            };





    
    
    

            

               

            $scope.tinymce_options = {
                skin_url: 'assets/skins/tinymce/material_design',
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table contextmenu paste"
                ],
                toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
            }

            $scope.show = function()
            {
                var result = document.getElementById("result").value ;
        //        console.log(result)
                if(result == "Regular meeting")
                    {
                         document.getElementById("1").style.visibility = "initial";
                         document.getElementById("2").style.visibility = "hidden";
                    }
                else if((result == "Variable meeting") || (result == "Other type")) {
                    document.getElementById("2").style.visibility = "initial";
                         document.getElementById("1").style.visibility = "hidden";
                }
            }
        
        
        
        
            
            
          
            
            
            $scope.submit = function() 
            {
                var $formValidate = $('#form_validation');
                var form_serialized = JSON.stringify( utils.serializeObject($formValidate), null, 2 );
                console.log(form_serialized); 
                
                var result = JSON.parse(form_serialized); 
                var members_result= JSON.parse(result.members); 
                console.log(members_result)
                
               Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
};
                  
           var data = {
        
        title : result.title,
        subject : result.subject,       
        adress : result.adress,
        type : result.type,
    
               date : JSON.stringify ({
         date_time : {
         date: result.date0,
         time : result.time0
       }
      
    }),
           
        date1 : JSON.stringify ({
         date_time : {
         date: result.date1,
         time : result.time1
       },
             vote : 0
      
    }),
        date2 : JSON.stringify ({
         date_time : {
         date: result.date2,
         time : result.time2
       },
             vote : 0
      
    }),
         date3 : JSON.stringify ({
         date_time : {
         date: result.date3,
         time : result.time3
       },
             vote : 0
      
    }),
             
                 
        members: JSON.stringify (members_result)         
             
            }       
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
			
			

            $http.put("http://localhost:3000/meeting/"+$stateParams.id, Object.toparams(data), config)
            .success(function (data, status, headers, config) {
         

				$state.go("restricted.meeting"); 
                                
			})
            .error(function (data, status, header, config) {
               
			console.log(data)
			
			});
            
            
            }
            
            
        
        }
    
    
    
    
    
    
    
    ]);