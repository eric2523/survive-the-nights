export class Fireball {
  constructor(canvas, xPos, yPos, mousePos) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.xPos = xPos;
    this.yPos = yPos;
    this.mousePos = mousePos;
    this.image = new Image();
    this.image.src = "./sprites/Small_Fireball_10x26.png";
    this.velocity = 10;
  }

  update() {
    let _moveUp = 
      this.mousePos[1] < this.yPos &&
      this.mousePos[0] > this.xPos &&
      this.mousePos[0] < this.xPos + 32
      
    let _moveDown = 
      this.mousePos[0] < this.xPos + 32 &&
      this.mousePos[0] > this.xPos &&
      this.mousePos[1] > this.yPos + 32

    let _moveLeft =
      this.mousePos[0] < this.xPos && 
      this.mousePos[1] > this.yPos &&
      this.mousePos[1] < this.yPos + 32

    let _moveRight = 
      this.mousePos[0] > this.xPos + 32 &&
      this.mousePos[1] > this.yPos &&
      this.mousePos[1] < this.yPos + 32


    if (_moveLeft) {
      this.xPos -= this.velocity;
    } else if (_moveUp) {
      this.yPos -= this.velocity
    } else if (_moveRight) {
      this.xPos += this.velocity
    } else if (_moveDown){
      this.yPos += this.velocity
    }
  }

  draw() {
    this.ctx.drawImage(this.image, 0, 0, 10, 26, this.xPos, this.yPos, 10, 26);
  }
}
