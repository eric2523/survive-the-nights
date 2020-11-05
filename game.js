import { Display } from "./display.js";
import { Player } from "./player.js";

const playerImage = new Image();
playerImage.src = "./sprites/Char_3.png";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.player = new Player("player", canvas, 32, 32, 32, playerImage);
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
          playerImage
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
