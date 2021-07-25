'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function comicHandler(request, response) {

    let url = '';
    let sQuery = '';



    if (request.query.comicName !== undefined) {
        sQuery = request.query.comicName;
        url = `https://comicvine.gamespot.com/api/volumes/?api_key=${process.env.COMICVINE_KEY}&sort=name:asc&filter=name:${sQuery}&format=json&limit=20`;
    } else {
        sQuery = 'allComic';

        url = `https://comicvine.gamespot.com/api/issues/?api_key=${process.env.COMICVINE_KEY}&sort=id:desc&format=json`;
    };




    if (cache[`Comic:${sQuery}`] !== undefined) {

        console.log('sending from cache');
        response.status(200).send(cache[`Comic:${sQuery}`]);

    }
    else {

        axios
            .get(url)
            .then(comicData => {


                let cData = comicData.data.results.map(obj => new Comic(obj));

                cache[`Comic:${sQuery}`] = cData;
                console.log('sending from API');
                response.status(200).send(cData);

            })
            .catch(error => {
                response.status(500).send(error);
            })
    }
};

class Comic {
    constructor(obj) {
        this.name = obj.name;
        this.image_url = obj.image.original_url;
        this.description = obj.description;
    }

}
module.exports = comicHandler;