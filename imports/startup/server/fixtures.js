import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

const users = [{
  email: Meteor.settings.stripe ? Meteor.settings.stripe.adminEmail : 'tan9seb@gmail.com',
  password: Meteor.settings.stripe ? Meteor.settings.stripe.adminPass : 'admin',
  profile: {
    name: { first: 'Admin', last: 'Admin' },
  },
  roles: ['admin'],
}];

users.forEach(({ email, password, profile, roles }) => {
  const userExists = Meteor.users.findOne({ 'emails.address': email });

  if (!userExists) {
    const userId = Accounts.createUser({ email, password, profile });
    Roles.addUsersToRoles(userId, roles);
  }
});