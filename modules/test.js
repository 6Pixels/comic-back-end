'use strict';

const axios = require('axios')

function testPageHandler(request, response) {
    response.status(200).send('all good');
};

module.exports = testPageHandler;