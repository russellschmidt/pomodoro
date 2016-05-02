(function() {
  function TomatoCtrl(Timer) {
    this.heroTitle = "Foucault's Tomato is pomo-pomodoro";
    this.timer = Timer;
    
    
  }
  
  angular 
    .module('pomodoro')
    .controller('TomatoCtrl', ['Timer', TomatoCtrl]);
})();
