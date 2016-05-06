(function() {
  function LandingCtrl($scope, Tasks) {
    this.heroTitle = "Pomodoro Timer";   
    
    // bind $scope to firebase data
    $scope.taskArray = Tasks.all
    
    $scope.addTask = function() {
      $scope.taskArray.$add($scope.newTaskText)
      $scope.newTaskText = "";
    }
  }
  
  angular 
    .module('pomodoro')
    .controller('LandingCtrl', ['$scope', 'Tasks', LandingCtrl]);
})();