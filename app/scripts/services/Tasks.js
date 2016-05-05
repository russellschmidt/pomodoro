(function() {
  function Tasks($firebaseArray) {
    var firebaseRef = new Firebase("https://resplendent-inferno-1468.firebaseIO.com");
    
    var tasks = $firebaseArray(firebaseRef);
  
    
    return {
      all: tasks
    };
  }
  
  angular
    .module('pomodoro')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();