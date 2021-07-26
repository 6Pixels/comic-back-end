'use strict';

const mongoose = require('mongoose');


const moviesSchema = new mongoose.Schema({
    name: String,
    img: String,
});


const comicSchema = new mongoose.Schema({
    name: String,
    img: String,
});

const charactersSchema = new mongoose.Schema({
    name: String,
    img: String,

});

const profileSchema = new mongoose.Schema({
    email: String,
    movies: [moviesSchema],
    comic: [comicSchema],
    characters: [charactersSchema],
});


const Profile = mongoose.model('profile', profileSchema);


module.exports = Profile;