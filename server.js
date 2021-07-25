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
const comicHandler = require('./modules/comic');
const charactersHandler = require('./modules/characters');

const Profile = require('./modules/Profile');

const getProfileData = require('./modules/email');

const PORT = process.env.PORT || 3002;


mongoose.connect(`${process.env.MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true });


function seedUserCollection() {

    const sondos = new Profile({
        email: 'sndjehad@gmail.com',
        movies: [
            {
                name: 'test',
                runtime: '',
                rating: '',
                img: '',
                release_date: '',
            },

        ]
        , comic: [
            {
                name: '',
                description: '',
                img: '',
            },

        ]
        , characters: [
            {

                name: '',
                gender: '',
                race: '',
                img: '',
                publisher: '',
                aliases: '',

            },

        ]
    });
    sondos.save();
};
// seedUserCollection();

///////////////////


//http://localhost:3001/
server.get('/', homePageHandler);

//http://localhost:3001/test
server.get('/test', testPageHandler);


///////////////////


//http://localhost:3001/movies
server.get('/movies', moviesHandler);

//http://localhost:3001/comic/?comicName=
//http://localhost:3001/comic
server.get('/comic', comicHandler);

//http://localhost:3001/characters/?characterName=
//http://localhost:3001/characters
server.get('/characters', charactersHandler);


///////////////////


// http://localhost:3001/profile/?email=
server.get('/profile', getProfileData);


///////////////////


server.get('*', (request, response) => {
    response.status(500).send('NOT FOUND')
})

server.listen(PORT, () => console.log(`listening on ${PORT}`));