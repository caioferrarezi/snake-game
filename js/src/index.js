import { ELAPSED_INTERVAL } from 'utils/constants';

import canvas from 'canvas';
import Game from 'game';

import 'assets/style/index.css';

let game = null;

let oldTimeStamp = 0;
let elapsedTime = 0;

function onKeyDown(event) {
  game.onKeyPressed(event.keyCode);
}

function setup() {
  canvas.create();

  game = new Game();

  document.addEventListener('keydown', onKeyDown);

  requestAnimationFrame(loop);
}

function draw() {
  game.update();
  game.show();
}

function loop(timeStamp) {
  elapsedTime = (timeStamp - oldTimeStamp);

  if (elapsedTime > ELAPSED_INTERVAL) {
    oldTimeStamp = timeStamp;
    draw();
  }

  requestAnimationFrame(loop);
}

setup();
