import './routes.js';

GoogleMaps.load();

sAlert.config({
    effect: 'jelly',
    position: 'top-right',
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack: true,
    offset: 0,
    beep: false,
    onClose: _.noop
});

Meteor.Spinner.options = {
  lines: 12, // The number of lines to draw
  length: 10, // The length of each line
  width: 4, // The line thickness
  radius: 15, // The radius of the inner circle
  corners: 0.7, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#666', // #rgb or #rrggbb
  speed: 1.3, // Rounds per second
  trail: 60, // Afterglow percentage
  zIndex: 100, // The z-index (defaults to 2000000000)
};

Event = new EventEmitter();