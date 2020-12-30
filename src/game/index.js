import canvas from 'utils/canvas';
import { COLORS, KEYS } from 'utils/constants';

import Snake from 'game/snake';
import Fruit from 'game/fruit';

export default class Game {
  constructor() {
    canvas.create(400, 400);

    this._init();
  }

  _init() {
    this._score = 0;
    this._gameOver = false;

    this._snake = new Snake();
    this._fruit = new Fruit();

    this._setControls();
    this._updateScore();
  }

  _setControls() {
    window.onkeydown = this._onKeyDown.bind(this)
  }

  _clear() {
    canvas.context.fillStyle = COLORS.BACKGROUND;
    canvas.context.fillRect(0, 0, canvas.width, canvas.height);
  }

  _onKeyDown({ keyCode, preventDefault }) {
    if (KEYS.LEFT.includes(keyCode)) {
      return this._snake.moveLeft();
    }

    if (KEYS.UP.includes(keyCode)) {
      return this._snake.moveUp();
    }

    if (KEYS.RIGHT.includes(keyCode)) {
      return this._snake.moveRight();
    }

    if (KEYS.DOWN.includes(keyCode)) {
      return this._snake.moveDown();
    }

    if (KEYS.ACTION.includes(keyCode)) {
      if (this._gameOver === false) return;

      this._init();
    }
  }

  _updateScore() {
    const score = this._score;

    document.dispatchEvent(new CustomEvent('score', { detail: { score } }));
  }

  update() {
    if (this._gameOver) return

    this._snake.update();

    if (this._snake.collide()) {
      this._gameOver = true
    }

    if (this._snake.eat(this._fruit.x, this._fruit.y)) {
      this._snake.grow();
      this._fruit.update();

      while (this._snake.is(this._fruit.x, this._fruit.y)) {
        this._fruit.update();
      }

      this._score++;
      this._updateScore();
    }
  }

  show() {
    if (this._gameOver) return;

    this._clear();

    this._snake.show();
    this._fruit.show();
  }
}
