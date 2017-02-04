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

module.exports = {
    start: () => {
        route.start(true);
    }
}