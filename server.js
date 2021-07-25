'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios')
const mongoose = require('mongoose');

const server = express();
server.use(cors());


// Middleware: checkpoint to parse the body of the request
server.use(express.json())


const homePageHandler = require('./modules/home');
const testPageHandler = require('./modules/test');
const moviesHandler = require('./modules/movies');
const comicHandler = require('./modules/comic')

const PORT = process.env.PORT || 3002;

//http://localhost:3001/
server.get('/', homePageHandler);

//http://localhost:3001/test
server.get('/test', testPageHandler);

//http://localhost:3001/movies
server.get('/movies', moviesHandler);

//http://localhost:3001/comic
server.get('/comic', comicHandler);

server.get('*', (request, response) => {
    response.status(500).send('NOT FOUND')
})

server.listen(PORT, () => console.log(`listening on ${PORT}`));