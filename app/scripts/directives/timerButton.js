(function() {
  function timerButton($interval, $document) {
    
    return {
      templateUrl: '/templates/directives/timer_button.html',
      replace: true,
      restrict: 'E',
        scope: { },
      link: function(scope, element, attributes) {
        
        // Timer constants (in seconds)
        scope.WORKTIME = 25 * 60;
        scope.BREAKTIME = 5 * 60;
        scope.LONGBREAKTIME = 30 * 60;
        
        // Return undefined if no timer set
        var stop = undefined;
        var i = 0;
        
        // Button Label strings
        var taskLabel = "Start Task";
        var breakLabel = "Begin Break";
        var resetLabel = "Reset Counter";
        var longBreakLabel = "Extended Break";
        
        // State counters
        var resetCount = 0;
        var tomatoCounter = 0;
        
        var isPaused = false;
        
        // State tracking variables 
        // onBreak is false during work session, true during break
        scope.onBreak = false;
        scope.onLongBreak = false;
        scope.showPause = false;        
        
        scope.sessionCounter = 0;
        scope.pauseCounter = 0;
            
        //initial values
        scope.remainingTime = scope.WORKTIME;        
        scope.buttonLabel = taskLabel;
        scope.pauseLabel = "Pause Timer";

        // array of sessions for outputting tomato gif counter images
        scope.sessions = [];
        
        var ding = new buzz.sound("/assets/sounds/airplane-ding", {
          formats:  ['mp3'],
          preload:  true,
          volume:   50,
          loop:     false
        });
        
        var shorebirds = new buzz.sound("/assets/sounds/shorebirds", {
          formats:  ['mp3'],
          preload:  true,
          volume:   50,
          loop:     false
        });
          
        var startTask = function() {
          scope.onBreak = false;
          scope.onLongBreak = false;
          scope.buttonLabel = taskLabel;
          scope.remainingTime = scope.WORKTIME;
        };   
        
        var startBreak = function() {
          if (tomatoCounter % 4 === 0) {
            startLongBreak();
          } else {
            startShortBreak();
          }
        }; 
        
        var startShortBreak = function() {
          scope.onBreak = true;
          scope.onLongBreak = false;
          scope.buttonLabel = breakLabel;
          scope.remainingTime = scope.BREAKTIME;
        };
        
        var startLongBreak = function() {
          shorebirds.play();
          scope.onBreak = true;
          scope.onLongBreak = true;
          scope.buttonLabel = longBreakLabel;
          scope.remainingTime = scope.LONGBREAKTIME;
        };
        
        var stopTimer = function(stop) {
          $interval.cancel(stop);
          stop = undefined;
        };
    
        var incrementSession = function() {
          scope.sessions.push(i++);
          tomatoCounter++;
        };
        
        var decrementSession = function() {
          scope.sessions.pop();
          tomatoCounter--;
        };
              
        var resetTimer = function(stop) {
          scope.onBreak = false;
          stopTimer(stop);
          scope.sessionCounter++;
          startTask();
        };
        
        var decrementTime = function() {
          scope.remainingTime--;
          
          if (scope.remainingTime === 0) { 
            scope.showPause = false;
            ding.play();
            scope.onBreak ? resetTimer() : startBreak();
          } 
        };
        
        scope.pauseTimer = function() {
          if (!isPaused) {
            stopTimer(stop); 
            isPaused = true;
            scope.pauseLabel = "Resume Timer";
            scope.pauseCounter++;
          } else {
            scope.startTimer(scope.remainingTime);
            isPaused = false;
            scope.pauseLabel = "Pause Timer";
          }
        };
        
        scope.startTimer = function(time) {           
          
          if (tomatoCounter === scope.sessionCounter && !scope.onBreak && !scope.onLongBreak) {
            incrementSession();
          }
          
          // if reset button is hit 
          if (scope.remainingTime != time && stop != undefined) {
            stopTimer(stop);
            resetCount++;
          }      
          scope.showPause = true;
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