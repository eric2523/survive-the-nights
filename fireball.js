const fireBallFrameSet = [0, 1, 2, 3, 4, 5];

export class Fireball {
  constructor(canvas, xPos, yPos, direction) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.xPos = xPos;
    this.yPos = yPos;
    // sprite settings
    this.spriteHeight = 10;
    this.spriteWidth = 26;
    this.direction = direction;
    this.image = new Image();
    this.image.src = "./sprites/Small_Fireball_10x26.png";
    this.velocity = 5;
    // sprite animations
    this.count = 0;
    this.delay = 15;
    this.frame = 0;
    this.frameIndex = 0;
    this.frameSet = fireBallFrameSet;
  }

  update() {
    switch (this.direction) {
      case "left":
        this.xPos -= this.velocity;
        break;
      case "right":
        this.xPos += this.velocity;
        break;
      case "up":
        this.yPos -= this.velocity;
        break;
      case "down":
        this.yPos += this.velocity;
        break;
      default:
        break;
    }
  }

  updateAnimation() {
    this.count++;
    if (this.count >= this.delay) {
      this.count = 0;
      this.frameIndex =
        this.frameIndex == this.frameSet.length - 1 ? 0 : this.frameIndex + 1;
      this.frame = this.frameSet[this.frameIndex];
    }
  }

  renderSprite() {
    let sourceX = (this.frame % 6) * this.spriteWidth;
    let sourceY = Math.floor(this.frame / 6) * this.spriteHeight;
    this.ctx.drawImage(
      this.image,
      sourceX,
      sourceY,
      this.spriteWidth,
      this.spriteHeight,
      this.xPos,
      this.yPos,
      this.spriteWidth,
      this.spriteHeight
    );
  }

  draw() {
    this.updateAnimation();
    this.renderSprite();
  }
}
