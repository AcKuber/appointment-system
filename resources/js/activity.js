
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