'use strict';

const axios = require('axios')

function homePageHandler(request, response) {
    response.status(200).send('Hello This Is Home Route')
};

module.exports = homePageHandler;