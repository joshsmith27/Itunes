angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getSongData = function(artist){
      var deferred = $q.defer();
       $http({
        method: 'JSONP',
        url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      }).then(function(response){
        var song = response.data.results;
        var finalSongs = [];
        for (var i = 0; i < song.length; i++){
          finalSongs.push({
          Play: song[i].previewURL,
          Artist: song[i].artistName,
          Collection: song[i].collectionName,
          AlbumArt: song[i].artworkUrl100,
          Type: song[i].type,
          CollectionPrice: song[i].collectionPrice
        });

        }
       deferred.resolve(finalSongs);
    });
    return deferred.promise;
  };

});
