import './home-page.html';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';

Template.homePage.onRendered(function() {
    var swiperHeader = $('.slider--header').swiper({
    //Your options here:
        mode:'horizontal',
        loop: true,
        autoplay: 3000,
        speed: 500,
        nextButton: '.slider--header .swiper-button-next',
        prevButton: '.slider--header .swiper-button-prev',
        paginationClickable: true,
        effect: 'fade'
        //etc..
    });
    var swiperSlogan = $('.slider--slogan').swiper({
    //Your options here:
        mode:'horizontal',
        loop: true,
        autoplay: 3000,
        speed: 500,
        nextButton: '.slider--slogan .swiper-button-next',
        prevButton: '.slider--slogan .swiper-button-prev',
        paginationClickable: true,
        effect: 'fade'
        //etc..
    });

});

Template.homePage.onCreated(function(){
    this.subscribe('news');
});

Template.homePage.helpers({
    news: function(){
        return News.find({}, {sort: {createdAt: 1}, limit: 6}).fetch();
    }
});