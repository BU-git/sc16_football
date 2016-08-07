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
                '<div class="event__header"><div class="event__time"><span class="glyphicon glyphicon-time"></span> ' +
                event.time + '</div><div class="event__place"><span class="glyphicon glyphicon-map-marker"></span> ' +
                event.place + '</div></div><h4 class="event__title">' + event.title + '</h4>'
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
