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
  const playAgain = document.getElementById("play-again-btn");
  const loadingScreen = document.getElementsByClassName("loading-screen")[0]

  playAgain.addEventListener("click", () => {
    playAgain.classList.add("hide");
    engine.restartGame();
    engine.running = true;
    engine.start();
  })
  
  nextLevel.addEventListener("click", () => {
    nextLevel.classList.add("hide")
    engine.game.createLevel(engine.game.level);
    engine.run();
  })

  startGame.addEventListener("click", () => {
    loadingScreen.classList.add("hide");
    engine.restartGame();
    engine.running = true;
    engine.start();
  });

  home.addEventListener("click", () => {
    nextLevel.classList.add("hide");
    loadingScreen.classList.remove("hide");
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
