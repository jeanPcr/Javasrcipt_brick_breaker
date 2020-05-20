import Game from "./Game.js";

let canvas = document.querySelector("#gameScreen");
let ctx = canvas.getContext("2d");

let GAME_HEIGHT = window.innerHeight - 50;
let GAME_WIDTH = window.innerWidth - 100;

if (window.innerWidth > 1000 && window.innerHeight > 900) {
  GAME_WIDTH = 1000;
  GAME_HEIGHT = 800;
}
if (window.innerWidth < 1000 && window.innerHeight > 700) {
  GAME_WIDTH = 800;
  GAME_HEIGHT = 700;
}

canvas.setAttribute("width", GAME_WIDTH);
canvas.setAttribute("height", GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let lastTime = 0;
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
