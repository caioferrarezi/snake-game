import canvas from 'canvas';
import { COLORS, KEYS } from 'utils/constants';

import BodyPiece from 'game/snake/body-piece'

export default class Snake {
  constructor() {
    this._pos = canvas.getRandomPosition();

    this._nextVel = { x: 0, y: 0 };
    this._vel = this._nextVel;

    this._size = canvas.pixelSize;
    this._color = COLORS.SNAKE;

    this._init();
  }

  _init() {
    const { x, y } = this._pos

    this._head = null;
    this._tail = null;

    this._push(x, y);
  }

  _push(x, y) {
    if (!this._head) {
      this._head = new BodyPiece(x, y);
      this._tail = this._head;

      return;
    }

    let tail = new BodyPiece(x, y, this._tail, null);
    this._tail.next = tail;

    this._tail = tail;
  }

  _add(x, y) {
    if (!this._head) {
      this._head = new BodyPiece(x, y);
      this._tail = this._head;

      return;
    }

    let head = new BodyPiece(x, y, null, this._head);
    this._head.prev = head;

    this._head = head;
  }

  _pop() {
    this._tail = this._tail.prev;
    this._tail.next = null;
  }

  moveLeft() {
    if (
      this._head.next &&
      this._vel.x === this._size
    ) return;

    this._nextVel = { x: -this._size, y: 0 };
  }

  moveUp() {
    if (
      this._head.next &&
      this._vel.y === this._size
    ) return;

    this._nextVel = { x: 0, y: -this._size };
  }

  moveRight() {
    if (
      this._head.next &&
      this._vel.x === -this._size
    ) return;

    this._nextVel = { x: this._size, y: 0 };
  }

  moveDown() {
    if (
      this._head.next &&
      this._vel.y === -this._size
    ) return;

    this._nextVel = { x: 0, y: this._size };
  }

  is(x, y) {
    for (let cur = this._head.next; cur !== null && cur.next !== null; cur = cur.next) {
      if (cur.x === x && cur.y === y)
        return true;
    }

    return false;
  }

  bitten() {
    let { x, y } = this._head;

    return this.is(x, y);
  }

  hitWall() {
    const { x, y } = this._head;

    return (
      x < 0 ||
      y < 0 ||
      x > canvas.width - canvas.pixelSize ||
      y > canvas.height - canvas.pixelSize
    )
  }

  eat(fruit) {
    const { x, y } = this._head;

    return x === fruit.x && y === fruit.y;
  }

  grow() {
    let tail = this._tail;

    for (let i = 0 ; i < 5; i++) {
      this._push(tail.x, tail.y);
    }
  }

  update() {
    this._vel = this._nextVel;

    this._pos.x += this._vel.x;
    this._pos.y += this._vel.y;

    this._add(this._pos.x, this._pos.y);
    this._pop();
  }

  show() {
    for (let cur = this._head; cur !== null; cur = cur.next) {
      canvas.context.fillStyle = this._color;
      canvas.context.fillRect(cur.x, cur.y, this._size, this._size);
    }
  }
}
