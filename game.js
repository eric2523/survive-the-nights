import { Display } from "./display.js";
import { Player } from "./player.js";

const playerImage = new Image 
playerImage.src = "./sprites/Char_3.png"

export class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.player = new Player(canvas, 32, 32, 32, playerImage);
    this.zombies = []
    this.display = new Display(canvas, this.player);
    this.render = this.render.bind(this);
    this.populateZombies = this.populateZombies.bind(this)
    this.drawZombies = this.drawZombies.bind(this)
  }

  populateZombies(){
    for (let i = 0; i < 5; i++) {
      let randomX = Math.round(Math.random() * this.canvas.width)
      let randomY = Math.round(Math.random() * this.canvas.height)

      this.zombies.push(
        new Player(this.canvas, randomX, randomY, 32, playerImage)
      )
    }
  }

  drawZombies(){
    this.zombies.forEach((zombie) => {
      zombie.draw()
    })
  }

  render() {
    this.display.draw();
    this.player.draw();
    this.drawZombies();
  }
}
