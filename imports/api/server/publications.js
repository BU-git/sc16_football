import { Meteor } from 'meteor/meteor';
import { News } from '../news';
import { Images } from '../images';
import { Enrolls } from '../enrolls';

Meteor.publish('news', function () {
    return News.find();
});

Meteor.publish('enrolls', function () {
    return Enrolls.find();
});


Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});