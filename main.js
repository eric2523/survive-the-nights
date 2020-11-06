import { Engine } from "./engine.js";

const canvas = document.getElementById("myCanvas");

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const engine = new Engine(60, canvas);

  engine.start("loading-screen");

  const startGame = document.getElementById("start-game");
  const home = document.getElementById("home");
  const pause = document.getElementById("pause");
  const play = document.getElementById("play");
  const restart = document.getElementById("restart");
  const nextLevel = document.getElementById("next-level-btn");
  
  startGame.addEventListener("click", () => {
    startGame.classList.add("hide");
    nextLevel.classList.add("hide");
    engine.restartGame();
    engine.running = true;
    engine.start();
  });

  home.addEventListener("click", () => {
    nextLevel.classList.add("hide");
    startGame.classList.remove("hide");
    engine.stop();
    engine.running = true;
    engine.start("loading-screen");
  });

  restart.addEventListener("click", () => {
    nextLevel.classList.add("hide");
    engine.restartGame();
    engine.running = true;
    engine.start();
  });

  pause.addEventListener("click", () => {
    if (engine.running){
      engine.running = false;
      engine.stop();
    }
  });

  play.addEventListener("click", () => {
    if (!engine.running){
      engine.running = true;
      engine.run();
    }
  });

  window.addEventListener("keydown", () => {
    engine.controls.handleKeyDown();
  });

  window.addEventListener("keyup", () => {
    engine.controls.handleKeyUp();
  });
});
