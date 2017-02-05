const superagent = require('superagent');
const moment = require('moment');

// const root = 'http://api.uswan.simo.website';
const root = 'http://localhost:3000';
const url_for = (path) => {
    return `${root}/${path}`;
}

module.exports = {
    getMenu: (delay) => {
        return new Promise((resolve, reject) => {
            superagent
                .get(url_for(`menu/${delay}`))
                .end((err, res) => {
                    if(err) reject(err);
                    else resolve(res.body);
                });
        });
    },
    search: (input, opts_start, opts_end) => {
        return new Promise((resolve, reject) => {
            const start = opts_start || moment().format('YYYY-MM-DD');
            const end = opts_end || moment(start).add(1, 'months').format('YYYY-MM-DD');
            if(input === '') reject({ status: 'input_empty' });
            const words = input.replace(/ |　|,/g, ',');
            superagent
                .get(url_for(`search/${words}/${start}/${end}`))
                .end((err, res) => {
                    resolve(res.body);
                });
        });
    },
    feedback: (body) => {
        return new Promise((resolve, reject) => {
            superagent
                .post(url_for('feedback'))
                .send({ body })
                .end((err, res) => {
                    if(err) reject(null);
                    else if(res.status === 'error') reject(res.message);
                    else resolve();
                });
        });
    }
}