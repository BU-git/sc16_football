import './admin-news-page.html';
import '../components/news-card-admin';
import '../components/add-news-modal';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';
import { Images } from '../../api/images.js';

Template.adminNewsPage.onCreated(function(){
    this.subscribe('news');
    this.subscribe('files.images.all');
    this.currentUpload = new ReactiveVar(false);
    this.thumbnailUrl = null;
});

Template.adminNewsPage.helpers({
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    },
    thumbnailUrl: function(){
        return Template.instance().thumbnailUrl;
    },
    news: function(){
        return News.find().fetch()
    }
});


Template.adminNewsPage.events({
    'click .js-btn-remove-news': function(e, template){
        var id = this._id;
        $(e.target).confirmation({
            onConfirm: function(e, template){
                News.remove(id);
                sAlert.success('Новость удалена')
            },
            placement: 'top',
            title: "Вы уверены, что хотите удалить новость?",
            btnOkLabel: "Да",
            btnCancelLabel: "Отмена"
        });
    },
    'click #js-open-modal': function(e, template) {
        Event.emit('openModal', {'addNews': true});
    }
});