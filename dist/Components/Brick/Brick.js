import { detectCollision } from "../../collisionDetection.js";

export default class Brick {
  constructor(game, width, heigth, position, color) {
    this.game = game;
    this.position = position;
    this.width = width;
    this.height = heigth;
    this.color = color;
    this.markForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = this.game.ball.onBrickCollision;
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
