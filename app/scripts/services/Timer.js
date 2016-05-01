(function() {
  function Timer() {
    var Timer = {};
    
    Timer.startWorkTimer = function() {
      // 25 Minute Timer
    };
    
    Timer.startBreakTimer = function() {
      // 5 Minute Timer
    }
    
    return Timer;
  }
  
  angular
    .module('pomodoro')
    .factory('Timer', Timer);
})();