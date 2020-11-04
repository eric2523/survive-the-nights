export class Player {
  constructor(canvas, defaultSettings) {
    this.canvas = canvas;
    this.xPos = 32;
    this.yPos = 32;
    this.width = 32;
    this.height = 32;
    // velocity needs to be changed later based on canvas size or vice versa
    this.velocity = 32;
    // this.acceleration= 3;
    this.velocityX = 0;
    this.velocityY = 0;
    this.prevX = 32;
    this.prevY = 32;
    this.ctx = canvas.getContext("2d");
    this.draw = this.draw.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.checkBorderCollision = this.checkBorderCollision.bind(this);
    this.fire = this.fire.bind(this);
    this.createBeam = this.createBeam.bind(this)
  }

  checkBorderCollision() {
    if (this.xPos <= 0) {
      this.velocityX = 0;
      this.xPos = 0;
    } else if (this.xPos + this.width > this.canvas.width) {
      this.velocityX = 0;
      this.xPos = this.canvas.width - this.width;
    }

    if (this.yPos <= 0) {
      this.velocityY = 0;
      this.yPos = 0;
    } else if (this.yPos + this.height > this.canvas.height) {
      this.velocityY = 0;
      this.yPos = this.canvas.height - this.height;
    }
  }

  moveLeft() {
    this.velocityX += this.velocity;
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    this.xPos -= this.velocity;
  }

  moveRight() {
    this.velocityX += this.velocity;
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    this.xPos += this.velocity;
  }

  moveUp() {
    this.velocityY += this.velocity;
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    this.yPos -= this.velocity;
  }

  moveDown() {
    this.velocityY += this.velocity;
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    this.yPos += this.velocity;
  }

  fire(mousePos) {
    this.createBeam(mousePos)
  }

  createBeam(mousePos) {
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = "orange";
    this.ctx.beginPath();
    this.ctx.moveTo(this.xPos + 16, this.yPos + 16);
    this.ctx.lineTo(mousePos[0], mousePos[1]);
    this.ctx.stroke();
  }

  draw() {
    this.prevX = this.xPos;
    this.prevY = this.yPos;
    this.checkBorderCollision();
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}
