import { Fireball } from "./fireball.js";

export class Player {
  constructor(type, canvas, xPos, yPos, velocity, image) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    // image
    this.image = image;
    this.type = type;
    // starting positions
    this.xPos = xPos;
    this.yPos = yPos;
    // default height and width
    this.width = 32;
    this.height = 32;
    this.velocity = velocity;
    // previous locations
    this.prevX = xPos;
    this.prevY = yPos;
    // movement and border collisions
    this.moveLeft = this.moveLeft.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.checkBorderCollision = this.checkBorderCollision.bind(this);
    // canvas drawings
    this.releaseFire = this.releaseFire.bind(this);
    this.draw = this.draw.bind(this);
    this.firing = false;
    this.fireball = null;
    this.fire = this.fire.bind(this);
    // this.createBeam = this.createBeam.bind(this);
    this.detectHit = this.detectHit.bind(this);
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

  detectHit(fireball) {
    let fireballTop = fireball.yPos;
    let fireballBottom = fireball.yPos + fireball.spriteHeight;
    let fireballLeft = fireball.xPos;
    let fireballRight = fireball.xPos + fireball.spriteWidth;

    // zombie positions
    let zombieTop = this.yPos;
    let zombieBottom = this.yPos + this.height;
    let zombieLeft = this.xPos;
    let zombieRight = this.xPos + this.width;

    let xOverlaps = zombieLeft < fireballRight && zombieRight > fireballLeft;
    let yOverlaps = zombieTop < fireballBottom && zombieBottom > fireballTop;

    let _collided = xOverlaps && yOverlaps;
    if (_collided) {
      return true;
    }
    return false;
  }

  moveLeft() {
    this.xPos -= this.velocity;
  }

  moveRight() {
    this.xPos += this.velocity;
  }

  moveUp() {
    this.yPos -= this.velocity;
  }

  moveDown() {
    this.yPos += this.velocity;
  }

  releaseFire() {
    this.firing = false;
  }

  fire(direction) {
    this.firing = true;
    window.setTimeout(() => {
      this.releaseFire();
    }, 1000);
    this.fireball = new Fireball(this.canvas, this.xPos, this.yPos, direction);
  }

  draw() {
    this.prevX = this.xPos;
    this.prevY = this.yPos;
    this.checkBorderCollision();
    this.ctx.drawImage(this.image, 0, 0, 50, 55, this.xPos, this.yPos, 50, 55);
    if (this.firing) {
      this.fireball.draw();
      this.fireball.update();
    }
  }
}
