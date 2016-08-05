import './admin-inbox-page.html';

import { Template } from 'meteor/templating';
import { Enrolls } from '../../api/enrolls.js';

Template.adminInboxPage.onCreated(function(){
    this.subscribe('enrolls');
});

Template.adminInboxPage.helpers({
    enrolls: function(){
        return Enrolls.find().fetch();
    },
    enrollsTableSettings: function () {
         return {
            id: "enrolls",
            collection: Enrolls.find(),
            showNavigationRowsPerPage: false,
            showNavigation: 'auto',
            showFilter: false,
            fields: [
                {
                    key: "dateStamp",
                    label: "Время"
                },
                {
                    key: "parent",
                    label: "Имя родителя"
                },
                {
                    key: "child",
                    label: "Имя ребенка"
                },
                {
                    key: "age",
                    label: "Возраст"
                },
                {
                    key: "phone",
                    label: "Телефон"
                },
                {
                    key: "email",
                    label: "Email"
                },
                {
                    key: "school",
                    label: "Школа"
                },
                {
                    key: "status",
                    label: "Статус",
                    fn: function(value, object){
                        if (value == true){
                            return new Spacebars.SafeString('Обработано <span class="js-responded glyphicon glyphicon-ok"></span>');
                        } else{
                            return new Spacebars.SafeString('Не обработано <span class="js-respond glyphicon glyphicon-ok"></span>');
                        }
                        
                    }
                },
                {
                    label: "",
                    fn: function(value, object){
                        return new Spacebars.SafeString('<span class="js-remove-enroll glyphicon glyphicon-trash"></span>');
                    }
                }
            ]
        };
    }
});

Template.adminInboxPage.events({
    'click #enrolls tr': function(e, template){
        var id = this._id;
        if($(e.target).hasClass('js-respond')){
            // mark as responded
            Enrolls.update({_id : this._id},{$set:{'status' : true}});
            sAlert.success('Заявка обработана');
        } else if($(e.target).hasClass('js-responded')){
            // mark as not responded
            Enrolls.update({_id : this._id},{$set:{'status' : false}});
            sAlert.success('Заявка не обработана');
        } else if($(e.target).hasClass('js-remove-enroll')){
            $(e.target).confirmation({
                onConfirm: function(e, template){
                    Enrolls.remove(id);
                },
                placement: 'left'
            });
        }
    }
});