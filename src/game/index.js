import { COLORS } from './constants';

import Snake from './snake';

export default class Game {
  constructor() {
    this.screen = document.querySelector('#screen');
    this.context = this.screen.getContext('2d');
    this.snake = new Snake(this.screen, this.context);
  }

  clearScreen() {
    this.context.fillStyle = COLORS.BACKGROUND;
    this.context.fillRect(0, 0, screen.width, screen.height);
  }

  update() {
    this.snake.update();
  }

  show() {
    this.clearScreen();
    this.snake.show();
  }
}
