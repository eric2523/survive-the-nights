import { TileSheet } from "./tile-sheet.js";
import { Collideable } from "./collideables.js";
import { Heart } from "./entities/heart.js";

const image = new Image();
image.src = "./maps/tileset_dungeon.png";

export class Display {
  constructor(canvas, player, floorData, collidables, settings) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.player = player;
    this.hearts = [];
    this.tileSheet = new TileSheet(settings, canvas, floorData, image);
    this.collidable = new Collideable(
      settings,
      collidables,
      canvas,
      image,
      player
    );
    this.drawLives = this.drawLives.bind(this);
    this.initializeLives = this.initializeLives.bind(this);
  }

  initializeLives() {
    let playerLives = this.player.lives;
    let padding = 20;
    for (let life = 0; life < playerLives; life++) {
      let xPos = life * padding
      let yPos = 10
      this.hearts.push(new Heart(xPos, yPos, this.canvas));
    }
  }

  drawLives(){
    this.hearts.forEach( heart => heart.draw())
  }

  createBackground() {
    this.tileSheet.drawTiles();
  }

  draw() {
    debugger
    this.createBackground();
    this.collidable.checkCollisions();
    this.collidable.mapCollidable();
    this.drawLives();
  }
}
