import Brick from "./Components/Brick/Brick.js";

export function buildLevel(game, level) {
  let bricksPerRow = 10;
  let numberOfRow = 3;
  let brickWidth = Math.round(game.gameWidth / bricksPerRow);
  let brickHeigth = 25;

  let bricks = [];
  let y = 0;
  let x = 0;
  let randomBrick = y * level + 1;

  while (y < numberOfRow) {
    if (x === bricksPerRow) {
      x = 0;
      y++;
    }

    let position = {
      x: brickWidth * x,
      y: game.gameWidth / 10 + brickHeigth * y,
    };

    if (bricks.length < bricksPerRow * numberOfRow && randomBrick % 2)
      bricks.push(
        new Brick(
          game,
          brickWidth,
          brickHeigth,
          position,
          "#" + ((Math.random() * 0xffffff) << 0).toString(16)
        )
      );
    x++;
  }

  return bricks;
}
