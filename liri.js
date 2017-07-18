var fs = require('fs');
var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var keys = require("./keys.js");

var app = process.argv[2];
var name = process.argv[3];
liri(app, name);

function liri(app, name){
  switch (app){
    case 'my-tweets':
      var fs = require("fs");
      fs.readFile("keys.js", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }
        var client=data;
        var params = {screen_name: 'nodejs'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            tweets.forEach(function(element) {
              console.log(element.created_at + ": " + element.text);
            });
          }
        });
      });
      break;
    case 'movie-this':
        var request = require("request");
        var movieName = name;
        request("http://www.omdbapi.com/?t="+ movieName +"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Released: " + JSON.parse(body).Country);
            console.log("Original Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
      break;
    case 'spotify-this-song':
      var Spotify = require('node-spotify-api');
      var fs = require("fs");
      fs.readFile("spotifykey.js", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
      var spotify=data;
      if (!name) {
          name = "The Sign -Ace of Base";
        }
        console.log(name)
      spotify.search({ type: 'track', query: 'name'}, function(err, data) {
          if ( err ) {
            console.log('Error occurred: ' + err);
            return;
          }
          else {
            var songData = data.tracks.items;
            var song = "Artist: " + songData[i].artists[0].name + "\r\n" +
            "Title: " + songData[i].name + "\r\n" +
            "Album: " + songData[i].album.name + "\r\n" +
            "Preview Link: " + songData[i].preview_url;
            console.log(song);
          }
        });
      });
      break;
    case 'do-what-it-says':
      var fs = require('fs');
        fs.readFile('random.txt', 'utf8', function(error, data){
          var dataArr = data.split(",");
          spotifySearch(dataArr[1]);
        });
      break;
    default:
      console.log('Command Unknown!');
    };
};

