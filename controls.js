export class Controls {
  constructor(game) {
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.game = game
    this.mousePos = null;
  }

  handleMouseMove(){
    this.mousePos = [event.offsetX, event.offsetY]
  }
  
  handleKeyPress() {
    switch (event.keyCode) {
      case 115:
        this.game.player.moveDown()
        break;
      case 119:
        this.game.player.moveUp()
        break;
      case 97:
        this.game.player.moveLeft()
        break;
      case 100:
        this.game.player.moveRight()
        break;
      case 32:
        this.game.player.fire(this.mousePos)
        break;
      default:
        break;
    }
  }
}
