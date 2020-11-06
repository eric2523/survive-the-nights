import { Game } from "./game.js"
import { Controls } from "./controls.js";

export class Engine {
  constructor(fps, canvas){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.fps = fps;
    this.game = new Game(canvas);
    this.controls = new Controls(this.game)
    this.time = null;
    this.accumulated_time = null;
    this.animationFrameRequest = null;
    this.handleRun = this.handleRun.bind(this);
    this.run = this.run.bind(this);
  }

  handleRun(){
    if (this.game.gameOver){
      // debugger
      this.stop()
      // this.restartGame();
    } else {
      this.run()
    }
  }

  restartGame(){
    this.game = new Game(this.canvas)
    this.controls = new Controls(this.game)
    this.start();
  }

  run(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.game.render()
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun)
  }

  start(){
    this.game.populateZombies();
    this.game.display.initializeLives();
    this.accumulated_time = this.fps;
    this.time = window.performance.now();
    this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
  }

  stop(){
    window.cancelAnimationFrame(this.animationFrameRequest)
  }
}
