(function() {
  function LandingCtrl(Timer) {
    this.heroTitle = "Pomodoro Timer";
    this.timer = Timer;
    
    
  }
  
  angular 
    .module('pomodoro')
    .controller('LandingCtrl', ['Timer', LandingCtrl]);
})();