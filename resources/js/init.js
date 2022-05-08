(function() {
  'use strict';

    $(document).ready(function() {
     
      // switch pages
      switch($('body').data('page-id')) {
        case 'officer':
          APPOINTMENT.officer.insertOfficerDetail();
        break;
        default:
          // nothing
      }

    });

})();