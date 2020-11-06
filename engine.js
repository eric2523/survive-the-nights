import { Game } from "./game.js"
import { Controls } from "./controls.js";
import { LoadingScreen } from "./loading-screen.js"

export class Engine {
  constructor(fps, canvas){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.fps = fps;
    this.game = null;
    this.controls = null;
    this.time = null;
    this.loadingScreen = null;
    this.accumulated_time = null;
    this.animationFrameRequest = null;
    this.running = false;
    this.handleRun = this.handleRun.bind(this);
    this.run = this.run.bind(this);
    this.handleLoadingScreenRun = this.handleLoadingScreenRun.bind(this);
  }

  handleRun(){
    (this.game.gameOver) ? this.stop() : this.run();
  }

  handleLoadingScreenRun(){
    this.loadingScreen.draw();
    this.animationFrameRequest = window.requestAnimationFrame(this.handleLoadingScreenRun)
  }

  restartGame(){
    this.stop();
    this.game = new Game(this.canvas)
    this.controls = new Controls(this.game)
    this.game.populateZombies();
    this.game.display.initializeLives();
  }

  run(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.game.render()
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun)
  }

  start(type){
    this.accumulated_time = this.fps;
    this.time = window.performance.now();
    if (type === "loading-screen"){
      this.loadingScreen = new LoadingScreen(this.canvas) 
      this.animation_frame_request = window.requestAnimationFrame(this.handleLoadingScreenRun);
    } else {
      this.loadingScreen = null;
      this.animationFrameRequest = window.requestAnimationFrame(this.handleRun)
    }
  }

  stop(){
    window.cancelAnimationFrame(this.animationFrameRequest)
  }
}
