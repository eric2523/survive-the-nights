import { Game } from "./game.js"
import { Controls } from "./controls.js"
import { Engine } from "./engine.js"

const canvas = document.getElementById("myCanvas")

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const game = new Game(canvas)
  const controls = new Controls(game)
  const engine = new Engine(60, game.render, game.update)
  
  engine.start();
  
  window.addEventListener("keypress", () => {
    controls.handleKeyPress()
  })

})