export class Controls {
  constructor(game) {
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.game = game;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyUp() {
    if (!this.game.player.animatingDeath){
      this.game.player.stopMoving();
    }
  }

  handleKeyDown() {
    if (!this.game.player.animatingDeath) {
      switch (event.keyCode) {
        case 37:
          this.game.player.fire("left");
          break;
        case 38:
          this.game.player.fire("up");
          break;
        case 39:
          this.game.player.fire("right");
          break;
        case 40:
          this.game.player.fire("down");
          break;
        case 83:
          this.game.player.changeDirection("down");
          break;
        case 87:
          this.game.player.changeDirection("up");
          break;
        case 65:
          this.game.player.changeDirection("left");
          break;
        case 68:
          this.game.player.changeDirection("right");
          break;
        default:
          break;
      }
    }
  }
}
