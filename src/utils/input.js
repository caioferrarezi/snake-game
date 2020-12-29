class Input {
  constructor() {
    this._pressed = null;

    this._init();
  }

  _init() {
    document.addEventListener('keydown', event => this._trackKey(event))
    document.addEventListener('keyup', event => this._removeKey(event))
  }

  _trackKey({ keyCode }) {
    this._pressed = keyCode;
  }

  _removeKey({ keyCode }) {
    this._pressed = null;
  }

  is(key = []) {
    return key.includes(this._pressed);
  }
}

const input = new Input();

export default input;
