const superagent = require('superagent');
const moment = require('moment');

const root = 'http://localhost:3000';
const url_for = (path) => {
    return `${root}/${path}`;
}

module.exports = {
    getMenu: (year, month) => {
        return new Promise((resolve, reject) => {
            superagent
                .get(url_for(`menu/${year}/${month}`))
                .end((err, res) => {
                    console.log(url_for(`menu/${year}/${month}`))
                    if(err) reject(err);
                    else resolve(res.body);
                });
        });
    },
    archive: {
        add: (year, month, status) => {
            return new Promise((resolve, reject) => {
                superagent
                    .put(url_for(`private/archive/${year}/${month}/${status}`))
                    .send({ password: 'abc5244', name: 'simochee' })
                    .end((err, res) => {
                        if(err || res.status === 'error') {
                            reject();
                        } else {
                            resolve();
                        }
                    });
            });
        }
    }
}