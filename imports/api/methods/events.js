import { Meteor } from 'meteor/meteor'
import { Events } from '../events'
import { check } from 'meteor/check'


Meteor.methods({
    editEvent: function(event) {
        check( event, {
            _id: String,
            title: Match.Optional( String ),
            start: String,
            // end: String,
            place: Match.Optional( String ),
            time: String,
            duration: String
        });

        try {
            return Events.update( event._id, {
                $set: event
            });
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
    addEvent: function(event) {
        check( event, {
            title: String,
            start: String,
            // end: String,
            place: String,
            time: String,
            duration: String
    });

        try {
            return Events.insert( event );
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    },
    removeEvent: function(event) {
        check( event, String );

        try {
            return Events.remove( event );
        } catch ( exception ) {
            throw new Meteor.Error( '500', `${ exception }` );
        }
    }
});