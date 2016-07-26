import { Mongo } from 'meteor/mongo';

export const News = new Mongo.Collection('news');

News.allow({
  insert: function(userId){
    return true;
  },
  update: function(userId){
    return true;
  },
  remove: function (userId){
    return true;
  }
});