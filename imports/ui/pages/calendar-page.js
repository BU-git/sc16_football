import './calendar-page.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Events } from '../../api/events.js';

// Template.calendarPage.onRendered(() => {
//     $('#js-full-calendar').fullCalendar({
//         lang: 'ru',
//         monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
//             'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
//         ],
//         height: 'auto',
//         contentHeight: 'auto',
//         monthNamesShort: ['янв', 'февр', 'апр', 'авг', 'сент', 'окт', 'нояб', 'дек'],
//         defaultView: 'basicWeek',
//         events(start, end, timezone, callback) {
//             Events.find().fetch();
//             if (data) {
//                 callback(data);
//             }
//         },
//         eventRender(event, element) {
//             element.find('.fc-content').html(
//                 '<p>' + event.time + ' (Длительность: ' + event.duration + ')</p>' +
//                 '<h4>' + event.title + '</h4>' +
//                 // '<p class="guest-count">' + event.guests + '</p>' +
//                 '<p>' + event.place + '</p>'
//             );
//         },
//         dayClick(date) {
//             Session.set('eventModal', {
//                 type: 'add',
//                 date: date.format()
//             });
//             $('#add-edit-event-modal').modal('show');
//         },
//         eventClick(event) {
//             Session.set('eventModal', {
//                 type: 'edit',
//                 event: event._id
//             });
//             $('#add-edit-event-modal').modal('show');
//         }
//     });

//     Tracker.autorun(() => {
//         Events.find().fetch();
//         $('#js-full-calendar').fullCalendar('refetchEvents');
//     });
// });

// Template.calendarPage.onCreated(function() {
//     this.subscribe('events');
// });
