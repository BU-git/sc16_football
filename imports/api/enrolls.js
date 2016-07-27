import { Mongo } from 'meteor/mongo';

export const Enrolls = new Mongo.Collection('enrolls');

Enrolls.allow({
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