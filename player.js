export class Player {
  constructor(canvas, defaultSettings){
    this.canvas = canvas
    this.xPos = 0
    this.yPos = 0
    this.width = 50;
    this.height = 50;
    // velocity needs to be changed later based on canvas size or vice versa
    this.velocity = 10;
    this.velocityX = 0;
    this.velocityY = 0;
    this.ctx = canvas.getContext("2d")
    this.draw = this.draw.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveUp = this.moveUp.bind(this)
    this.checkBorderCollision = this.checkBorderCollision.bind(this)
  }

  checkBorderCollision(){
    if (this.xPos <= 0){
      this.velocityX = 0
      this.xPos = 0
    } else if ((this.xPos + this.width) > this.canvas.width) {
      this.velocityX = 0
      this.xPos = this.canvas.width - this.width
    }

    if (this.yPos <= 0){
      this.velocityY = 0
      this.yPos = 0
    } else if ((this.yPos + this.height) > this.canvas.height) {
      this.velocityY = 0
      this.yPos = this.canvas.height - this.heights
    }
  }


  moveLeft(){
    this.velocityX += this.velocity
    this.xPos -= this.velocityX
  }

  moveRight(){
    this.velocityX += this.velocity
    this.xPos += this.velocityX
  }

  moveUp(){
    this.velocityY += this.velocity
    this.yPos -= this.velocityY
  }

  moveDown(){
    this.velocityY += this.velocity
    this.yPos += this.velocityY
  }

  draw(){
    this.checkBorderCollision()
    this.ctx.fillStyle = "blue"
    // this.ctx.rect(0,0, 50, 50)
    this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height)
  }
}