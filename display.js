import { Player } from "./player.js"

export class Display {
  constructor(canvas){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.player = new Player(canvas)
  }

  // need to write funciton to dynamically create canvas size 

  createBackground(ctx){
    ctx.fillStyle = "red"
    ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill()
  }

  draw(){
    this.createBackground(this.ctx)
    this.player.draw()
  }
}

