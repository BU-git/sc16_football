import './news-card-admin.html';

import { Template } from 'meteor/templating';

Template.newsCardAdmin.onCreated(function(){
    console.log(this)
});

Template.newsCardAdmin.events({
    'click .js-btn-edit-news': function(e, template){
        var data = this;
        data.addNews = false;
       Event.emit('openModal', data);
    }
})