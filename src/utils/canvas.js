import { PIXEL_SIZE } from 'utils/constants';

let canvas;

class Canvas {
  constructor() {
    this._screen;
    this._context;
    this._pixelSize;
  }

  create(width, height) {
    this._screen = document.createElement('canvas');

    this._screen.width = width;
    this._screen.height = height;

    this._pixelSize = Math.ceil(width / height) * 10;

    this._context = this._screen.getContext('2d');

    document.body.insertAdjacentElement('afterbegin', this._screen);
  }

  get width() {
    return this._screen.width;
  }

  get height() {
    return this._screen.height;
  }

  get pixelSize() {
    return this._pixelSize;
  }

  get context() {
    return this._context;
  }

  getRandomPosition() {
    const randomX = Math.floor(Math.random() * this.width);
    const randomY = Math.floor(Math.random() * this.height);

    const x = randomX - (randomX % this._pixelSize);
    const y = randomY - (randomY % this._pixelSize);

    return { x, y };
  }
}

canvas = new Canvas();

export default canvas;
