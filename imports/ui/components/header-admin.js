import './header-admin.html';

import { Template } from 'meteor/templating';

Template.headerAdmin.events({
    'click #logout': function(e) {
        e.preventDefault();
        Meteor.logout();
    }
});