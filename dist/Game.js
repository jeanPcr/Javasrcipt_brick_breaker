import Paddle from "./Components/Paddle/Paddle.js";
import InputHadler from "./input.js";
import Ball from "./Components/Ball/Ball.js";
import { buildLevel } from "./levels.js";
import { confetti } from "./Components/Confetti/confetti.js";
import Player from "./Components/Player/Player.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  FAIL: 3,
  GAMEOVER: 4,
  WON: 5,
  NEXTLEVEL: 6,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.player = new Player(this, prompt("Entrez votre pseudo"));
    this.gameObjects = [];
    new InputHadler(this.paddle, this);
    this.bricks = [];
    this.currentLevel = 0;
    this.initialize();
  }

  initialize() {
    this.player.reset();
    this.ball.reset();
    this.paddle.initialize();
  }

  start() {
    if (
      this.gameState !== GAMESTATE.RUNNING &&
      this.gameState !== GAMESTATE.WON
    ) {
      if (this.gameState !== GAMESTATE.FAIL) {
        this.bricks = buildLevel(this, this.currentLevel);
      }

      this.gameObjects = [this.ball, this.paddle, this.player];
      this.gameState = GAMESTATE.RUNNING;
    }
  }
  onLoose() {
    if (this.player.lives === 0) {
      this.gameState = GAMESTATE.GAMEOVER;
      this.initialize();
    }
  }
  onFail() {
    this.player.lives -= 1;
    if (this.player.lives !== 0) {
      this.gameState = GAMESTATE.FAIL;
      this.ball.reset();
    }
  }
  onWin() {
    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.initialize();
      confetti.start(1000);
      setTimeout(() => {
        this.gameState = GAMESTATE.NEXTLEVEL;
      }, 3000);

      this.gameState = GAMESTATE.WON;
    }
  }

  update(deltaTime) {
    //CHECK FOR LOOSE
    this.onLoose();

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER ||
      this.gameState === GAMESTATE.WON ||
      this.gameState === GAMESTATE.NEXTLEVEL ||
      this.gameState === GAMESTATE.FAIL
    )
      return;
    //UPDATE OBJECTS AND BRICKS
    [...this.gameObjects, ...this.bricks].forEach((Object) =>
      Object.update(deltaTime)
    );
    //DELETE BRICKS
    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);

    //CHECKING FOR VICTORY
    this.onWin();
  }

  draw(ctx) {
    //DRAW OBJECTS AND BRICKS
    [...this.gameObjects, ...this.bricks].forEach((Object) => Object.draw(ctx));

    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.9)";
      ctx.stroke();
      ctx.fill();

      ctx.font = "40px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("MENU", this.gameWidth / 2, this.gameHeight / 6);
      ctx.strokeStyle = "yellow";
      ctx.strokeText(
        "Bonne chance " + this.player.name + " !",
        this.gameWidth / 2,
        this.gameHeight / 2
      );

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText(
        "Appuyer sur ESPACE",
        this.gameWidth / 2,
        this.gameHeight / 1.5
      );
    }
    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.stroke();
      ctx.fill();

      ctx.font = "40px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSE", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAMESTATE.FAIL) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.stroke();
      ctx.fill();

      ctx.font = "60px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("-1", this.gameWidth / 2, this.gameHeight / 3);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "40px  Arial";
      ctx.fillText(
        "Appuyer sur ESPACE",
        this.gameWidth / 2,
        this.gameHeight / 1.5
      );
    }
    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.stroke();
      ctx.fill();

      ctx.font = "40px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText(
        "Appuyer sur ESPACE pour recommencer",
        this.gameWidth / 2,
        this.gameHeight / 1.5
      );
    }
    if (this.gameState === GAMESTATE.WON) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.stroke();
      ctx.fill();

      ctx.font = "50px Arial";
      ctx.fillStyle = "yellow";
      ctx.textAlign = "center";
      ctx.fillText("GAGNÉ !", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAMESTATE.NEXTLEVEL) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.9)";
      ctx.stroke();
      ctx.fill();
      ctx.font = "50px Arial";
      ctx.fillStyle = "yellow";
      ctx.textAlign = "center";
      ctx.fillText(
        "NIVEAU " + (this.currentLevel + 1),
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText(
        "Appuyer sur ESPACE",
        this.gameWidth / 2,
        this.gameHeight / 1.5
      );
    }
  }
  togglePause() {
    if (
      this.gameState === GAMESTATE.PAUSED &&
      this.gameState !== GAMESTATE.WON
    ) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      if (this.gameState !== GAMESTATE.MENU) this.gameState = GAMESTATE.PAUSED;
    }
  }
}
