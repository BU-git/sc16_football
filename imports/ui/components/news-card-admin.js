import './news-card-admin.html';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';

var currentNews = new ReactiveVar("");

Template.newsCardAdmin.onCreated(function(){});

Template.newsCardAdmin.onRendered(function(){
    $('.js-btn-remove-news').confirmation({
        onConfirm: function(e, template){
            e.preventDefault();
            Meteor.call('removeNews', currentNews.get(), function(argument) {
                sAlert.success('Новость удалена')
            })
        },
        placement: 'top',
        title: "Вы уверены, что хотите удалить новость?",
        btnOkLabel: "Да",
        btnCancelLabel: "Отмена"
    });
})

Template.newsCardAdmin.events({
    'click .js-btn-edit-news': function(e, template){
        var data = this;
        data.addNews = false;
        Event.emit('openModal', data);
    },
    'click .js-btn-remove-news': function(){
        currentNews.set(this._id);
    }
    // 'click .js-btn-remove-news': function(e, template){
    //     Session.set('newsId', this._id)
    // }
})