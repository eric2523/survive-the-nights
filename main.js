import { Engine } from "./engine.js"

const canvas = document.getElementById("myCanvas")

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const engine = new Engine(60, canvas)
  
  engine.start("loading-screen");
  
  const startGame = document.getElementById("start-game")
  const home = document.getElementById("home")
  const pause = document.getElementById("pause")
  const play = document.getElementById("play")
  const restart = document.getElementById("restart")

  startGame.addEventListener("click", () => {
    debugger
    startGame.classList.add("hide")
    engine.restartGame();
    engine.start();
  })

  home.addEventListener("click", () => {
    startGame.classList.remove("hide")
    engine.stop();
    engine.start("loading-screen")
  })

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