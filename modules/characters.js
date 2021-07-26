'use strict';

const axios = require('axios');
let cache = require('./cache.js');
const helpers = require('./helpers.js')

function charactersHandler(request, response) {

    let sQuery = '';

    let url = '';

    let id = helpers.randomLetter();

    if (request.query.characterName !== undefined) {
        sQuery = request.query.characterName;
        url = `https://www.superheroapi.com/api.php/${process.env.SUPERHERO_KEY}/search/${sQuery}`;
    } else {
        sQuery = id;
        url = `https://www.superheroapi.com/api.php/${process.env.SUPERHERO_KEY}/search/${id}`;
    };

    if (cache[`Character:${sQuery}`] !== undefined) {

        console.log('sending from cache');
        response.status(200).send(cache[`Character:${sQuery}`]);

    }
    else {

        axios
            .get(url)
            .then(CharacterData => {


                let charData = CharacterData.data.results.map(obj => new Characters(obj));


                cache[`Character:${sQuery}`] = charData;
                console.log('sending from API');
                response.status(200).send(charData);

            })
            .catch(error => {
                response.status(500).send(error);
            })
    }
};

class Characters {
    constructor(obj) {
        this.name = obj.name;
        this.appearance = obj.appearance;
        this.imageUrl = obj.image.url;
        this.publisher = obj.biography.publisher;
        this.aliases = obj.biography.aliases;
        this.powerstats = obj.powerstats;
        this.relatives = obj.connections.relatives;
    }

}
module.exports = charactersHandler;