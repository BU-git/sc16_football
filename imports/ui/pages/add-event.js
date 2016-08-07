import './add-event.html';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Events } from '../../api/events.js';

Template.addEditEventModal.helpers({
    modalType(type) {
        let eventModal = Session.get('eventModal');
        if (eventModal) {
            return eventModal.type === type;
        }
    },
    modalLabel() {
        let eventModal = Session.get('eventModal');

        if (eventModal) {
            return {
                button: eventModal.type === 'edit' ? 'Edit' : 'Add',
                label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
            };
        }
    },
    selected(v1, v2) {
        return v1 === v2;
    },
    event() {
        let eventModal = Session.get('eventModal');

        if (eventModal) {
            return eventModal.type === 'edit' ? Events.findOne(eventModal.event) : {
                start: eventModal.date,
                // end: eventModal.date
            };
        }
    }
});

Template.adminCalendarPage.onRendered(function() {
    this.$('.timepicker').datetimepicker({
        format: 'LT',
        widgetPositioning: {
            "vertical": "bottom",
            "horizontal": "left"
        },
        locale: moment.locale('ru')
    });
    this.$('.durationpicker').datetimepicker({
        format: 'LT',
        widgetPositioning: {
            "vertical": "bottom",
            "horizontal": "left"
        },
        locale: moment.locale('ru')
    });
});

Template.addEditEventModal.events({
    'submit form' (event, template) {
        event.preventDefault();

        let eventModal = Session.get('eventModal'),
            submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
            eventItem = {
                title: template.find('[name="title"]').value,
                start: template.find('[name="start"]').value,
                // end: template.find('[name="end"]').value,
                place: template.find('[name="place"] option:selected').value,
                time: template.find('input.time').value,
                duration: template.find('input.duration').value
                    // guests: parseInt( template.find( '[name="guests"]' ).value, 10 )
            };

        if (submitType === 'editEvent') {
            eventItem._id = eventModal.event;
        }

        Meteor.call(submitType, eventItem, (error) => {
            if (error) {
                sAlert.success(error.reason, 'danger');
            } else {
                sAlert.success('Событие отредактировано!');
                closeModal();
            }
        });
    },
    'click .delete-event' (event, template) {
        let eventModal = Session.get('eventModal');
        if (confirm('Are you sure? This is permanent.')) {
            Meteor.call('removeEvent', eventModal.event, (error) => {
                if (error) {
                    sAlert.success(error.reason);
                } else {
                    sAlert.success('Событие удалено!');
                    closeModal();
                }
            });
        }
    }
});

let closeModal = () => {
    $('#add-edit-event-modal').modal('hide');
    $('.modal-backdrop').fadeOut();
};