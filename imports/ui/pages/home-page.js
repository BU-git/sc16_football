import './home-page.html';
import '../components/news-card';

import { Template } from 'meteor/templating';
import { News } from '../../api/news.js';
import { Events } from '../../api/events.js';
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
    if ($(window).width() > 768) {
        $('#js-week-calendar').fullCalendar({
            lang: 'ru',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNamesShort: ['янв', 'февр', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'],
            height: 'auto',
            contentHeight: 'auto',
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            defaultView: 'basicWeek',
            columnFormat: {
                month: 'ddd',
                week: 'dddd DD/MM',
                day: 'dddd DD/MM'
            },
            windowResize: function(view) {
                if ($(window).width() < 768) {
                   $('#js-week-calendar').fullCalendar('changeView', 'basicDay');
                }
            },
            events(start, end, timezone, callback) {
                let data = Events.find().fetch()
                if (data) {
                    callback(data);
                }
            },
            eventRender(event, element) {
                element.find('.fc-content').html(
                    '<div class="event__header"><div class="event__time"><span class="glyphicon glyphicon-time"></span> ' +
                    event.time + '</div><div class="event__place"><span class="glyphicon glyphicon-map-marker"></span> ' +
                    event.place + '</div></div><h4 class="event__title">' + event.title + '</h4>'
                );
            },
            dayRender: function(date, cell) {
                if (cell.hasClass('fc-today')) {
                    var index = cell.index(); // get the td offset
                    // find the corresponding item in header table
                    var header = $('#js-week-calendar thead.fc-head th').eq(index);
                    header.addClass('fc-today'); // update it with a class
                }
            }
        });
    } else{
        $('#js-week-calendar').fullCalendar({
            lang: 'ru',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNamesShort: ['янв', 'февр', 'март', 'апр', 'май', 'июн', 'июл', 'авг', 'сент', 'окт', 'нояб', 'дек'],
            height: 'auto',
            contentHeight: 'auto',
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            defaultView: 'basicDay',
            columnFormat: {
                month: 'ddd',
                week: 'dddd DD/MM',
                day: 'dddd DD/MM'
            },
            windowResize: function(view) {
                if ($(window).width() < 768) {
                   $('#js-week-calendar').fullCalendar('changeView', 'basicDay');
                }
            },
            events(start, end, timezone, callback) {
                let data = Events.find().fetch()
                if (data) {
                    callback(data);
                }
            },
            eventRender(event, element) {
                element.find('.fc-content').html(
                    '<div class="event__header"><div class="event__time"><span class="glyphicon glyphicon-time"></span> ' +
                    event.time + '</div><div class="event__place"><span class="glyphicon glyphicon-map-marker"></span> ' +
                    event.place + '</div></div><h4 class="event__title">' + event.title + '</h4>'
                );
            },
            dayRender: function(date, cell) {
                if (cell.hasClass('fc-today')) {
                    var index = cell.index(); // get the td offset
                    // find the corresponding item in header table
                    var header = $('#js-week-calendar thead.fc-head th').eq(index);
                    header.addClass('fc-today'); // update it with a class
                }
            }
        });
    }

    Tracker.autorun(() => {
        Events.find().fetch();
        $('#js-week-calendar').fullCalendar('refetchEvents');
    });
});

Template.homePage.onCreated(function(){
    this.subscribe('news');
    this.subscribe('events');
});

Template.homePage.helpers({
    news: function(){
        return News.find({}, {sort: {dateStamp: -1}, limit: 6}).fetch();
    }
});