export class Controls {
  constructor(game) {
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.game = game
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyUp(){
    this.game.player.releaseFire()
  }

  handleKeyDown(){
    switch (event.keyCode) {
      case 37:
        this.game.player.fire("left")
        break;
      case 38:
        this.game.player.fire("up")
        break;
      case 39:
        this.game.player.fire("right")
        break;
      case 40:
        this.game.player.fire("down")
        break;
      default:
        break;
    }
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
      default:
        break;
    }
  }
}
