import './home-page.html';
import '../components/news-card';
import '../components/calendar';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';
import { Session } from 'meteor/session';

Template.homePage.onRendered(function() {
    var swiperHeader = $('.slider--header').swiper({
        mode:'horizontal',
        loop: true,
        autoplay: 10000,
        speed: 500,
        nextButton: '.slider--header .swiper-button-next',
        prevButton: '.slider--header .swiper-button-prev',
        paginationClickable: true,
        effect: 'fade'
    });
    var swiperSlogan = $('.slider--slogan').swiper({
        mode:'horizontal',
        loop: true,
        autoplay: 10000,
        speed: 500,
        nextButton: '.slider--slogan .swiper-button-next',
        prevButton: '.slider--slogan .swiper-button-prev',
        paginationClickable: true,
        effect: 'fade'
    });
});

Template.homePage.onCreated(function(){
    this.subscribe('news');
});

Template.homePage.helpers({
    news: function(){
        return News.find({}, {sort: {dateStamp: -1}, limit: 6}).fetch();
    }
});