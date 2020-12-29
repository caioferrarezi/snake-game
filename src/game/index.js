import canvas from 'utils/canvas';
import input from 'utils/input';
import { COLORS, KEYS } from 'utils/constants';

import Snake from 'game/snake';
import Fruit from 'game/fruit';

export default class Game {
  constructor() {
    canvas.create(400, 400);

    this._init();
  }

  _init() {
    this.score = 0;
    this.gameOver = false;

    this.snake = new Snake();
    this.fruit = new Fruit();
  }

  _clear() {
    canvas.context.fillStyle = COLORS.background;
    canvas.context.fillRect(0, 0, canvas.width, canvas.height);
  }

  update() {
    if (this.gameOver) {
      this._init()
    };

    this.snake.update();

    if (this.snake.collide()) {
      this.gameOver = true
    }

    if (this.snake.eat(this.fruit)) {
      this.snake.grow();
      this.fruit.update();

      this.score++;
    }
  }

  show() {
    if (this.gameOver) return;

    this._clear();

    this.snake.show();
    this.fruit.show();
  }
}
