export default class Paddle {
  constructor(game) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.width = this.gameWidth / 10;
    this.height = 10;
    this.initialize();
    this.maxSpeed = this.gameWidth / 100;
    this.speed = 0;
  }

  initialize() {
    this.position = {
      x: this.game.gameWidth / 2 - this.width / 2,
      y: this.game.gameHeight - this.height - 10,
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;

    if (this.position.x > this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }
}
