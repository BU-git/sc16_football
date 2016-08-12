import './news-page.html';
import '../components/news-card';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';

Template.newsPage.onCreated(function(){
    var instance = this;
    // initialize the reactive variables
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(6);
    instance.autorun(function () {
        // get the limit
        var limit = instance.limit.get();
        // subscribe to the posts publication
        var subscription = instance.subscribe('news', limit);
        // if subscription is ready, set limit to newLimit
        if (subscription.ready()) {
          instance.loaded.set(limit);
        }
    });
    // cursor
    instance.news = function() { 
        return News.find({}, {sort: {dateStamp: -1}, limit: instance.loaded.get()});
    }
});

Template.newsPage.helpers({
    news: function(){
        return Template.instance().news();
    },
    hasMoreNews: function () {
        return Template.instance().news().count() >= Template.instance().limit.get();
    }
});

Template.newsPage.events({
    'click #js-load-more-news': function (event, instance) {
        event.preventDefault();
        // get current value for limit, i.e. how many posts are currently displayed
        var limit = instance.limit.get();
        // increase limit by 6 and update it
        limit += 6;
        instance.limit.set(limit);
    }
});