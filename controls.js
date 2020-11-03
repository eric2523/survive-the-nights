export class Controls {
  constructor(game) {
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.game = game
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
