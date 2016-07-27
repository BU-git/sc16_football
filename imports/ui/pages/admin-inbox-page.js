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
                    key: "parent",
                    label: "Имя родителя"
                },
                {
                    key: "child",
                    label: "Имя ребенка"
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
                            return new Spacebars.SafeString('<span>Ответили</span>');
                        } else{
                            return new Spacebars.SafeString('<span>Ожидает ответа</span>');
                        }
                        
                    }
                }
            ]
        };
    }
});