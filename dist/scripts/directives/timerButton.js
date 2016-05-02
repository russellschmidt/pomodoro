(function() {
  function timerButton($interval, $document) {
    
    return {
      templateUrl: '/templates/directives/timer_button.html',
      replace: true,
      restrict: 'E',
        scope: { },
      link: function(scope, element, attributes) {
        
        var stopTimer = undefined;
        var taskLabel = "Start Task";
        var breakLabel = "Begin Break";
        var resetLabel = "Reset Counter";
        
        scope.onBreak = false;
        
        scope.WORKTIME = 2;
        scope.BREAKTIME = 5;
        
        scope.remainingTime = scope.WORKTIME;
        scope.resetCount = 0;
        
        scope.buttonLabel = taskLabel;

        var decrementTime = function() {
          scope.remainingTime--;
          if (scope.remainingTime === 0) {
            startBreak();
          }
        };
        
        var startBreak = function() {
          scope.onBreak = true;
          scope.buttonLabel = breakLabel;
          scope.remainingTime = scope.BREAKTIME;
        };
        
                
        scope.startTimer = function(time) {
          if (scope.remainingTime != time && stopTimer != undefined) {
            $interval.cancel(stopTimer);
            stopTimer = undefined;
          }
          scope.remainingTime = time;
          scope.buttonLabel = resetLabel;
          stopTimer = $interval(decrementTime, 1000, time);
          
        };
        
        

        
      }
    };
  }
  
  angular
    .module('pomodoro')
    .directive('timerButton', ['$interval', '$document', timerButton]);
})();