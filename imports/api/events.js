import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Events = new Mongo.Collection('events');

Events.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Events.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let EventsSchema = new SimpleSchema({
    'title': {
        type: String,
        label: 'The title of this event.'
    },
    'start': {
        type: String,
        label: 'When this event will start.'
    },
    'place': {
        type: String,
        label: 'What type of event is this?',
        allowedValues: ['Русановка', 'Соломенка']
    },
    'time': {
        type: String,
        label: 'Time of event'
    },
    'duration': {
        type: String,
        label: 'Duration of event'
    }
});
