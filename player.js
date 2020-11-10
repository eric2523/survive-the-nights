import { Fireball } from "./fireball.js";

const idleFrameSet = [3, 4, 5, 6, 7, 8, 81, 82, 83, 84];
const movingFrameSet = [20];
const dyingFrameSet = [63, 64, 61]

export class Player {
  constructor(type, canvas, xPos, yPos, velocity, image, scale) {
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
    // fireball
    this.firing = false;
    this.fireball = null;
    // sprite animations
    this.count = 0;
    this.delay = 15;
    this.frame = 0;
    this.frameIndex = 0;
    this.frameSet = idleFrameSet;
    // health information
    this.lives = 5;
    //
    this.scale = scale;
    //
    this.keyDown = false;
    this.direction = null;
    this.moving = true;
  }

  resetStartingPos() {
    (this.xPos = 32), (this.yPos = 32);
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
    if (_collided) return true;
    return false;
  }

  stopMoving() {
    this.change(idleFrameSet);
    this.keyDown = false;
  }

  changeDirection(direction){
    this.keyDown = true;
    this.direction = direction  
  }

  move() {
    this.change(movingFrameSet)
    switch (this.direction) {
      case "down":
          this.yPos += this.velocity;
        break;
      case "up":
        this.yPos -= this.velocity;
        break;
      case "right":
        this.xPos += this.velocity;
        break;
      case "left":
        this.xPos -= this.velocity;
        break;
      default:
        break;
    }
  }

  releaseFire() {
    this.firing = false;
  }

  fire(direction) {
    this.keyDown = false;
    this.firing = true;
    this.fireball = new Fireball(this.canvas, (this.xPos + this.width / 2),( this.yPos + this.height / 2), direction);
  }

  animateDeath(){
    this.change(dyingFrameSet, 25)
  }

  moveTowards(player) {
    this.change(movingFrameSet);
    let xDiff = this.xPos - player.xPos;
    let yDiff = this.yPos - player.yPos;

    xDiff < 0 ? (this.xPos += 0.3) : (this.xPos -= 0.3);
    yDiff < 0 ? (this.yPos += 0.3) : (this.yPos -= 0.3);
  }

  change(frameSet, delay = 15) {
    if (this.frameSet !== frameSet) {
      this.count = 0;
      this.delay = delay;
      this.frameIndex = 0;
      this.frameSet = frameSet;
      this.frame = this.frameSet[this.frameIndex];
    }
  }

  update() {
    this.count++;
    if (this.count >= this.delay) {
      this.count = 0;
      this.frameIndex =
        this.frameIndex == this.frameSet.length - 1 ? 0 : this.frameIndex + 1;
      this.frame = this.frameSet[this.frameIndex];
    }
  }

  renderSprite() {
    let sourceX = (this.frame % 18) * 64;
    let sourceY = Math.floor(this.frame / 18) * 64;
    this.ctx.drawImage(
      this.image,
      sourceX,
      sourceY,
      64,
      64,
      this.xPos,
      this.yPos,
      64 * this.scale,
      64 * this.scale
    );
  }

  draw() {
    this.prevX = this.xPos;
    this.prevY = this.yPos;
    this.checkBorderCollision();
    this.update();
    if (this.keyDown){
      this.move()
    }
    this.renderSprite();
    if (this.firing) {
      this.fireball.draw();
      this.fireball.update();
    }
  }
}
