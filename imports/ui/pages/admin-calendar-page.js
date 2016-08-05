import './admin-calendar-page.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Events } from '../../api/events.js';

Template.adminCalendarPage.onRendered(() => {
    $('#js-full-calendar').fullCalendar({
        lang: 'ru',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
            'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        monthNamesShort: ['янв', 'февр', 'апр', 'авг', 'сент', 'окт', 'нояб', 'дек'],
        events(start, end, timezone, callback) {
            let data = Events.find().fetch().map((event) => {
                event.editable = !isPast(event.start);
                return event;
            });

            if (data) {
                callback(data);
            }
        },
        eventRender(event, element) {
            element.find('.fc-content').html(
                '<p>' + event.time + '</p>' +
                '<h4>' + event.title + '</h4>' +
                '<p><span class="glyphicon glyphicon-map-marker"></span> ' + event.place + '</p>'
            );
        },
        dayClick(date) {
            Session.set('eventModal', {
                type: 'add',
                date: date.format()
            });
            $('#add-edit-event-modal').modal('show');
        },
        eventClick(event) {
            Session.set('eventModal', {
                type: 'edit',
                event: event._id
            });
            $('#add-edit-event-modal').modal('show');
        }
    });

    Tracker.autorun(() => {
        Events.find().fetch();
        $('#js-full-calendar').fullCalendar('refetchEvents');
    });
});

Template.adminCalendarPage.onCreated(function() {
    this.subscribe('events');
});

let isPast = (date) => {
    let today = moment().format();
    return moment(today).isAfter(date);
};
