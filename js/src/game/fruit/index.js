import canvas from 'canvas';
import { COLORS } from 'utils/constants';

export default class Fruit {
  constructor () {
    this._size = canvas.pixelSize;
    this._color = COLORS.FRUIT;
    this._pos = canvas.getRandomPosition();
  }

  get x() {
    return this._pos.x;
  }

  get y() {
    return this._pos.y;
  }

  update() {
    this._pos = canvas.getRandomPosition();
  }

  show() {
    canvas.context.fillStyle = this._color;
    canvas.context.fillRect(this._pos.x, this._pos.y, this._size, this._size);
  }
}
