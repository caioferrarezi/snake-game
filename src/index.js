import { FPS } from 'utils/constants';
import Game from 'game';

const game = new Game();

let time1 = Date.now();
let time2 = Date.now();
let elapsed = 0;

let frameCount = 0;

function setup() {
  frameCount = 0;

  draw();
}

function draw() {
  time2 = Date.now();
  elapsed = time2 - time1;

  if (elapsed > 100) {
    time1 = time2;

    game.update();
    game.show();
  }

  requestAnimationFrame(draw);
}

setup()
