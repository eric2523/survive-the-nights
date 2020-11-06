import { Engine } from "./engine.js"

const canvas = document.getElementById("myCanvas")

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const engine = new Engine(60, canvas)
  
  engine.start();
  
  const pause = document.getElementById("pause")
  const play = document.getElementById("play")
  const restart = document.getElementById("restart")

  restart.addEventListener("click", () => {
    engine.restartGame();
    engine.start();
  })

  pause.addEventListener("click", () => {
    engine.stop()
  })

  play.addEventListener("click", () => {
    engine.run();
  })

  window.addEventListener("keydown", () => {
    engine.controls.handleKeyDown()
  })

  window.addEventListener("keyup", () => {
    engine.controls.handleKeyUp()
  })

})