angular
    .module('altairApp')
    
    .controller('eventCtrl',
        function($compile, $scope, $timeout, $resource, DTOptionsBuilder, DTColumnDefBuilder , uiCalendarConfig , $resource, $state, utils, MeetingFactory, $http) {
            
   
    $scope.delete = function (id)
    {
        console.log(id)
        $http.delete("http://localhost:3000/event/"+id).success(function(data){
            

for(var i=0; i<$scope.dt_data.length; i++ ) 
             {
                 if($scope.dt_data[i]._id == id)
                     {
                         console.log($scope.dt_data[i]); 
                        $scope.dt_data.splice(i,1);  
                     }
             }
        
         for(var i=0; i<$scope.eventSources[0].length; i++ ) 
             {
                 if($scope.eventSources[0][i].id ==id)
                     {
                       //  console.log($scope.eventSources[0][i]); 
                         $scope.eventSources[0].splice(i,1); 
                     }
             }
        })
      
     
     

            
    }
   
                   
        //var vm = this;
        $scope.dtInstance = {};
        $scope.dt_data = [];
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withOption('initComplete', function() {
                $timeout(function() {

                    var $dt_tableTools = $scope.dtInstance.dataTable;
                    dt_tabletTools = $scope.dtInstance.DataTable;

                    var tt = new $.fn.dataTable.TableTools(dt_tabletTools, {
                        "sSwfPath": "bower_components/datatables-tabletools/swf/copy_csv_xls_pdf.swf"
                    });
                    $( tt.fnContainer() ).insertBefore( $dt_tableTools.closest('.dt-uikit').find('.dt-uikit-header'));

                    $('body').on('click',function(e) {
                        if($('body').hasClass('DTTT_Print')) {
                            if ( !$(e.target).closest(".DTTT").length && !$(e.target).closest(".uk-table").length) {
                                var esc = $.Event("keydown", { keyCode: 27 });
                                $('body').trigger(esc);
                            }
                        }
                    });
                    $compile($('.dt-uikit .md-input'))($scope);
                })

            });

       $resource('http://localhost:3000/event/all')
                .query()
                .$promise
                .then(function(dt_data) {
                $scope.dt_data = dt_data;
                });

    
    
    $scope.randID_generator = function() {
                var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                return randLetter + Date.now();
            };

            $scope.color_picker = function(object,pallete) {
                if(object) {
                    var cp_id = $scope.randID_generator(),
                        cp_pallete = pallete ? pallete : ['#e53935','#d81b60','#8e24aa','#5e35b1','#3949ab','#1e88e5','#039be5','#0097a7','#00897b','#43a047','#689f38','#ef6c00','#f4511e','#6d4c41','#757575','#546e7a'],
                        cp_pallete_length = cp_pallete.length,
                        cp_wrapper = $('<div class="cp_altair" id="'+cp_id+'"/>');

                    for(var $i=0;$i<cp_pallete_length;$i++) {
                        cp_wrapper.append('<span data-color=' + cp_pallete[$i] + ' style="background:' + cp_pallete[$i] + '"></span>');
                    }

                    cp_wrapper.append('<input type="hidden">');

                    $('body').on('click', '#'+cp_id+' span',function() {
                        $(this)
                            .addClass('active_color')
                            .siblings().removeClass('active_color')
                            .end()
                            .closest('.cp_altair').find('input').val($(this).attr('data-color'));
                    });
                    return object.append(cp_wrapper);

                }
            };

            $scope.calendarColorPicker = $scope.color_picker($('<div id="calendar_colors_wrapper"></div>')).prop('outerHTML');

            $scope.uiConfig = {
                calendar: {
                    header: {
                        left: 'title today',
                        center: '',
                        right: 'month,agendaWeek,agendaDay prev,next'
                    },
                    buttonIcons: {
                        prev: 'md-left-single-arrow',
                        next: 'md-right-single-arrow',
                        prevYear: 'md-left-double-arrow',
                        nextYear: 'md-right-double-arrow'
                    },
                    buttonText: {
                        today: ' ',
                        month: ' ',
                        week: ' ',
                        day: ' '
                    },
                    aspectRatio: 2.1,
                    defaultDate: moment(),
                    selectable: true,
                    selectHelper: true,
                    select: function (start, end) {
                        UIkit.modal.prompt('' +
                            '<h3 class="heading_b uk-margin-medium-bottom">New Event</h3><div class="uk-margin-medium-bottom" id="calendar_colors">' +
                            'Event Color:' +
                            $scope.calendarColorPicker +
                            '</div>' +
                            'Event Title:',
                            '', function (newvalue) {
                                if ($.trim(newvalue) !== '') {
                                    var eventData,
                                        eventColor = $('#calendar_colors_wrapper').find('input').val();
                                    eventData = {
                                        title: newvalue,
                                        start: start,
                                        end: end,
                                        color: eventColor ? eventColor : ''
                                    };
                                    uiCalendarConfig.calendars.myCalendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                                    uiCalendarConfig.calendars.myCalendar.fullCalendar('unselect');
                                }
                            }, {
                                labels: {
                                    Ok: 'Add Event'
                                }
                            });
                    },
                    editable: true,
                    eventLimit: true,
                    timeFormat: '(HH)(:mm)'
                }
            };

        
            
          
            $scope.eventSources = [$resource("http://localhost:3000/event/calendar").query()]; 

 //
    
            
            



    
    
    
    $scope.get = function(id)
    {
      console.log(id);  
       
        for(var i=0 ; i<$scope.dt_data.length; i++)
            {
       if($scope.dt_data[i]._id===id)
           {$scope.dragulaItems = [];
               console.log($scope.dt_data[i]);
       for(var j=0 ; i<$scope.dt_data[i].participants.length; j++)
           {
            $scope.dragulaItems.push({background_image :$scope.dt_data[i].participants[j].avatar,
            description :$scope.dt_data[i].participants[j].firstName +" "+$scope.dt_data[i].participants[j].lastName  })    
           }
           }
            }
        console.log($scope.dragulaItems); 
    }
    // $scope.dragulaItems.push({background_image :$scope.dt_data[i].})
/*    
     var imgRetina = utils.isHighDensity() ? '@2x' : '' ;

            $scope.dragulaItems = [
                {
                    background_image: 'assets/img/gallery/Image01.jpg',
                    description: 'Mahmoud Elkhatib'
                },
                {
                    background_image: 'assets/img/gallery/Image02.jpg',
                    description: 'Mahmoud Elkhatib'
                },
                {
                    background_image: 'assets/img/gallery/Image03.jpg',
                    description: 'Mahmoud Elkhatib'
                },
                {
                    background_image: 'assets/img/gallery/Image04.jpg',
                    description: 'Mahmoud Elkhatib'
                },
                {
                    background_image: 'assets/img/gallery/Image05.jpg',
                    description: 'Mahmoud Elkhatib'
                },
                {
                    background_image: 'assets/img/gallery/Image06.jpg',
                    description: 'Mahmoud Elkhatib'
                },
                {
                    background_image: 'assets/img/gallery/Image07.jpg',
                    description: 'Mahmoud Elkhatib'
                },
                {
                    background_image: 'assets/img/gallery/Image08.jpg',
                    description: 'Mahmoud Elkhatib'
                }
            ];

*/


}
    
   
        
    );