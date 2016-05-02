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
        
        
        scope.WORKTIME = 10;
        scope.BREAKTIME = 5;
        
        scope.remainingTime = scope.WORKTIME;
        scope.resetCount = 0;
        
        scope.buttonLabel = taskLabel;

        var decrementTime = function() {
          scope.remainingTime--;
        };
                
        scope.startTimer = function(time) {
          if (scope.remainingTime != time && stopTimer != undefined) {
            $interval.cancel(stopTimer);
            stopTimer = undefined;
          }
          scope.remainingTime = time;
          stopTimer = $interval(decrementTime, 1000, time);
          scope.buttonLabel = resetLabel;
        };
        
        

        
      }
    };
  }
  
  angular
    .module('pomodoro')
    .directive('timerButton', ['$interval', '$document', timerButton]);
})();