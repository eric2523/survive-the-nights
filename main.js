import { Game } from "./game.js"
import { Controls } from "./controls.js"

const canvas = document.getElementById("myCanvas")

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const game = new Game(canvas)
  const controls = new Controls()
  game.render()
  window.addEventListener("keypress", () => {
    controls.handleKeyPress()
  })
})