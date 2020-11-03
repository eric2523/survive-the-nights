import { Game } from "./game.js"
import { Controls } from "./controls.js"
import { Engine } from "./engine.js"

const canvas = document.getElementById("myCanvas")

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const game = new Game(canvas)
  const controls = new Controls()
  const engine = new Engine(60, game.render)

  engine.start();
  window.addEventListener("keypress", () => {
    controls.handleKeyPress()
  })

})