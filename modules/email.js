'use strict';

const axios = require('axios');
const User = require('./Profile');

function emailHandler(request, response) {

    const email = request.query.email;

    User.find({ email: email }, (error, items) => {
        if (error) {
            response.status(500).send('NOT FOUND')
        } else {
            response.status(200).send(items[0])
        }
    })

}

module.exports = emailHandler;