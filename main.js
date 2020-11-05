import { Engine } from "./engine.js"

const canvas = document.getElementById("myCanvas")

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const engine = new Engine(60, canvas)
  
  engine.start();
  
  window.addEventListener("keydown", () => {
    engine.controls.handleKeyDown()
  })

  window.addEventListener("keyup", () => {
    engine.controls.handleKeyUp()
  })

})