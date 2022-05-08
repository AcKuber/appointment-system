
/**
 * methods for inserting officer details 
 */
APPOINTMENT.officer.insertOfficerDetail = function() {

    $('#add_officer_form').on('submit', function(event) {
        const formData = new FormData(this);
        
        $.ajax({
            type: 'POST',
            url: '/officer',
            data: formData,

            success: function(data) {
                alert(data);
            },

            error: function(request, error) {
                let errors = jQuery.parseJSON(request.responseText);
                
                $.each(errors, function(key, value) {
                    $("#add_officer_form > .form-group > small[name="+key+"]").text(value);
                    $("#add_officer_form > .form-group > small[name="+key+"]").addClass('text-red-500 visible');
                });
            }

        });
        event.preventDefault();

    });
}