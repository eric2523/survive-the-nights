import { Display } from "./display.js"
import { Player } from "./player.js"

export class Game {
  constructor(canvas){
    this.player = new Player(canvas)
    this.display = new Display(canvas)
    this.render = this.render.bind(this)
  }

  render(){
    const colors = ["red", "blue", "green"]
    // this.display.draw()
    this.player.draw()
  }
}
