import { Engine } from "./engine.js";

const canvas = document.getElementById("myCanvas");

window.addEventListener("DOMContentLoaded", () => {
  // initialize game
  const engine = new Engine(60, canvas);
  engine.start("loading-screen");

  // audio files
  let backgroundMusic = new Audio();
  backgroundMusic.src =
    "https://raw.githubusercontent.com/eric2523/survive-the-nights/main/sound/2020-03-22_-_A_Bit_Of_Hope_-_David_Fesliyan.mp3";

  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.25;

  const muteSound = document.getElementById("mute-sound");

  let playSound = false;
  muteSound.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      muteSound.children[0].textContent = "Mute"
      playSound = true;
      backgroundMusic.play();
    } else {
      muteSound.children[0].textContent = "Unmute"
      playSound = false;
      backgroundMusic.pause();
    }
  });

  const startGame = document.getElementById("start-game");
  const home = document.getElementById("home");
  const pause = document.getElementById("pause");
  const play = document.getElementById("play");
  const restart = document.getElementById("restart");
  const nextLevel = document.getElementById("next-level-btn");
  const playAgain = document.getElementById("play-again-btn");
  const loadingScreen = document.getElementsByClassName("loading-screen")[0];

  playAgain.addEventListener("click", () => {
    playAgain.classList.add("hide");
    engine.restartGame();
    engine.running = true;
    engine.start();
  });

  nextLevel.addEventListener("click", () => {
    nextLevel.classList.add("hide");
    engine.game.createLevel(engine.game.level);
    engine.run();
  });

  startGame.addEventListener("click", () => {
    loadingScreen.classList.add("hide");
    engine.restartGame();
    engine.running = true;
    engine.start();
    if (playSound){
      backgroundMusic.play();
    }
  });

  home.addEventListener("click", () => {
    nextLevel.classList.add("hide");
    playAgain.classList.add("hide");
    loadingScreen.classList.remove("hide");
    engine.stop();
    engine.running = true;
    engine.start("loading-screen");
  });

  restart.addEventListener("click", () => {
    nextLevel.classList.add("hide");
    playAgain.classList.add("hide");
    loadingScreen.classList.add("hide");
    engine.restartGame();
    engine.running = true;
    engine.start();
  });

  pause.addEventListener("click", () => {
    if (engine.running) {
      engine.running = false;
      engine.stop();
      backgroundMusic.pause();
    }
  });

  play.addEventListener("click", () => {
    if (!engine.running) {
      engine.running = true;
      engine.run();
      if (playSound){
        backgroundMusic.play();
      }
    }
  });

  window.addEventListener("keydown", () => {
    engine.controls.handleKeyDown();
  });

  window.addEventListener("keyup", () => {
    engine.controls.handleKeyUp();
  });
});
