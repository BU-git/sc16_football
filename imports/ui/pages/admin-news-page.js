import './admin-news-page.html';

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
    'submit #js-add-news': function(e, template) {
        e.preventDefault();
        // get today date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        }
        today = dd+'/'+mm+'/'+yyyy;

        var titleVal = $('#js-news-title').val();
        var descriptionVal = $('#js-news-desc').val();
        var thumbnail = template.thumbnailUrl;

        News.insert({
            title: titleVal,
            description: descriptionVal,
            thumbnail: thumbnail,
            date: today
        });

    },
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
    }
});