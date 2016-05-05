(function() {
  function LandingCtrl(Timer, Tasks) {
    this.heroTitle = "Pomodoro Timer";
    this.timer = Timer;    
    this.tasks = Tasks;  
  }
  
  angular 
    .module('pomodoro')
    .controller('LandingCtrl', ['Timer', 'Tasks', LandingCtrl]);
})();