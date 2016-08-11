import './calendar.html';

import { Events } from '../../api/events.js';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

var dimensions = {
  "mobile": 768,
  "tablet": 992
}

var pageParams = {
  homePage: {
    pageViews: {
      'mobile': 'basicDay',
      'tablet': 'basicWeek',
      'desktop': 'basicWeek'
    }
  },
  adminPage: {
    pageViews: {
      'mobile': 'basicDay',
      'tablet': 'basicWeek',
      'desktop': 'month'
    }
  },
  calendarPage: {
    pageViews: {
      'mobile': 'basicDay',
      'tablet': 'basicWeek',
      'desktop': 'month'
    }
  }
}
var calendarParams = {
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
    columnFormat: {
        month: 'ddd',
        week: 'dddd DD/MM',
        day: 'dddd DD/MM'
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
};

function applyDimension(pageName) {
  var windowWidth = $(window).width(),
    currentView,
    $calendar = $('#js-week-calendar');

  if (windowWidth < dimensions.mobile) {
    currentView = pageParams[pageName].pageViews.mobile;
  } else if (windowWidth > dimensions.mobile && windowWidth < dimensions.tablet) {
    currentView = pageParams[pageName].pageViews.tablet;
  } else {
    currentView = pageParams[pageName].pageViews.desktop;
  }

  $calendar.fullCalendar('changeView', currentView);
  $calendar.attr('class', "calendar fc fc-unthemed calendar--"+currentView)

}

Template.calendar.onCreated(function(){
    this.subscribe('events');
});

Template.calendar.onRendered(function () {
  var pageName = this.data;
  
  calendarParams.windowResize = function() {
    applyDimension(pageName);
  };

  if(pageName == "adminPage") {
    calendarParams.dayClick = function(date) {
      Session.set('eventModal', {
        type: 'add',
        date: date.format()
      });
      $('#add-edit-event-modal').modal('show');
    };
    calendarParams.eventClick = function(event) {
      Session.set('eventModal', {
        type: 'edit',
        event: event._id
      });
      $('#add-edit-event-modal').modal('show');
    };
  }

  $('#js-week-calendar').fullCalendar(calendarParams);
  applyDimension(pageName);

  Tracker.autorun(() => {
      Events.find().fetch();
      $('#js-week-calendar').fullCalendar('refetchEvents');
  });
})