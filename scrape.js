const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('movieData.json');

// write headers
writeStream.write(`Title,About \n`);

request('https://www.esquire.com/entertainment/movies/g30288425/best-netflix-original-movies-2020/', (error, response, html) => {
    if(!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        $('.listicle-slide').each((i, el) => {
            const name = $(el).find('.listicle-slide-hed-text').text();
            const info = $(el).find('.listicle-slide-dek').text();

            // write row to json
            writeStream.write(`${name}, ${info} \n`);
        });

        console.log('Scraping Done!');
    }
});