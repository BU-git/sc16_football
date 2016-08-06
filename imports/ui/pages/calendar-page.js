import './calendar-page.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Events } from '../../api/events.js';

Template.calendarPage.onRendered(() => {
    $('#js-page-calendar').fullCalendar({
        lang: 'ru',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
            'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        height: 'auto',
        contentHeight: 'auto',
        monthNamesShort: ['янв', 'февр', 'апр', 'авг', 'сент', 'окт', 'нояб', 'дек'],
        defaultView: 'month',
        events(start, end, timezone, callback) {
            let data = Events.find().fetch();
            if (data) {
                callback(data);
            }
        },
        eventRender(event, element) {
            element.find('.fc-content').html(
                '<p><span class="glyphicon glyphicon-time"></span> ' + event.time + '</p>' +
                '<h4>' + event.title + '</h4>' +
                '<p><span class="glyphicon glyphicon-map-marker"></span> ' + event.place + '</p>'
            );
        }
    });

    Tracker.autorun(() => {
        Events.find().fetch();
        $('#js-page-calendar').fullCalendar('refetchEvents');
    });
});

Template.calendarPage.onCreated(function() {
    this.subscribe('events');
});
