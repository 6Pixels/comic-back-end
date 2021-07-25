'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function comicHandler(request, response) {

    const sQuery = request.query.comicName;


    let url = `https://comicvine.gamespot.com/api/volumes/?api_key=${process.env.COMICVINE_KEY}&sort=name:asc&filter=name:${sQuery}&format=json&limit=12`;

    if (cache[`Comic:${sQuery}`] !== undefined) {
        response.status(200).send(cache[`Comic:${sQuery}`]);
    }
    else {

        axios
            .get(url)
            .then(comicData => {


                let cData = comicData.data.results.map(obj => new Comic(obj));

                cache[`Comic:${sQuery}`] = cData;

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
        this.released = obj.start_year;
        this.publisher = obj.publisher.name;
    }

}
module.exports = comicHandler;