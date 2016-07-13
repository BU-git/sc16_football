import { Meteor } from 'meteor/meteor';
import { Events } from '../events';

Meteor.publish('events', () => Events.find());