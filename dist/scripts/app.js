(function() {
  function config($stateProvider, $locationProvider) {
    
    // disable hash-bang mode on URLs, and disable a common $location error
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider
      .state('landing', {
        url: '/',
        controller: 'LandingCtrl as landing',
        templateUrl: '/templates/landing.html'
      })
      .state('tomato', {
        url: '/tomato',
        controller: 'TomatoCtrl as tomato',
        templateUrl: 'templates/tomato.html'
      });
  }
  
  angular
    .module('pomodoro', ['ui.router'])
    .config(config);
})();

