const superagent = require('superagent');

// const root = 'http://api.uswan.simo.website';
const root = 'http://localhost:3000';
const url_for = (path) => {
    return `${root}/${path}`;
}

module.exports = {
    getMenu: (delay) => {
        return new Promise((resolve, reject) => {
            superagent
                .get(url_for('menu/'))
                .query({ delay })
                .end((err, res) => {
                    if(err) reject(err);
                    else resolve(res.body);
                });
        });
    }
}