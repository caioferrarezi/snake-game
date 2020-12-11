import canvas from 'utils/canvas';
import { COLORS, PIXEL_SIZE } from 'utils/constants';
export default class Snake {
  constructor() {
    this._body = [];
    this._pos = { x: 0, y: 0 };
    this._vel = { x: 0, y: 0 };

    this._size = PIXEL_SIZE;
    this._color = COLORS.snake;

    this.init();
  }

  get keyEvents() {
    return {
      'ArrowUp': () => {
        this._vel = { x: 0, y: -this._size };
      },
      'ArrowDown': () => {
        this._vel = { x: 0, y: this._size };
      },
      'ArrowLeft': () => {
        this._vel = { x: -this._size, y: 0 };
      },
      'ArrowRight': () => {
        this._vel = { x: this._size, y: 0 };
      }
    }
  }

  init() {
    this._body.push(this._pos);

    window.addEventListener('keyup', ({ key }) => {
      if (this.keyEvents[key] instanceof Function)
        this.keyEvents[key]()
    })
  }

  handleScreenIntersection() {
    if (this._pos.x + this._size > canvas.width) {
      this._pos.x = -this._size;
    } else if (this._pos.x < 0) {
      this._pos.x = canvas.width;
    } else if (this._pos.y + this._size > canvas.height) {
      this._pos.y = -this._size;
    } else if (this._pos.y < 0) {
      this._pos.y = canvas.height;
    }
  }

  eat(fruit) {
    if (
      this._pos.x === fruit.pos.x &&
      this._pos.y === fruit.pos.y
    ) {
      return true;
    }

    return false;
  }

  grow() {
    this._body.push({ ...this._pos });
  }

  update() {
    this.handleScreenIntersection();

    this._pos.x += this._vel.x;
    this._pos.y += this._vel.y;

    this._body.shift();
    this._body.push({ ...this._pos })
  }

  show() {
    for (let i = 0; i < this._body.length; i++) {
      canvas.context.fillStyle = this._color;
      canvas.context.fillRect(this._body[i].x, this._body[i].y, this._size, this._size);
    }
  }
}
