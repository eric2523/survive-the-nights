export class Player {
  constructor(canvas){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
  }

  draw(){
    this.ctx.fillStyle = "blue"
    // this.ctx.rect(0,0, 50, 50)
    this.ctx.fillRect(0, 0, 50, 50)
  }
}