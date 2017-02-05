import observable from 'riot-observable';

const obs = observable();

module.exports = {
    observable: () => {
        return obs;
    },
    search: (data, input) => {
        if(input === '') return null;
        const words = input.split(/ |　|,/g);
        const regExp = new RegExp(words.join('|'), 'g');
        let results = [];
        data.forEach((item, i) => {
            delete item['_id'];
            delete item['__v'];
            delete item['date'];
            const plain = JSON.stringify(item).replace(/"[a-z]+"|{|}|\[|\]|\"|\'|,|:| |　/g, '');
            if(regExp.test(plain)) {
                results.push(data[i]);
            }
        });
        return results;
    }
}