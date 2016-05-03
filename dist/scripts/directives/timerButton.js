(function() {
  function timerButton($interval, $document) {
    
    return {
      templateUrl: '/templates/directives/timer_button.html',
      replace: true,
      restrict: 'E',
        scope: { },
      link: function(scope, element, attributes) {
        
        // Timer constants (in seconds)
        scope.WORKTIME = 2;
        scope.BREAKTIME = 1;
        scope.LONGBREAKTIME = 5;
        
        // Return undefined if no timer set
        var stop = undefined;
        var i = 0;
        
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
        var taskCounter = 0;
        var breakCounter = 0;
        var resetCount = 0;
        
        scope.sessionCounter = 0;
            
        //initial values
        scope.remainingTime = scope.WORKTIME;        
        scope.buttonLabel = taskLabel;

        // array of sessions for outputting tomato gif counter images
        scope.sessions = [];
        
        var decrementTime = function() {
          scope.remainingTime--;
          if (scope.remainingTime === 0 && !scope.onLongBreak) {      
            scope.onBreak ? resetTimer() : startBreak();
          } else if (scope.remainingTime === 0 && scope.onLongBreak) {
            startTask();
          }
        };
      
        var resetTimer = function(stop) {
          scope.onBreak = false;
          stopTimer(stop);
          scope.sessionCounter++;
          
          if (scope.sessionCounter % 4 == 0) {
            scope.onBreak = false;
            startLongBreak();
          } else {
            startTask();
          }
        };
        
        var startBreak = function() {
          scope.onBreak = true;
          scope.onLongBreak = false;
          scope.buttonLabel = breakLabel;
          scope.remainingTime = scope.BREAKTIME;
        }; 
        
        var startTask = function() {
          scope.onBreak = false;
          scope.onLongBreak = false;
          scope.buttonLabel = taskLabel;
          scope.remainingTime = scope.WORKTIME;
        };
        
        var stopTimer = function(stopTimer) {
          $interval.cancel(stop);
          stopTimer = undefined;
        };
        
        var startLongBreak = function() {
          scope.onBreak = false;
          scope.onLongBreak = true;
          scope.buttonLabel = longBreakLabel;
          scope.remainingTime = scope.LONGBREAKTIME;
        };
    
        var incrementSession = function() {
          scope.sessions.push(i++);
        };
        
        var decrementSession = function() {
          scope.sessions.pop();
        };
        
        scope.startTimer = function(time) {      
          if (!scope.onBreak & !scope.onLongBreak) {
            incrementSession();
          }
          
          if (scope.remainingTime != time && stopTimer != undefined) {
            stopTimer(stop);
            resetCount++;
            
            // make sure we remove a tomato if they reset 
            if (!scope.onBreak) {
              decrementSession();
            }
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