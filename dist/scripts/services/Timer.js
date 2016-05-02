(function() {
  function Timer($interval) {
    var Timer = {};
   
    var stopTimer = undefined;  
    
/**
 *  @desc time in seconds for working => 25 min * 60 = 1500 sec
 *  @type {Number}
 */
    Timer.WORKTIME = 10;
   
/**
 *  @desc time in seconds for a break => 5 min * 60 = 300 sec
 *  @type {Number}
 */
    Timer.BREAKTIME = 5;
    
    
/**
 *  @desc Button Label
 *  @type {String}
 */
    Timer.buttonLabel = "Start Task";
    Timer.breakLabel = "Begin Break";

/**
 *  @desc time in seconds remaining
 *  @type {Number}
 */
    Timer.remainingTime = Timer.WORKTIME;
    
  
/**
 * @function decrementRemainingTime
 * @desc decrements the time remaining one at a time
 * @param {Number} time in seconds
 * @returns none
 */  
    var decrementRemainingTime = function() {
      Timer.remainingTime--;
      console.log(Timer.remainingTime);
    }
    

/**
 * @function startTimer
 * @desc executes when button in view pushed. starts countdown clock.
 * @param {Number} time in seconds
 * @returns none
 */  
    Timer.startTimer = function(time) {
      if (Timer.remainingTime != time) {
        $interval.cancel(stopTimer);
        stopTimer = undefined;
      }
        
      Timer.remainingTime = time;
      Timer.buttonLabel = "Reset Timer";
      stopTimer = $interval(decrementRemainingTime, 1000, time);
    }
    
    

    
    return Timer;
  }
  
  angular
    .module('pomodoro')
    .factory('Timer', ['$interval', Timer]);
})();