app.factory('rickandMortyService', [
  '$http',
  function ($http) {
    const baseUrl = 'https://rickandmortyapi.com/api/character/';
    return {
      getAllCharacters: getAllCharacters,
    };

    function getAllCharacters() {
      return $http.get(baseUrl);
    }
  },
]);
