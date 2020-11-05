export class Engine {
  constructor(fps, render, update){
    this.fps = fps;
    this.render = render;
    this.update = update
    this.time = null;
    this.accumulated_time = null;
    this.animationFrameRequest = null;
    this.handleRun = this.handleRun.bind(this);
    this.run = this.run.bind(this);
  }

  handleRun(timeStamp){
    this.run(timeStamp)
  }

  run(timeStamp){
    // this.accumulated_time += timeStamp - this.time 
    // this.time = timeStamp

    // if (this.accumulated_time >= this.fps * 3) {
    //   this.accumulated_time = this.fps;
    // }

    // while(this.accumulated_time >= this.fps) {
    //   this.accumulated_time -= this.fps;
    //   this.render()
    // }
    this.render()
    this.animationFrameRequest = window.requestAnimationFrame(this.handleRun)
  }

  start(){
    this.accumulated_time = this.fps;
    this.time = window.performance.now();
    this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
  }

  stop(){
    window.cancelAnimationFrame(this.animationFrameRequest)
  }
}
