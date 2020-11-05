import { Fireball } from "./fireball.js";

export class Player {
  constructor(canvas, defaultSettings) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    // starting positions
    this.xPos = 32;
    this.yPos = 32;
    // default height and width
    this.width = 32;
    this.height = 32;
    this.velocity = 32;
    // previous locations
    this.prevX = 32;
    this.prevY = 32;
    // movement and border collisions
    this.moveLeft = this.moveLeft.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.checkBorderCollision = this.checkBorderCollision.bind(this);
    // canvas drawings
    this.releaseFire = this.releaseFire.bind(this)
    this.draw = this.draw.bind(this);
    this.firing = false;
    this.fireball = null;
    this.fire = this.fire.bind(this);
    // this.createBeam = this.createBeam.bind(this);
  }

  checkBorderCollision() {
    if (this.xPos <= 0) {
      this.xPos = 0;
    } else if (this.xPos + this.width > this.canvas.width) {
      this.xPos = this.canvas.width - this.width;
    }

    if (this.yPos <= 0) {
      this.yPos = 0;
    } else if (this.yPos + this.height > this.canvas.height) {
      this.yPos = this.canvas.height - this.height;
    }
  }

  moveLeft() {
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    this.xPos -= this.velocity;
  }

  moveRight() {
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    this.xPos += this.velocity;
  }

  moveUp() {
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    this.yPos -= this.velocity;
  }

  moveDown() {
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
    this.yPos += this.velocity;
  }

  releaseFire(){
    this.firing = false;
  }

  fire(mousePos) {
    this.firing = true;
    window.setTimeout(() => {
      this.releaseFire();
    }, 1000)  
    this.fireball = new Fireball(this.canvas, this.xPos, this.yPos, mousePos)
  }

  draw() {
    this.prevX = this.xPos;
    this.prevY = this.yPos;
    this.checkBorderCollision();
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    if(this.firing){
      this.fireball.draw()
      this.fireball.update()
    }
  }
}
