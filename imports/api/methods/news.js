import { Meteor } from 'meteor/meteor'
import { News } from '../news'


Meteor.methods({
    removeNews: function(newsId) {
        News.remove(newsId);
    }
});