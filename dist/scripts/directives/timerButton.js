(function() {
  function timerButton($interval, $document) {
    
    return {
      templateUrl: '/templates/directives/timer_button.html',
      replace: true,
      restrict: 'E',
        scope: { },
      link: function(scope, element, attributes) {
        
        // Timer constants (in seconds)
        scope.WORKTIME = 1;
        scope.BREAKTIME = 2;
        scope.LONGBREAKTIME = 3;
        
        // Return undefined if no timer set
        var stop = undefined;
        
        // Button Label strings
        var taskLabel = "Start Task";
        var breakLabel = "Begin Break";
        var resetLabel = "Reset Counter";
        var longBreakLabel = "Extended Break";
        
        // State tracking variables 
        // onBreak is false during work session, true during break
        scope.onBreak = false;
        scope.onLongBreak = false;
        
        // State counters
        scope.sessionCounter = 0;
        var resetCount = 0;
        
        scope.tomatoPic = "./assets/images/tomato-happy.gif";
        
        scope.remainingTime = scope.WORKTIME;        
        scope.buttonLabel = taskLabel;

        var decrementTime = function() {
          scope.remainingTime--;
          if (scope.remainingTime === 0) {
            scope.onBreak ? resetTimer() : startBreak();
          }
        };
        
        var startBreak = function() {
          scope.onBreak = true;
          scope.buttonLabel = breakLabel;
          scope.remainingTime = scope.BREAKTIME;
        };
      
        var resetTimer = function(stop) {
          scope.onBreak = false;
          stopTimer(stop);
          scope.sessionCounter++;
          
          if (scope.sessionCounter % 4 == 0) {
            startLongBreak();
          } else {
            startTask();
          }

        };
        
        var stopTimer = function(stopTimer) {
          $interval.cancel(stop);
          stopTimer = undefined;
        };
        
        var startTask = function () {
          scope.remainingTime = scope.WORKTIME;
          scope.buttonLabel = taskLabel;
          scope.onLongBreak = false;
          scope.onBreak = false;
        };
        
        var startBreak = function() {
          scope.remainingTime = scope.BREAKTIME;
          scope.buttonLabel = breakLabel;
          scope.onLongBreak = false;
          scope.onBreak = true;
        }
        
        var startLongBreak = function() {
          scope.buttonLabel = longBreakLabel;
          scope.remainingTime = scope.LONGBREAKTIME;
          scope.onLongBreak = true;
        };
        
        scope.startTimer = function(time) {
          if (scope.remainingTime != time && stopTimer != undefined) {
            stopTimer(stop);
            resetCount++;
          }
          scope.remainingTime = time;
          scope.buttonLabel = resetLabel;
          stop = $interval(decrementTime, 1000, time);
          
        };
        
                
      }
    };
  }
  
  angular
    .module('pomodoro')
    .directive('timerButton', ['$interval', '$document', timerButton]);
})();