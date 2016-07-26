import { Meteor } from 'meteor/meteor';
import { News } from '../news';
import { Images } from '../images';

// Meteor.publish('news', () => News.find());

Meteor.publish('news', function () {
    return News.find();
});

Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});