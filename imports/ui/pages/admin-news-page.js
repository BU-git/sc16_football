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
    'change #js-thumbnail-input': function (e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case 
            // multiple files were selected
            var upload = Images.insert({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);

            upload.on('start', function () {
                template.currentUpload.set(this);
            });

            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert('Error during upload: ' + error);
                } else {
                    template.thumbnailUrl = Images.link(fileObj);
                }
                template.currentUpload.set(false);
            });

            upload.start();
        }
    },
    'click .js-btn-remove-news': function(e, template){
        News.remove(this._id);
        sAlert.success('Новость удалена')
    },
    // 'submit #js-form-edit-news': function(e, template) {
    //     $('.js-modal-edit-news').modal('hide')
    // },
    'click #js-open-modal': function(e, template) {
        Event.emit('openModal', {'addNews': true});
    }

});