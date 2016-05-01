(function() {
  function LandingCtrl(Timer) {
    this.heroTitle = "Pomodoro Timer";
  }
  
  angular 
    .module('pomodoro')
    .controller('LandingCtrl', ['Timer', LandingCtrl]);
})();