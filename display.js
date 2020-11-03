export class Display {
  constructor(canvas){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
  }

  // need to write funciton to dynamically create canvas size 

  createBackground(ctx, color){
    ctx.fillStyle = color
    ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill()
  }

  draw(color){
    this.createBackground(this.ctx, color)
  }
}

