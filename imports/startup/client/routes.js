import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main-layout.js';
import '../../ui/components/header.js';
import '../../ui/components/footer.js';

import '../../ui/pages/home-page.js';
import '../../ui/pages/about-page.js';
import '../../ui/pages/contact-page.js';
import '../../ui/pages/team-page.js';

FlowRouter.route('/about', {
  name: 'aboutPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'aboutPage', header: 'header', footer: 'footer' });
  },
});

FlowRouter.route('/', {
  name: 'homePage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'homePage', header: 'header', footer: 'footer' });
  },
});

FlowRouter.route('/contact', {
  name: 'contactPage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'contactPage', header: 'header', footer: 'footer' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('mainLayout', { main: 'notFound' });
  },
};