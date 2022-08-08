app.controller('mainController', [
  'rickandMortyService',
  (rickandMortyService) => {
    const vm = this;
    vm.name = 'Jan';
    vm.age = '99';

    rickandMortyService.getAllCharacters().then(function (response) {
      vm.mockAndMortyData = response.data;
      console.log(vm.mockAndMortyData);
    });

    return vm;
  },
]);
