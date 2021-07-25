'use strict';

const mongoose = require('mongoose');


const moviesSchema = new mongoose.Schema({
    name: String,
    runtime: String,
    rating: String,
    img: String,
    release_date: String,
});


const comicSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
});

const charactersSchema = new mongoose.Schema({
    name: String,
    gender: String,
    race: String,
    img: String,
    publisher: String,
    aliases: Array,
});

const profileSchema = new mongoose.Schema({
    email: String,
    movies: [moviesSchema],
    comic: [comicSchema],
    characters: [charactersSchema],
});


const Profile = mongoose.model('profile', profileSchema);


module.exports = Profile;