
/**
 * methods for inserting officer details 
 */
APPOINTMENT.officer.insertOfficerDetail = function() {

    $('#add_officer_form').on('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);

        $("#add_officer_form > div > small").text("");
        $("#add_officer_form > div > small").addClass('hidden');
        $("#add_officer_form > div > div > small").text("");
        $("#add_officer_form > div > div > small").addClass('hidden');
    
        $.ajax({
            type: 'POST',
            url: '/officer',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,

            success: function(data) {
                if(data.status === 'error') {
                    $.each(data.errors, function(key, value) {
                        $("#add_officer_form > div > small[name="+key+"]").text(value);
                        console.log(key+": "+value);
                        $("#add_officer_form > div > small[name="+key+"]").addClass('text-red-500').removeClass('hidden');

                        if(key === 'start_time' || key === 'end_time') {
                            $("#add_officer_form > div > div > small[name="+key+"]").text(value);
                            $("#add_officer_form > div > div > small[name="+key+"]").addClass('text-red-500').removeClass('hidden');
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