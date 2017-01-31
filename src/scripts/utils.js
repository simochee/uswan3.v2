import observable from 'riot-observable';

const obs = observable();

module.exports = {
    observable: () => {
        return obs;
    }
}