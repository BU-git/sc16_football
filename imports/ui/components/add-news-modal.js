import './add-news-modal.html';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';
import { Images } from '../../api/images.js';

var currentNews = new ReactiveVar({});

Template.addNewsModal.onCreated(function() {
    this.subscribe('news');
    Event.on('openModal', function(newsObj) {
        currentNews.set(newsObj);
    });
    this.currentUpload = new ReactiveVar(false);
    this.thumbnailUrl = null;
});

Template.addNewsModal.helpers({
    currentNews: function(){
        return currentNews.get();
    },
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    },
    thumbnailUrl: function(){
        return Template.instance().thumbnailUrl;
    }
});

Template.addNewsModal.events({
    'click #js-submit-add-news': function(e, template) {
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
        dateStamp = new Date;

        var titleVal = $('#js-news-title').val();
        var descriptionVal = $('#js-news-desc').val();
        var thumbnail = template.thumbnailUrl;

        News.insert({
            title: titleVal,
            description: descriptionVal,
            thumbnail: thumbnail,
            date: today,
            dateStamp: dateStamp
        });

        $('.modal--add-news').modal('hide');
        sAlert.success('Новость успешно добавлена!')
        template.find("#js-add-news").reset();
    },
    'click #js-submit-edit-news': function(e, template) {
        e.preventDefault();
        var titleVal = $('#js-news-title').val();
        var descriptionVal = $('#js-news-desc').val();

        News.update(this._id, {
            $set: {
                title: titleVal,
                description: descriptionVal,
            }
        });

        $('.modal--add-news').modal('hide');
        sAlert.success('Новость успешно добавлена!')
        template.find("#js-add-news").reset();
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