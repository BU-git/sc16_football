import './sidebar-admin.html';

import { Template } from 'meteor/templating';
import { Enrolls } from '../../api/enrolls.js';

Template.sidebarAdmin.onCreated(function(){
    this.subscribe('enrolls');
});

Template.sidebarAdmin.helpers({
    unreadCount: function(){
        var enrolls = Enrolls.find();

        var count = 0;
        enrolls.forEach(function(enrolls){
            if(this.status == false){
                count++
            }
        });

        return count;
    }
})