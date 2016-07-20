import './login-page.html';

import { Template } from 'meteor/templating';

Template.loginPage.events({
    'submit form'(e) {
        e.preventDefault();
        // Get our input values
        var el = $(e.target);
        var email = el.find("#email").val();
        var password = el.find("#password").val();

        // Login user
        Meteor.loginWithPassword(email, password, (er)=>{
          FlowRouter.go('/admin');
        });
    }
});