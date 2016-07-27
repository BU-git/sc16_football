import './home-page.html';

import { Template } from 'meteor/templating';

Template.homePage.onRendered(function() {
    var mySwiper = $('.slider--header').swiper({
    //Your options here:
        mode:'horizontal',
        loop: true,
        autoplay: 3000,
        speed: 500,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        effect: 'fade'
        //etc..
    });
    var mySwiper = $('.slider--slogan').swiper({
    //Your options here:
        mode:'horizontal',
        loop: true,
        autoplay: 3000,
        speed: 500,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        effect: 'fade'
        //etc..
    });

});
