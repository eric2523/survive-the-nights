import { Display } from "./display.js";
import { Player } from "./player.js";

const playerImage = new Image();
playerImage.src = "./sprites/Char_3.png";

const enemyImage = new Image();
enemyImage.src = "./sprites/Char_4.png"

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.player = new Player("player", canvas, 32, 32, 20, playerImage);
    this.zombies = {};
    this.display = new Display(canvas, this.player);
    this.render = this.render.bind(this);
    this.populateZombies = this.populateZombies.bind(this);
    this.drawZombies = this.drawZombies.bind(this);
  }

  populateZombies() {
    for (let i = 0; i < 5; i++) {
      let randomX = Math.round(Math.random() * this.canvas.width);
      let randomY = Math.round(Math.random() * this.canvas.height);

      this.zombies[i] = {
        id: i,
        obj: new Player(
          "zombie",
          this.canvas,
          randomX,
          randomY,
          32,
          enemyImage
        ),
      };
    }
  }

  drawZombies() {
    Object.values(this.zombies).forEach((zombie) => {
      if (this.player.fireball) {
        if (zombie.obj.detectHit(this.player.fireball)) {
          let key = zombie.id;
          delete this.zombies[key];
        }
      }
      zombie.obj.moveTowards(this.player)
      zombie.obj.draw();
    });
  }

  render() {
    this.display.draw();
    this.player.draw();
    this.drawZombies();
  }
}
