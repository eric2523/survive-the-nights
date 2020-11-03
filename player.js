export class Player {
  constructor(canvas, defaultSettings){
    this.canvas = canvas
    this.xPos = 0
    this.yPos = 0
    this.width = 50;
    this.height = 50;
    this.velocity = 20
    this.velocityX = 0;
    this.velocityY = 0;
    this.ctx = canvas.getContext("2d")
    this.draw = this.draw.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveUp = this.moveUp.bind(this)
  }

  moveLeft(){
    this.velocityX -= this.velocity
    this.xPos = this.velocityX
  }

  moveRight(){
    this.velocityX += this.velocity
    this.xPos = this.velocityX
  }

  moveUp(){
    this.velocityY -= this.velocity
    this.yPos = this.velocityY
  }

  moveDown(){
    this.velocityY += this.velocity
    this.yPos = this.velocityY
  }

  draw(){
    this.ctx.fillStyle = "blue"
    // this.ctx.rect(0,0, 50, 50)
    this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height)
  }
}