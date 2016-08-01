import './news-page.html';
import '../components/news-card';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';

Template.newsPage.onCreated(function(){
    this.subscribe('news');
});

Template.newsPage.helpers({
    news: function(){
        return News.find().fetch();
    }
});