import canvas from 'utils/canvas';
import { COLORS, KEYS } from 'utils/constants';

import Snake from 'game/snake';
import Fruit from 'game/fruit';

import collect from 'assets/collect.wav';
import hit from 'assets/hit.wav'

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

    this._collectSound = new Audio(collect);
    this._hitSound = new Audio(hit);

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

  _showFinishedScreen() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    canvas.context.fillStyle = '#222222';
    canvas.context.textAlign = 'center';
    canvas.context.textBaseline = 'middle';
    canvas.context.font = `normal 48px VT323, monospace`;
    canvas.context.fillText(`You've scored: ${this._score}`, x, y - 30);
    canvas.context.font = `normal 32px VT323, monospace`;
    canvas.context.fillText(`Press [Enter] or [Space] to restart`, x, y + 30);
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
      switch(this._state) {
      case 'finished':
        this._init();
        break;
      case 'playing':
        this._state = 'paused';
        break;
      case 'paused':
        this._state = 'playing';
        break;
      }
    }
  }

  update() {
    if (this._state !== 'playing') return;

    this._snake.update();

    if (this._snake.hitWall() || this._snake.bitten()) {
      this._state = 'finished';
      this._hitSound.play();
    }

    if (this._snake.eat(this._fruit)) {
      this._snake.grow();
      this._fruit.update();

      while (this._snake.is(this._fruit.x, this._fruit.y)) {
        this._fruit.update();
      }

      this._score++;
      this._collectSound.play();
    }
  }

  show() {
    this._clear();

    switch(this._state) {
    case 'finished':
      this._showFinishedScreen();
      break;
    case 'playing':
    case 'paused':
      this._showScore();

      this._snake.show();
      this._fruit.show();
      break;
    }
  }
}
