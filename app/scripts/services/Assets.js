(function() {
  function Assets() {
    var Assets = {};
    
    var audioAssets = {
      soundFX: [
        {name: "airplane ding", audioUrl: '/assets/sounds/airplane-ding.mp3'},
        {name: "shorebirds", audioUrl: '/assets/sounds/shorebirds.mp3'},
        {name: "beer can", audioUrl: '/assets/sounds/beer-can.mp3'}
      ]
    };
    
    var imageAssets = {
      tomato: [
        {name: "happy tomato", imageUrl: 'assets/images/tomato.gif'},
        {name: "abstract tomato", imageUrl: 'assets/images/abstract-tomato.png'}
      ]
    }
    
    Assets.getAudioAssets = function() {
      return audioAssets;
    };
    
    Assets.getImageAssets = function() {
      return imageAssets;
    };
    
    return Assets;
  }
  
  angular
    .module('pomodoro')
    .factory('Assets', Assets);
})();