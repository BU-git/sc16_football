export default function adminUser(userId) {
  return Roles.userIsInRole(userId, ['admin']);
}