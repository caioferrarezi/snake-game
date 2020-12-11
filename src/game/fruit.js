import canvas from 'utils/canvas';
import { COLORS, PIXEL_SIZE } from 'utils/constants';

export default class Fruit {
  constructor () {
    this._size = PIXEL_SIZE;
    this._color = COLORS.fruit;
    this._pos = this.getRandomPosition();
  }

  get pos() {
    return { ...this._pos };
  }

  getRandomPosition() {
    const randomX = Math.floor(Math.random() * canvas.width);
    const randomY = Math.floor(Math.random() * canvas.height);

    const x = randomX - (randomX % this._size);
    const y = randomY - (randomY % this._size);

    return { x, y };
  }

  update() {
    this._pos = this.getRandomPosition()
  }

  show() {
    canvas.context.fillStyle = this._color;
    canvas.context.fillRect(this._pos.x, this._pos.y, this._size, this._size);
  }
}
