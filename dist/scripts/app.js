(function() {
  function config($stateProvider, $locationProvider) {
    
    // disable hash-bang mode on URLs, and disable a common $location error
    $locationProvider
      .html5mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider
      .state('landing', {
        url: '/',
      templateUrl: '/templates/landing.html'
      })
      .state('tomato', {
        url: '/tomato',
        templateUrl: 'templates/tomato.html'
      });
  }
  
  angular
    .module('pomodoro', ['ui.router'])
    .config(config);
})();

