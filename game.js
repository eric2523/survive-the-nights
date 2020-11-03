import { Display } from "./display.js"
import { Player } from "./player.js"

export class Game {
  constructor(canvas){
    this.defaultSettings = {
      velocity: 1,
      player: new Player(canvas)
    }
    this.display = new Display(canvas)
    this.render = this.render.bind(this)
  }

  render(){
    const colors = ["red", "blue", "green"]
    this.display.draw(colors[0])
    this.defaultSettings.player.draw()
  }
}
