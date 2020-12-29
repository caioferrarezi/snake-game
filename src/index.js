import { FPS } from 'utils/constants';
import Game from 'game';

const game = new Game(screen);

let frameCount;

function setup() {
  frameCount = 0;

  draw();
}

function draw() {
  frameCount++;

  if (frameCount % 5 == 0) {
    game.update();
    game.show();
  }

  requestAnimationFrame(draw);
}

setup()
