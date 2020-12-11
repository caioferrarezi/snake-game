import { FPS } from 'utils/constants';
import Game from 'game';

const game = new Game(screen);

let start, now, then, elapsed, interval;

function setup() {
  interval = 1000 / FPS;
  then = Date.now();
  start = then;

  draw();
}

function draw() {
  requestAnimationFrame(draw);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > interval) {
    then = now - (elapsed % interval);

    game.update();
    game.show();
  }
}

setup()
