import './sidebar-admin.html';

import { Template } from 'meteor/templating';
import { Enrolls } from '../../api/enrolls.js';

Template.sidebarAdmin.onCreated(function(){
    this.subscribe('enrolls');
});

Template.sidebarAdmin.helpers({
    unreadCount: function(){
        return Enrolls.find({"status": false}).count()
    }
})