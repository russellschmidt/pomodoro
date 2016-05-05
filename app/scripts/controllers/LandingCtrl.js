(function() {
  function LandingCtrl($scope, Tasks, Timer) {
    this.heroTitle = "Pomodoro Timer";
    this.timer = Timer;    
    
    // bind $scope to firebase data
    $scope.taskArray = Tasks.all
    
    $scope.addTask = function() {
      $scope.taskArray.$add($scope.newTaskText)
      $scope.newTaskText = "";
    }
  }
  
  angular 
    .module('pomodoro')
    .controller('LandingCtrl', ['$scope', 'Tasks', 'Timer', LandingCtrl]);
})();