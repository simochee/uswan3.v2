import route from 'riot-route';

route('/', () => {
    location.hash = '#/menu';
});

route('/menu', () => {
    require('../tags/public/menu');
    require('../tags/public/daily-menu');
    require('../tags/public/menu-item');
    riot.mount('router', 'menu');
});

route('/search', () => {
    require('../tags/public/search');
    riot.mount('router', 'search');
});

route('/timetable', () => {
    require('../tags/public/timetable');
    riot.mount('router', 'timetable');
});

route('/info', () => {
    require('../tags/public/info');
    riot.mount('router', 'info');
});

module.exports = {
    start: () => {
        route.start(true);
    }
}