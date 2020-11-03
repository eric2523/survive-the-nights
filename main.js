import { Game } from "./game.js"
import { Controls } from "./controls.js"
import { Engine } from "./engine.js"
import { Display } from "./display.js"

const canvas = document.getElementById("myCanvas")

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const game = new Game(canvas)
  const controls = new Controls(game)
  const engine = new Engine(60, game.render, game.update)
  const display = new Display(canvas)

  // let ctx = canvas.getContext("2d")
  // ctx.fillStyle = "black"
  // ctx.rect(0,0, 50, 50)
  // ctx.fillRect(0,0, 200, 200)
  display.draw();
  // engine.start();
  
  window.addEventListener("keypress", () => {
    controls.handleKeyPress()
  })

})