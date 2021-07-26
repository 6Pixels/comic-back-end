'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function moviesHandler(request, response) {


    let url = `https://comicvine.gamespot.com/api/movies/?api_key=${process.env.COMICVINE_KEY}&format=json&sort=id:desc`;

    if (cache[`movies:`] !== undefined) {

        console.log('sending from cache');
        response.status(200).send(cache[`movies:`]);

    } else {
        axios
            .get(url)
            .then(moviesData => {

                let mData = moviesData.data.results.map(obj => new Movies(obj));

                cache[`movies:`] = mData;
                console.log('sending from API');
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
        this.runtime = `${obj.runtime} mins`;
        this.rating = obj.rating;
        this.image_url = obj.image.original_url;
        this.release_date = obj.release_date;
    }

}

module.exports = moviesHandler;