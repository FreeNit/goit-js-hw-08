import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const playerEl = document.querySelector('#vimeo-player');

const player = new Player(playerEl);

player.on(
  'timeupdate',
  // use throttle in order to call a function one time per 1000ms
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
  }, 1000)
);

// timestamp - where the video should continue to play after page reload
let playFromSecond;

try {
  // get local storage data and parse it
  const playerData = JSON.parse(
    localStorage.getItem('videoplayer-current-time')
  );
  // get the current video`s timestamp
  playFromSecond = playerData.seconds;
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

player
  .setCurrentTime(playFromSecond)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
