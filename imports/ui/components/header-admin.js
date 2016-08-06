import './header-admin.html';

import { Template } from 'meteor/templating';

import { Enrolls } from '../../api/enrolls.js';

Template.headerAdmin.onCreated(function(){
    this.subscribe('enrolls');
});

Template.headerAdmin.helpers({
    unreadCount: function(){
        return Enrolls.find({"status": false}).count()
    }
});

Template.headerAdmin.events({
    'click #logout': function(e) {
        e.preventDefault();
        Meteor.logout();
    }
});
