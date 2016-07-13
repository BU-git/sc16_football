import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/main-layout.js';
import '../../ui/pages/home-page.js';
import '../../ui/pages/not-found.js';


FlowRouter.route('/', {
  name: 'homePage',
  action() {
    BlazeLayout.render('mainLayout', { main: 'homePage' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('mainLayout', { main: 'notFound' });
  },
};