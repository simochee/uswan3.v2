import route from 'riot-route';

route('/', () => {
    location.hash = '#/menu';
});

route('/menu', () => {
    require('../tags/public/menu');
    riot.mount('router', 'menu');
});

module.exports = {
    start: () => {
        route.start(true);
    }
}