import canvas from 'utils/canvas';
import { COLORS, KEYS } from 'utils/constants';

import Snake from 'game/snake';
import Fruit from 'game/fruit';

import GameOverScreen from 'game/screens/game-over';

export default class Game {
  constructor() {
    canvas.create(800, 600);

    this._init();
  }

  _init() {
    this._state = 'playing';
    this._score = 0;

    this._snake = new Snake();
    this._fruit = new Fruit();

    this._gameOverScreen = new GameOverScreen();

    this._setControls();
  }

  _clear() {
    canvas.context.fillStyle = COLORS.BACKGROUND;
    canvas.context.fillRect(0, 0, canvas.width, canvas.height);
  }

  _showScore() {
    canvas.context.fillStyle = '#222222';
    canvas.context.textAlign = 'left';
    canvas.context.textBaseline = 'top';
    canvas.context.font = `32px VT323, monospace`;
    canvas.context.fillText(`Score: ${this._score}`, canvas.pixelSize, canvas.pixelSize);
  }

  _setControls() {
    window.onkeydown = this._onKeyDown.bind(this)
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

  update() {
    if (this._state !== 'playing') return;

    this._snake.update();

    if (this._snake.collide()) {
      this._state = 'game-over';
    }

    if (this._snake.eat(this._fruit.x, this._fruit.y)) {
      this._snake.grow();
      this._fruit.update();

      while (this._snake.is(this._fruit.x, this._fruit.y)) {
        this._fruit.update();
      }

      this._score++;
    }
  }

  show() {
    this._clear();

    if (this._state === 'game-over') {
      this._gameOverScreen.show(this._score);
      return;
    }

    this._showScore();

    this._snake.show();
    this._fruit.show();
  }
}
