import './enroll-modal.html';

import { Template } from 'meteor/templating';
import { Enrolls } from '../../api/enrolls.js';

Template.enrollModal.onCreated(function(){
    this.subscribe('enrolls');
});

Template.enrollModal.events({
    'submit #js-enroll': function(e, template) {
        e.preventDefault();

        var parentVal = $('#js-enroll-parent').val().trim();
        var childVal = $('#js-enroll-child').val().trim();
        var ageVal = $('#js-enroll-age').val().trim();
        var phoneVal = $('#js-enroll-phone').val().trim();
        var emailVal = $('#js-enroll-email').val().trim();
        var schoolVal = $( "#js-enroll-school option:selected" ).text();

        Enrolls.insert({
            parent: parentVal,
            child: childVal,
            age: ageVal,
            phone: phoneVal,
            email: emailVal,
            school: schoolVal,
            status: false
        });

        $('#js-enroll').modal('hide');
        sAlert.success('Ваша заявка успешно отправлена. Вам перезвонят');
    }
})