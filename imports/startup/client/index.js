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

Event = new EventEmitter();