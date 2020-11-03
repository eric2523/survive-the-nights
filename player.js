export class Player {
  constructor(canvas){
    this.canvas = canvas
    this.xPos = 0
    this.yPos = 0
    this.width = 50;
    this.height = 50;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.ctx = canvas.getContext("2d")
  }

  draw(){
    this.ctx.fillStyle = "blue"
    // this.ctx.rect(0,0, 50, 50)
    this.ctx.fillRect(this.xPos, this.xPos, this.width, this.height)
  }
}