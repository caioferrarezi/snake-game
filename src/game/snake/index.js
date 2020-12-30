import canvas from 'utils/canvas';
import { COLORS, KEYS } from 'utils/constants';

import BodyPiece from 'game/snake/body-piece'

export default class Snake {
  constructor() {
    this._pos = canvas.getRandomPosition();
    this._vel = { x: 0, y: 0 };

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

      return;
    }

    let cur = this._head;

    while (cur.next !== null) {
      cur = cur.next;
    }

    cur.next = new BodyPiece(x, y);
  }

  _add(x, y) {
    let cur = this._head;

    this._head = new BodyPiece(x, y, cur);
  }

  _pop() {
    let cur = this._head;
    let prev = null;

    while (cur.next !== null) {
      prev = cur;
      cur = cur.next;
    }

    prev.next = cur.next;
  }

  moveLeft() {
    if (this._vel.x === this._size) return;

    this._vel = { x: -this._size, y: 0 };
  }

  moveUp() {
    if (this._vel.y === this._size) return;

    this._vel = { x: 0, y: -this._size };
  }

  moveRight() {
    if (this._vel.x === -this._size) return;

    this._vel = { x: this._size, y: 0 };
  }

  moveDown() {
    if (this._vel.y === -this._size) return;

    this._vel = { x: 0, y: this._size };
  }

  is(x, y) {
    let cur = this._head.next;

    if (!cur) return false;

    while (cur.next !== null) {
      if (cur.x === x && cur.y === y)
        return true;

      cur = cur.next;
    }

    return false;
  }

  collide() {
    const { x, y } = this._head;

    if (
      x < 0 || x + this._size > canvas.width ||
      y < 0 || y + this._size > canvas.height
    ) return true

    return this.is(x, y);
  }

  eat(x, y) {
    return this._head.x === x && this._head.y === y;
  }

  grow() {
    let cur = this._head;

    while (cur.next !== null) {
      cur = cur.next;
    }

    for (let i = 0 ; i < 5; i++) {
      this._push(cur.x, cur.y);
    }
  }

  update() {
    this._pos.x += this._vel.x;
    this._pos.y += this._vel.y;

    this._add(this._pos.x, this._pos.y);
    this._pop();
  }

  show() {
    let cur = this._head

    while (cur !== null) {
      canvas.context.fillStyle = this._color;
      canvas.context.fillRect(cur.x, cur.y, this._size, this._size);

      cur = cur.next;
    }
  }
}
