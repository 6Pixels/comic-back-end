'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function moviesHandler(request, response) {


    let url = `https://comicvine.gamespot.com/api/movies/?api_key=${process.env.COMICVINE_KEY}&format=json&sort=id:desc`;

    if (cache[`movies:`] !== undefined) {
        response.status(200).send(cache[`movies:`]);
    } else {
        axios
            .get(url)
            .then(moviesData => {

                let mData = moviesData.data.results.map(obj => new Movies(obj));

                cache[`movies:`] = mData;

                response.status(200).send(mData);

            })
            .catch(error => {
                response.status(500).send(error);
            })
    }

};

class Movies {
    constructor(obj) {
        this.title = obj.name;
        this.release_date = obj.release_date;
        this.image_url = obj.image.original_url;
        this.rating = obj.rating;
        this.runtime = `${obj.runtime} mins`;
    }

}

module.exports = moviesHandler;