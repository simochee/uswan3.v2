import request from 'superagent';

module.exports = {
    auth: (name, password) => {
        request
            .post('http://api.uswan.simo.website/private')
            .send({ name, password })
            .end((err, res) => {
                console.log()
            });
    }
}