export class Heart {
  constructor(xPos, yPos, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.image = new Image();
    this.image.src = "./sprites/heart_animated_1.png";
    this.xPos = xPos;
    this.yPos = yPos;
    this.spriteWidth = 17;
    this.spriteHeight = 17;
    this.draw = this.draw.bind(this);
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
