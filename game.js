import { Display } from "./display.js";
import { Player } from "./player.js";

export class Game {
  constructor(canvas) {
    this.player = new Player(canvas);
    this.display = new Display(canvas, this.player);
    this.render = this.render.bind(this);
  }

  render() {
    this.display.draw();
    this.player.draw();
  }
}
