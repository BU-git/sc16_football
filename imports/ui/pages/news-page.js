import './news-page.html';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';

Template.newsPage.onCreated(function(){
    this.subscribe('news');

    console.log(2);
});

Template.newsPage.helpers({
    news: function(){
        return News.find().fetch();
    }
});