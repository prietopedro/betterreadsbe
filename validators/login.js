const Validator = require('fastest-validator')

const v = new Validator();
const schema = {
    password: {type: 'string', min: 6, max: 20},
    email: {type: 'email'},
    $$strict: true
}

const checker = v.compile(schema);

module.exports = checker;