
APPOINTMENT.activity.insertActivity = function() {
    $('#add_activity_form').on('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);

        $("#add_activity_form > div > small").text("");
        $("#add_activity_form > div > small").addClass('hidden');
        $("#add_activity_form > div > div > small").text("");
        $("#add_activity_form > div > div > small").addClass('hidden');
    
        $.ajax({
            type: 'POST',
            url: '/activity',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,

            success: function(data) {
                if(data.status === 'error') {
                    $.each(data.errors, function(key, value) {
                        $("#add_activity_form > div > small[name="+key+"]").text(value);
                        $("#add_activity_form > div > small[name="+key+"]").addClass('text-red-500').removeClass('hidden');

                        if(key === 'activity_date' || key === 'start_time' || key === 'end_time') {
                            $("#add_activity_form > div > div > small[name="+key+"]").text(value);
                            $("#add_activity_form > div > div > small[name="+key+"]").addClass('text-red-500').removeClass('hidden');
                        }
                    });
                } else {
                    alert(data.success);
                    location.reload();
                }
            },

            error: function(request, error) {
                //let errors = jQuery.parseJSON(request.responseText);
            }

        });
    });
}


APPOINTMENT.activity.fetchActivity = function() {

    $.ajax({
        type: 'GET',
        url: '/fetchActivity',

        success: function(data, status, xhr) {
            $.each(data.activity, function(key, value){

                var d = "<tr class='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'>"
                    + "<td class='px-6 py-4'>"
                    +value.aname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.atype + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.oname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.vname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.astatus + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.adate + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.startTime + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.endTime +"</td>"
                    + "<td>"
                    + "<button class='m-2 p-2 bg-blue-500 text-white rounded'>Update</button>"
                    + "<button class='m-2 p-2 bg-red-500 text-white rounded'>Cancel</button>"
                    + "</tr>";
                 $('#activity_data').append(d); 
            });
        },

        error: function(request, error) {
        }
    });
}

APPOINTMENT.activity.filterBasedOnType = function() {
    $('#type').on('change', function() {

    let appointmentType = $(this).val();
    let token = $("#search_form > input[type='hidden']").val();


    $.ajax({
        type: 'GET',
        url: '/filterBasedOnType',
        data: {
            _token: token,
            atype: appointmentType
        },


        success: function(data, status, xhr) {
            $('#activity_data').html("");

            if(data.activity.length === 0)
                $('#activity_data').html("<h1 class='text-2xl font-bold text-center'>No data available.</h1>");

            $.each(data.activity, function(key, value){

                var d = "<tr class='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'>"
                    + "<td class='px-6 py-4'>"
                    +value.aname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.atype + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.oname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.vname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.astatus + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.adate + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.startTime + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.endTime +"</td>"
                    + "<td>"
                    + "<button class='m-2 p-2 bg-blue-500 text-white rounded'>Update</button>"
                    + "<button class='m-2 p-2 bg-red-500 text-white rounded'>Cancel</button>"
                    + "</tr>";
                 $('#activity_data').append(d); 
            });
        },

        error: function(request, error) {
        }
    }); 
    });
}


APPOINTMENT.activity.filterBasedOnStatus = function() {  

    $('#filter_status').on('change', function(event) {

        let statusType = $(this).val();
        let token = $("#search_form > input[type='hidden']").val();

        $.ajax({
        type: 'GET',
        url: '/filterBasedOnStatus',
        data: {
            _token: token,
            status: statusType
        },


        success: function(data, status, xhr) {
            $('#activity_data').html("");

            if(data.activity.length === 0)
                $('#activity_data').html("<h1 class='text-2xl font-bold text-center'>No data available.</h1>");

            $.each(data.activity, function(key, value){

                var d = "<tr class='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'>"
                    + "<td class='px-6 py-4'>"
                    +value.aname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.atype + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.oname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.vname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.astatus + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.adate + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.startTime + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.endTime +"</td>"
                    + "<td>"
                    + "<button class='m-2 p-2 bg-blue-500 text-white rounded'>Update</button>"
                    + "<button class='m-2 p-2 bg-red-500 text-white rounded'>Cancel</button>"
                    + "</tr>";
                 $('#activity_data').append(d); 
            });
        },

        error: function(request, error) {
        }
    }); 
    });
}


APPOINTMENT.activity.filterBasedOnOfficer = function() {
    $('#filter_officer').on('change', function(event) {
         let officerID = $(this).val();
         let token = $("#search_form > input[type='hidden']").val();

        $.ajax({
        type: 'GET',
        url: '/filterBasedOnOfficer',
        data: {
            _token: token,
            id: officerID
        },


        success: function(data, status, xhr) {
            $('#activity_data').html("");

            if(data.activity.length === 0)
                $('#activity_data').html("<h1 class='text-2xl font-bold text-center'>No data available.</h1>");

            $.each(data.activity, function(key, value){

                var d = "<tr class='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'>"
                    + "<td class='px-6 py-4'>"
                    +value.aname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.atype + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.oname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.vname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.astatus + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.adate + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.startTime + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.endTime +"</td>"
                    + "<td>"
                    + "<button class='m-2 p-2 bg-blue-500 text-white rounded'>Update</button>"
                    + "<button class='m-2 p-2 bg-red-500 text-white rounded'>Cancel</button>"
                    + "</tr>";
                 $('#activity_data').append(d); 
            });
        },

        error: function(request, error) {
        }
    });
        
    });
}


APPOINTMENT.activity.filterBasedOnVisitor = function() {
    $('#filter_visitor').on('change', function(event) {
         let visitorID = $(this).val();
         let token = $("#search_form > input[type='hidden']").val();

    $.ajax({
        type: 'GET',
        url: '/filterBasedOnVisitor',
        data: {
            _token: token,
            id: visitorID
        },


        success: function(data, status, xhr) {
            $('#activity_data').html("");

            if(data.activity.length === 0)
                $('#activity_data').html("<h1 class='text-2xl font-bold text-center'>No data available.</h1>");

            $.each(data.activity, function(key, value){

                var d = "<tr class='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'>"
                    + "<td class='px-6 py-4'>"
                    +value.aname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.atype + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.oname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.vname + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.astatus + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.adate + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.startTime + "</td>"
                    + "<td class='px-6 py-4'>"
                    + value.endTime +"</td>"
                    + "<td>"
                    + "<button class='m-2 p-2 bg-blue-500 text-white rounded'>Update</button>"
                    + "<button class='m-2 p-2 bg-red-500 text-white rounded'>Cancel</button>"
                    + "</tr>";
                 $('#activity_data').append(d); 
            });
        },

        error: function(request, error) {
        }
    });
        
    });
}

APPOINTMENT.activity.filterBasedOnDate = function() {
    $('#filter_date_btn').on('click', function(event) {
        event.preventDefault();

        const startDate = $('#start_date').val();
        const endDate = $('#end_date').val();
        let token = $("#date_time_range > input[type='hidden']").val();


       if(startDate !== '' && endDate !== '') {
            
        $.ajax({
        type: 'GET',
        url: '/filterBasedOnDateRange',
        data: {
            _token: token,
            start_date: startDate,
            end_date: endDate
        },


        success: function(data, status, xhr) {
            $('#activity_data').html("");

                if(data.activity.length === 0)
                    $('#activity_data').html("<h1 class='text-2xl font-bold text-center'>No data available.</h1>");

                $.each(data.activity, function(key, value){

                    var d = "<tr class='border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700'>"
                        + "<td class='px-6 py-4'>"
                        +value.aname + "</td>"
                        + "<td class='px-6 py-4'>"
                        + value.atype + "</td>"
                        + "<td class='px-6 py-4'>"
                        + value.oname + "</td>"
                        + "<td class='px-6 py-4'>"
                        + value.vname + "</td>"
                        + "<td class='px-6 py-4'>"
                        + value.astatus + "</td>"
                        + "<td class='px-6 py-4'>"
                        + value.adate + "</td>"
                        + "<td class='px-6 py-4'>"
                        + value.startTime + "</td>"
                        + "<td class='px-6 py-4'>"
                        + value.endTime +"</td>"
                        + "<td>"
                        + "<button class='m-2 p-2 bg-blue-500 text-white rounded'>Update</button>"
                        + "<button class='m-2 p-2 bg-red-500 text-white rounded'>Cancel</button>"
                        + "</tr>";
                     $('#activity_data').append(d); 
                });
            },

            error: function(request, error) {
            }
        });     

       }

    });
}