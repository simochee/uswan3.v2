const api = require('./api');

const Store = {};

module.exports = {
    getMenu: (delay) => {
        return new Promise((resolve, reject) => {
            if(!Store.menu) {
                api.getMenu(delay).then((data) => {
                    Store.menu = data;
                    resolve(data);
                }).catch((e) => {
                    reject(e);
                });
            } else {
                resolve(Store.menu);
            }
        });
    }
}