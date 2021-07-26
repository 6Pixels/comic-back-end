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
const dbHandlers = require('./modules/dbHandlers');

const PORT = process.env.PORT || 3002;


mongoose.connect(`${process.env.MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true });


function seedUserCollection() {

    const tariq = new Profile({
        email: 'taariq.zyad@gmail.com',
        movies: [
            {
                name: 'test6',
                img: 'test6',
            },

        ]
        , comic: [
            {
                name: 'test6',
                img: 'test6',
            },

        ]
        , characters: [
            {

                name: 'test6',
                img: 'test6',

            },

        ]
    });
    tariq.save();
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

// http://localhost:3001/post, postFormData
server.post('/post', dbHandlers.postHandler);

//http://localhost:3001/delete/${id}?email=${this.props.auth0.user.email}&type=${comic}
server.delete('/delete/:id', dbHandlers.deleteHandler)

//http://localhost:3001/put/${this.state.id}, putFormData
server.put('/put/:id', dbHandlers.updateHandler)

///////////////////


server.get('*', (request, response) => {
    response.status(500).send('NOT FOUND')
})

server.listen(PORT, () => console.log(`listening on ${PORT}`));