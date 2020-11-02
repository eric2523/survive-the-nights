import { Display } from "./display.js"

export class Game {
  constructor(canvas){
    this.display = new Display(canvas)
  }

  render(){
    this.display.draw()
  }
}
