(function() {
  'use strict';

    $(document).ready(function() {
     
      // switch pages
      switch($('body').data('page-id')) {
        case 'officer':
          APPOINTMENT.officer.insertOfficerDetail();
          APPOINTMENT.officer.toggleOfficerStatus();
          APPOINTMENT.officer.editOfficer();
        break;
        case 'visitor':
          APPOINTMENT.visitor.insertVisitorDetail();
          APPOINTMENT.visitor.toggleVisitorStatus();
          APPOINTMENT.visitor.editVisitor();
        break;
        case 'activity':
          APPOINTMENT.activity.insertActivity();
          APPOINTMENT.activity.fetchActivity();
          APPOINTMENT.activity.filterBasedOnType();
          APPOINTMENT.activity.filterBasedOnStatus();
          APPOINTMENT.activity.filterBasedOnStatus();
        break;
        default:
          // nothing
      }

    });

})();