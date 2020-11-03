import { Display } from "./display.js"

export class Game {
  constructor(canvas){
    this.display = new Display(canvas)
    this.render = this.render.bind(this)
  }

  render(color){
    const colors = ["red", "blue", "green"]
    this.display.draw(colors[Math.floor(Math.random() * colors.length)])
  }
}
