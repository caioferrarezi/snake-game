import { COLORS } from './constants'

export default class Snake {
  constructor(screen, context) {
    this.screen = screen;
    this.context = context;

    this.body = [];

    this.size = 10;
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };

    this.body.push({ ...this.pos });

    window.addEventListener('keyup', ({ key }) => {
      if (this.keyEvents[key] instanceof Function)
        this.keyEvents[key]()
    })
  }

  get keyEvents() {
    return {
      'ArrowUp': () => {
        this.vel = { x: 0, y: -this.size };
      },
      'ArrowDown': () => {
        this.vel = { x: 0, y: this.size };
      },
      'ArrowLeft': () => {
        this.vel = { x: -this.size, y: 0 };
      },
      'ArrowRight': () => {
        this.vel = { x: this.size, y: 0 };
      }
    }
  }

  handleScreenIntersection() {
    if (this.pos.x + this.size > this.screen.width) {
      this.pos.x = -this.size;
    } else if (this.pos.x < 0) {
      this.pos.x = this.screen.width;
    } else if (this.pos.y + this.size > this.screen.height) {
      this.pos.y = -this.size;
    } else if (this.pos.y < 0) {
      this.pos.y = this.screen.height;
    }
  }

  eat() {}

  update() {
    this.handleScreenIntersection();

    this.eat();

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.body.shift();
    this.body.push({ ...this.pos })
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      this.context.fillStyle = COLORS.SNAKE;
      this.context.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
    }
  }
}
