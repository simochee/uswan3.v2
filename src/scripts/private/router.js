import route from 'riot-route';

route('/', () => {
    require('../tags/private/home');
    riot.mount('router', 'home');
});

route('/menu', () => {
    require('../tags/private/menu');
    riot.mount('router', 'menu');
});

route('/twitter', () => {
    require('../tags/private/twitter');
    riot.mount('router', 'twitter');
});

module.exports = {
    start: () => {
        route.start(true);
    }
}