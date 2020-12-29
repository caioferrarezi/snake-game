import canvas from 'utils/canvas';
import input from 'utils/input';
import { COLORS, PIXEL_SIZE, KEYS } from 'utils/constants';

export default class Snake {
  constructor() {
    this._body = [];
    this._pos = { x: 0, y: 0 };
    this._vel = { x: 0, y: 0 };

    this._size = PIXEL_SIZE;
    this._color = COLORS.snake;

    this._init();
  }

  _init() {
    this._body.push(this._pos);
  }

  _move() {
    if (input.is(KEYS.LEFT))
      this._moveLeft();

    if (input.is(KEYS.UP))
      this._moveUp();

    if (input.is(KEYS.RIGHT))
      this._moveRight();

    if (input.is(KEYS.DOWN))
      this._moveDown();
  }

  _moveLeft() {
    this._vel = { x: -this._size, y: 0 };
  }

  _moveUp() {
    this._vel = { x: 0, y: -this._size };
  }

  _moveRight() {
    this._vel = { x: this._size, y: 0 };
  }

  _moveDown() {
    this._vel = { x: 0, y: this._size };
  }

  collide() {
    return (
      this._pos.x < 0 ||
      this._pos.y < 0 ||
      this._pos.x + this._size > canvas.width ||
      this._pos.y + this._size > canvas.height
    );

    // TODO collide with itself
  }

  eat(fruit) {
    return this._pos.x === fruit.pos.x && this._pos.y === fruit.pos.y;
  }

  grow() {
    this._body.push({ ...this._pos });
  }

  update() {
    this._move();

    this._pos.x += this._vel.x;
    this._pos.y += this._vel.y;

    this._body.push({ ...this._pos });
    this._body.shift();
  }

  show() {
    for (let pixel of this._body) {
      canvas.context.fillStyle = this._color;
      canvas.context.fillRect(pixel.x, pixel.y, this._size, this._size);
    }
  }
}
