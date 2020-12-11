import canvas from 'utils/canvas';
import { COLORS } from 'utils/constants';

import Snake from 'game/snake';
import Fruit from 'game/fruit';

export default class Game {
  constructor() {
    this.init();

    this.snake = new Snake();
    this.fruit = new Fruit();
  }

  init() {
    canvas.create(400, 400);
  }

  clearScreen() {
    canvas.context.fillStyle = COLORS.background;
    canvas.context.fillRect(0, 0, canvas.width, canvas.height);
  }

  update() {
    this.snake.update();

    if (this.snake.eat(this.fruit)) {
      this.snake.grow();
      this.fruit.update();
    }
  }

  show() {
    this.clearScreen();

    this.snake.show();
    this.fruit.show();
  }
}
