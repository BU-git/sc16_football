import './enroll-modal.html';

import { Template } from 'meteor/templating';
import { Enrolls } from '../../api/enrolls.js';

Template.enrollModal.onCreated(function(){
    this.subscribe('enrolls');

});

Template.enrollModal.onRendered(function(){
    $( "#js-enroll" ).validate({
        rules: {
            parent: {
                required: true
            },
            child: {
                required: true
            },
            age: {
                required: true,
                range: [1, 18]
            },
            telephone: {
                required: true
            },
            email: {
                required: true
            }
        },
        messages: {
            parent: {
                required: "Введите Ваше имя",
                pattern: "Только буквы"
            },
            child: {
                required: "Введите имя ребенка",
                pattern: "Только буквы"
            },
            age: {
                required: "Введите возраст ребенка",
                range: "Введите число от 1 до 18",
                pattern: "Только числа от 1 до 18"
            },
            telephone: {
                required: "Введите номер телефона",
                pattern: "Введите номер телефона в формате (099)9999999"
            },
            email: {
                required: "Введите Вашу электронную почту",
                pattern: "Введите электронный адрес в формате name@sitename.com"
            }
        }
    });
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

        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();

        if(month.toString().length == 1) {
            var month = '0'+month;
        }
        if(day.toString().length == 1) {
            var day = '0'+day;
        }   
        if(hour.toString().length == 1) {
            var hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
            var minute = '0'+minute;
        }
        var dateStamp = day+'/'+month+'/'+year+' '+hour+':'+minute;

        Enrolls.insert({
            parent: parentVal,
            child: childVal,
            age: ageVal,
            phone: phoneVal,
            email: emailVal,
            school: schoolVal,
            status: false,
            dateStamp: dateStamp
        });

        template.find("#js-enroll").reset();
        $('.modal--enroll').modal('hide');
        sAlert.success('Ваша заявка успешно отправлена. Вам перезвонят');
    }
})