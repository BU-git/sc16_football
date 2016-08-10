import { Mongo } from 'meteor/mongo';

export const Members = new Mongo.Collection('members');

Members.allow({
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