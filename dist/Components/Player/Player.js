export default class Player {
  constructor(game, name) {
    this.game = game;
    this.liveImg = document.getElementById("img_heart");
    this.name = "No name";
    this.reset(name);
    this.namePosition = {
      x: this.name.length + 100,
      y: this.game.gameHeight / 15,
    };

    this.heartPosition = {
      x: this.namePosition.x + 100,
      y: 15,
    };
  }
  reset(name) {
    this.lives = 3;
    name && (this.name = name);
  }
  draw(ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.fillText(this.name + " : ", this.namePosition.x, this.namePosition.y);
    for (let index = 0; index < this.lives; index++) {
      ctx.drawImage(
        this.liveImg,
        this.heartPosition.x + index * 30,
        this.heartPosition.y,
        30,
        30
      );
    }
  }
  update(deltaTime) {}
}
