import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main-layout.js';
import '../../ui/layouts/admin-layout.js';

import '../../ui/components/header.js';
import '../../ui/components/header-admin.js';
import '../../ui/components/sidebar-admin.js';
import '../../ui/components/footer.js';
import '../../ui/components/enroll-modal.js';

import '../../ui/pages/login-page.js';
import '../../ui/pages/admin-page.js';
import '../../ui/pages/admin-news-page.js';
import '../../ui/pages/admin-inbox-page.js';
import '../../ui/pages/admin-calendar-page.js';

import '../../ui/pages/home-page.js';
import '../../ui/pages/about-page.js';
import '../../ui/pages/contact-page.js';
import '../../ui/pages/team-page.js';
import '../../ui/pages/gallery-page.js';
import '../../ui/pages/news-page.js';
import '../../ui/pages/calendar-page.js';
import '../../ui/pages/add-event.js';

import '../../ui/pages/not-found.js';

import adminUser from '../../modules/admin-user';

FlowRouter.route('/about', {
  name: 'aboutPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'aboutPage', header: 'header'});
  },
});

FlowRouter.route('/', {
  name: 'homePage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'homePage', header: 'header'});
  },
});

FlowRouter.route('/contact', {
  name: 'contactPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'contactPage', header: 'header'});
  },
});

FlowRouter.route('/gallery', {
  name: 'galleryPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'galleryPage', header: 'header'});
  },
});

FlowRouter.route('/team', {
  name: 'teamPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'teamPage', header: 'header'});
  },
});

FlowRouter.route('/news', {
  name: 'newsPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'newsPage', header: 'header'});
  },
});

FlowRouter.route('/calendar', {
  name: 'calendarPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'calendarPage', header: 'header'});
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('mainLayout', { main: 'notFound', header: 'header'});
  },
};



// /////////
// admin///
// ///////

FlowRouter.route('/login', {
  name: 'loginPage',
  action() {
    Tracker.autorun(function() {
      if(!Meteor.loggingIn()) {
        if(!adminUser(Meteor.userId())) {
          BlazeLayout.render('adminLayout', { main: 'loginPage' });
        } else {
          FlowRouter.go('/admin');
        }
      }
    });
  }
});

FlowRouter.route('/admin', {
  name: 'adminPage',
  action() {
    Tracker.autorun(function() {
      if(!Meteor.loggingIn()) {
        if(!adminUser(Meteor.userId())) {
          FlowRouter.go('/login');
        } else {
          BlazeLayout.render('adminLayout', { main: 'adminPage', sidebar: 'sidebarAdmin' });
        }
      }
    });
  }
});

FlowRouter.route('/admin/news', {
  name: 'adminNewsPage',
  action() {
    Tracker.autorun(function() {
      if(!Meteor.loggingIn()) {
        if(!adminUser(Meteor.userId())) {
          FlowRouter.go('/login');
        } else {
          BlazeLayout.render('adminLayout', { main: 'adminNewsPage', sidebar: 'sidebarAdmin' });
        }
      }
    });
  }
});

FlowRouter.route('/admin/inbox', {
  name: 'adminInboxPage',
  action() {
    Tracker.autorun(function() {
      if(!Meteor.loggingIn()) {
        if(!adminUser(Meteor.userId())) {
          FlowRouter.go('/login');
        } else {
          BlazeLayout.render('adminLayout', { main: 'adminInboxPage', sidebar: 'sidebarAdmin' });
        }
      }
    });
  }
});

FlowRouter.route('/admin/calendar', {
  name: 'adminCalendarPage',
  action() {
    Tracker.autorun(function() {
      if(!Meteor.loggingIn()) {
        if(!adminUser(Meteor.userId())) {
          FlowRouter.go('/login');
        } else {
          BlazeLayout.render('adminLayout', { main: 'adminCalendarPage', sidebar: 'sidebarAdmin' });
        }
      }
    });
  },
});
