'use strict';

const axios = require('axios');

const utilities = {};

const User = require('./Profile');

utilities.postHandler = function (request, response) {

    console.log(request.body);

    if (request.body.type === 'movie') {
        let { email, movieName, movieImg } = request.body;
        User.find({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                items[0].movies.push({
                    name: movieName,
                    img: movieImg,
                })

                items[0].save();

                response.status(200).send(items[0].movies)
            }
        })
    } else if (request.body.type === 'character') {
        let { email, characterName, characterImg, } = request.body;
        User.find({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                items[0].characters.push({
                    name: characterName,
                    img: characterImg,
                })

                items[0].save();

                response.status(200).send(items[0].characters)
            }
        })
    } else if (request.body.type === 'comic') {
        let { email, comicName, comicImg, } = request.body;
        User.find({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                items[0].comic.push({
                    name: comicName,
                    img: comicImg,

                })

                items[0].save();

                response.status(200).send(items[0].comic)
            }
        })

    }

}

utilities.deleteHandler = function (request, response) {

    let id = request.params.id;
    let email = request.query.email;


    if (request.query.type === 'movie') {
        User.find({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                let newMoviesArray = items[0].movies.filter(val => {

                    return val._id.toString() !== id

                })
                items[0].movies = newMoviesArray
                console.log('after deleting', items[0].movies)

                items[0].save();
                response.status(200).send(items[0].movies)
            }

        })
    } else if (request.query.type === 'character') {
        User.find({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                let newCharactersArray = items[0].characters.filter(val => {

                    return val._id.toString() !== id

                })
                items[0].characters = newCharactersArray
                console.log('after deleting', items[0].characters)

                items[0].save();
                response.status(200).send(items[0].characters)
            }

        })
    } else if (request.query.type === 'comic') {
        User.find({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                let newComicArray = items[0].comic.filter(val => {

                    return val._id.toString() !== id

                })
                items[0].comic = newComicArray
                console.log('after deleting', items[0].comic)

                items[0].save();
                response.status(200).send(items[0].comic)
            }

        })
    }


}


utilities.updateHandler = function (request, response) {

    let id = request.params.id;

    if (request.body.type === 'movie') {
        let { email, movieName, movieImg } = request.body;
        User.findOne({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                items.movies.map(movie => {


                    if (movie._id.toString() === id) {

                        movie.name = movieName;
                        movie.img = movieImg;

                        return movie;
                    }
                    else {
                        return movie;
                    }
                })

                items.save();

                response.status(200).send(items.movies);

            }

        })
    } else if (request.body.type === 'character') {
        let { email, characterName, characterImg, } = request.body;
        User.findOne({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                items.characters.map(character => {


                    if (character._id.toString() === id) {

                        character.name = characterName;
                        character.img = characterImg;

                        return character;
                    }
                    else {
                        return character;
                    }
                })

                items.save();

                response.status(200).send(items.characters);

            }

        })
    } else if (request.body.type === 'comic') {
        let { email, comicName, comicImg, } = request.body;
        User.findOne({ email: email }, (error, items) => {
            if (error) {
                response.status(500).send('NOT FOUND')
            }
            else {

                items.comic.map(comic => {


                    if (comic._id.toString() === id) {

                        comic.name = comicName;
                        comic.img = comicImg;

                        return comic;
                    }
                    else {
                        return comic;
                    }
                })

                items.save();

                response.status(200).send(items.comic);

            }

        })
    }



}

module.exports = utilities;