import { PIXEL_SIZE } from 'utils/constants';

let canvas;

class Canvas {
  constructor() {
    this._screen;
    this._context;
  }

  create(width, height) {
    this._screen = document.querySelector("#screen");

    this._screen.width = width;
    this._screen.height = height;

    this._context = this._screen.getContext('2d');
  }

  get width() {
    return this._screen.width;
  }

  get height() {
    return this._screen.height;
  }

  get context() {
    return this._context;
  }

  getRandomPosition() {
    const randomX = Math.floor(Math.random() * this.width);
    const randomY = Math.floor(Math.random() * this.height);

    const x = randomX - (randomX % PIXEL_SIZE);
    const y = randomY - (randomY % PIXEL_SIZE);

    return { x, y };
  }
}

canvas = new Canvas();

export default canvas;
