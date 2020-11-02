import { Display } from "./display.js"

class Game {
  constructor(){
    const canvas = document.getElementById("myCanvas")
    this.display = new Display(canvas)
  }

  render(){
    this.display.draw()
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Game().render()
})

