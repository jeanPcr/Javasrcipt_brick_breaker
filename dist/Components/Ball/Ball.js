import { detectCollision } from "../../collisionDetection.js";
export default class Ball {
  constructor(game) {
    this.game = game;
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.image = document.getElementById("img_ball");
    this.onBrickCollision = this.gameHeight / 100;
    this.reset();
    this.size = {
      width: 30,
      height: 30,
    };
  }
  reset() {
    this.position = {
      x: this.gameWidth / 2,
      y: this.gameHeight / 2,
    };
    this.speed = {
      x: this.gameHeight / 90,
      y: -this.gameHeight / 100,
    };
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
  onBorderCollision() {
    if (
      this.position.x > this.gameWidth - this.size.width ||
      this.position.x < 0
    ) {
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    if (this.position.y > this.gameHeight - this.size.height) {
      this.game.onFail();
    }
  }
  onPaddleCollision() {
    if (detectCollision(this, this.game.paddle)) {
      console.log(this.game.paddle.speed);
      this.speed.y = -this.speed.y + this.game.paddle.maxSpeed / 100;
      this.position.y = this.game.paddle.position.y - this.size.height;
      console.log(this.speed.y);
    }
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.onBorderCollision();

    this.onPaddleCollision();
  }
}
