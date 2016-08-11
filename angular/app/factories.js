angular
    .module('altairApp')
    .factory('EventFactory', function($resource){
    return {
       resource : function()
        {
        
return $resource('http://localhost:3000/event/:id',{ id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });        
            
        
        }
    }
                    
})
.factory('MeetingFactory', function($resource){
    return {
       resource : function()
        {
        
return $resource('http://localhost:3000/meeting/:id',{ id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });        
            
        
        }
    }
                    
})

//http://localhost:3000/meeting

