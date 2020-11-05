export class Fireball {
  constructor(canvas, xPos, yPos, direction) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.xPos = xPos;
    this.yPos = yPos;
    // sprite settings
    this.spriteHeight = 26;
    this.spriteWidth = 10;
    this.direction = direction;
    this.image = new Image();
    this.image.src = "./sprites/Small_Fireball_10x26.png";
    this.velocity = 10;
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

  draw() {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.xPos,
      this.yPos,
      this.spriteWidth,
      this.spriteHeight
    );
  }
}