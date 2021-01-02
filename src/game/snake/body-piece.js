export default class BodyPiece {
  constructor(x, y, prev = null, next = null) {
    this.x = x;
    this.y = y;
    this.prev = prev;
    this.next = next;
  }
}
