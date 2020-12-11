let canvas;

class Canvas {
  constructor() {
    this._screen;
    this._context;
  }

  create(width, height) {
    this._screen = document.createElement('canvas');
    this._screen.width = width;
    this._screen.height = height;

    document.body.insertAdjacentElement('afterbegin', this._screen);

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
}

canvas = new Canvas();

export default canvas;
