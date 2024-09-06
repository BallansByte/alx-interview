#!/usr/bin/node
// Prints all characters of a Star Wars movie using the ALX Star Wars API

if (process.argv.length !== 3) {
  process.exit();
}
const movieID = process.argv[2];
const url = `https://swapi-api.alx-tools.com/api/films/${movieID}`;
const request = require('request');

// Recursive function to get and print character names from a list of URLs
function printNextCharacter (urls) {
  const characterURL = urls.shift();
  if (characterURL) {
    request(characterURL, function (error, response, body) {
      if (!error) {
        console.log(JSON.parse(body).name);
        printNextCharacter(urls);
      }
    });
  }
}

function printStarWarsCharacters (url) {
  request(url, function (error, response, body) {
    if (!error) {
      printNextCharacter(JSON.parse(body).characters);
    }
  });
}

printStarWarsCharacters(url);
